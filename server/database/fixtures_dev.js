var id = require('pow-mongodb-fixtures').createObjectId;

var auths = exports.auths = {
    auth1: {
        token: "740a8c8b3f5d5cf75c23eeb69e1bdbc0",
        username: "voucher_frontend",
        canRead: true,
        canWrite: {
            "vouchers": true
        }
    }
};

var campaigns = exports.campaigns = {
    camp1: {
        _id: id(),
        id: "EASTER",
        isForever: false,
        expires: new Date("2017-05-01"),
    },
    camp2: {
        _id: id(),
        id: "BERLIN",
        isForever: true
    }
};


var vouchers = exports.vouchers = {
    voucher1: {
        _id: id(),
        isRate: true,
        value: 15,
        usesLeft: 1,
        isActive: true,
        isForever: false,
        expires: new Date("2017-05-30"),
        campaign: campaigns.camp1._id,
        code: 'EASTER_E0687CB',
    },
    voucher2: {
        _id: id(),
        isRate: true,
        value: 15,
        usesLeft: 1,
        isActive: true,
        isForever: false,
        expires: new Date("2017-05-30"),
        campaign: campaigns.camp1._id,
        code: 'EASTER_3F7BE26',
    },
    voucher3: {
        _id: id(),
        isRate: true,
        value: 15,
        usesLeft: 1,
        isActive: true,
        isForever: false,
        expires: new Date("2017-05-30"),
        campaign: campaigns.camp1._id,
        code: 'EASTER_32036FB',
    },
    voucher4: {
        _id: id(),
        isRate: false,
        value: 10,
        usesLeft: 5,
        isActive: true,
        isForever: true,
        campaign: campaigns.camp2._id,
        code: 'BERLIN_D44F91B',
    }
};
