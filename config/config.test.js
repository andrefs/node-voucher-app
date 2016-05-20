module.exports = {
    server: {
        port: 9668,
        host: 'localhost'
    },
    db: {
        uri: 'mongodb://localhost/voucher_test'
    },
    auth: {
        allowUnauthWrites: true,
        allowUnauthReads: true
    }
};
