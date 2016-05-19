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
    }
});


module.exports = mongoose.model('Voucher', VoucherSchema);
