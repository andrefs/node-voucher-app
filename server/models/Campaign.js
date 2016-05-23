import mongoose from 'mongoose';
import async    from 'async';
import md5      from 'md5';
import Voucher  from './Voucher';
import pagPlugin from 'mongoose-paginate';
let debug = require('debug')('test');

mongoose.plugin(pagPlugin);

var CampaignSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    isForever: {
        type: Boolean,
        required: true,
        default: false
    },
    expires: Date
});

CampaignSchema.pre('save', function(next){
    if(this.isForever){ delete this.expires; }
    else {
        this.expires = this.expires || Date.now()+(1000*60*60*24*7) // 7 days
    }
    next();
});

// number: number of vouchers to create
// isRate: whether the type of the vouchers is 'rate' or 'fixed'
// value:  voucher's value
// uses:   how many times each voucher can be used
CampaignSchema.methods.generateVouchers = function(howMany=10, isRate=true, value=10, uses=1, callback){
    if(this.expires < Date.now()){
        return callback(new Error("Can't generate voucher for expired campaign"));
    }
    let voucher = {
        isRate,
        value,
        usesLeft: uses,
        isActive: true,
        campaign: this._id,
    };
    if(this.isForever){ voucher.isForever = true; }
    else {
        voucher.isForever = false;
        voucher.expires = this.expires;
    }

    const campaignID = this.id.toUpperCase();

    return async.times(howMany,
        (n, cb) => {
            return insertVoucher(campaignID, n, voucher, cb)
        },
        callback
    );
};

function insertVoucher(campaignID, seed, voucher, callback){
    const code = campaignID+'_'+md5(Date.now()+'_'+seed).substr(0, 7).toUpperCase();
    let createdVouchers = [];
    Voucher.create({code, ...voucher}, (err, createdVoucher) => {
        if(err && err.code && err.code === 11000){
            debug('Generated voucher code '+code+' already exists, getting a new one');
            return insertVoucher(campaignID, voucher, callback);
        }
        if(err){ return callback(err); }
        return callback(null, createdVoucher);
    });
}

module.exports = mongoose.model('Campaign', CampaignSchema);
