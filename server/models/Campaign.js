import mongoose  from 'mongoose';

var CampaignSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    expires: {
        type: Date,
        required: true,
        default: Date.now()+(1000*60*60*24*7) // Be default, campaigns last for 7 days
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
