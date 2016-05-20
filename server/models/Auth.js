import md5 from 'md5';
import mongoose  from 'mongoose';

var AuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    expires: {
        type: Date,
        required: true,
        default: Date.now()+(1000*60*60*24*265) // Be default, auth tokens last for 1 year
    },
    isActive: {
        type: Boolean,
        required: true,
        default:true
    },
    token: String,
    canWrite: {
        type: mongoose.Schema.Types.Mixed,
        default: false
    },
    canRead: {
        type: mongoose.Schema.Types.Mixed,
        default: true
    }
});

AuthSchema.pre('save', function(next){
    this.token = md5(this.username+Date.now());
    return next();
});

module.exports = mongoose.model('Auth', AuthSchema);
