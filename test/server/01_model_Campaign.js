import Campaign from '../../server/models/Campaign';
require('./test_helper');

describe('Campaign Model', () => {
    it('should save new campaign in database', (done) => {
        const camp = {id: 'CAMP'};
        Campaign.create(camp, (err) => {
            expect(err).to.be.null;
            Campaign.count({}, (err, totalCampaigns) => {
                expect(err).to.be.null;
                expect(totalCampaigns).to.equal(1);
                return done();
            });
        });
    });

    it('should not allow creating a campaign without an id', (done) => {
        const camp = {expires: new Date()};
        Campaign.create(camp, (err, createdCampaign) => {
            expect(err).to.not.be.null;
            expect(createdCampaign).to.be.undefined;
            return done();
        });
    });

    it('should create new campaign with default values', (done) => {
        const camp = {id: 'CAMP'};
        Campaign.create(camp, (err, createdCampaign) => {
            const now = Date.now();
            expect(err).to.be.null;
            expect(createdCampaign).to.not.be.null;
            expect(createdCampaign.expires).to.be.above(now);
            expect(createdCampaign.expires).to.be.below(now+1000*60*60*24*7);
            return done();
        });
    });

    it('should create new campaign with custom values', (done) => {
        const camp = {id: 'CAMP', expires: new Date('2017-01-01')};
        Campaign.create(camp, (err, createdCampaign) => {
            const now = Date.now();
            expect(err).to.be.null;
            expect(createdCampaign).to.not.be.null;
            expect(createdCampaign.expires).to.equalDate(new Date('2017-01-01'));
            return done();
        });
    });

    it('should not allow creating new campaign with existing ID', (done) => {
        const camp = {id: 'CAMP'};
        Campaign.create(camp, (err) => {
            expect(err).to.be.null;
            Campaign.create(camp, (err) => {
                expect(err).to.not.be.null;
                return done();
            });
        });
    });

    it('should generate vouchers for a campaign', (done) => {
        const camp = {id: 'CAMP'};
        Campaign.create(camp, (err, c) => {
            expect(err).to.be.null;
            c.generateVouchers(4, true, 15, 3, function(err, createdVouchers){
                expect(err).to.be.null;
                expect(createdVouchers.length).to.equal(4);
                return done();
            });
        });
    });

    it('should not allow to generate vouchers for an expired campaign', (done) => {
        const camp = {id: 'CAMP', expires: new Date('1980-01-01')};
        Campaign.create(camp, (err, c) => {
            expect(err).to.be.null;
            c.generateVouchers(4, true, 15, 3, function(err){
                expect(err).to.not.be.null;
                return done();
            });
        });
    });

    it('should use campaign ID to generate voucher\'s prefix', (done) => {
        const camp = {id: 'PREFIX'};
        Campaign.create(camp, (err, c) => {
            expect(err).to.be.null;
            c.generateVouchers(1, true, 15, 3, function(err, createdVouchers){
                expect(err).to.be.null;
                expect(createdVouchers[0].code).to.match(/^PREFIX/);
                return done();
            });
        });
    });

    it('should allow to create infinite duration campaign', (done) => {
        const camp = {id: 'PREFIX', isForever: true};
        Campaign.create(camp, (err, c) => {
            expect(err).to.be.null;
            expect(c.expires).to.be.undefined;
            c.generateVouchers(1, true, 15, 3, function(err, createdVouchers){
                expect(err).to.be.null;
                expect(createdVouchers[0].expires).to.be.undefined;
                return done();
            });
        });
    });
});
