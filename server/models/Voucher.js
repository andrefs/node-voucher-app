import mongoose  from 'mongoose';
import Campaign  from './Campaign';

var VoucherSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    isRate: {
        type: Boolean,
        required: true,
        default: true
    },
    value: {
        type: Number,
        require: true,
        default: 10
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },
    usesLeft: {
        type: Number,
        require: true,
        default: 1
    },
    isActive: {
        type: Boolean,
        required: true,
        default:true
    },
    isForever: {
        type: Boolean,
        required: true,
        default: false
    },
    expires: Date,
});

VoucherSchema.pre('save', function(next){
    if(this.isForever){ delete this.expires; }
    else if(!(this.expires)){
        return next(new Error("Missing 'expires' parameter because 'isForever' is set to 'false'"));
    }
    return next();
});

// static methods
VoucherSchema.statics.use = function(code, callback) {
    const filter = {
        code: code,
        isActive: true,
        usesLeft:{$gt: 0},
        expires: {$gt: new Date()}
    };
    const update  = {$inc: {usesLeft: -1}};
    const options = {multi:false};

    //return this.update(filter, update, options, callback);
    return this.update(filter, update, options, (err,{ok,nModified}) => {
        if(!err && ok && nModified === 0){
            err = new Error('No voucher updated');
        }
        return callback(err);
    });
};


module.exports = mongoose.model('Voucher', VoucherSchema);
