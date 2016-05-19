import Voucher from '../../server/models/Voucher';
import Campaign from '../../server/models/Campaign';
require('./test_helper');




describe('Voucher Model', () => {
    it('should save new voucher in database', (done) => {
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                expires: createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                Voucher.count({}, (err, totalVouchers) => {
                    expect(err).to.be.null;
                    expect(totalVouchers).to.equal(1);
                    return done();
                });
            });
        });
    });

    it('should create new voucher with default values', (done)=>{
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                expires: createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                expect(createdVoucher.isRate).to.equal(true);
                expect(createdVoucher.value).to.equal(10);
                expect(createdVoucher.usesLeft).to.equal(1);
                expect(createdVoucher.isActive).to.equal(true);
                return done();
            });
        });
    });

    it('should create new voucher with custom values', (done) => {
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code     : 'CAMP_XXXXXXX',
                campaign : createdCamp._id,
                isRate   : false,
                value    : 15,
                usesLeft : 100,
                isActive : false,
                expires  : createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                expect(createdVoucher.isRate).to.equal(false);
                expect(createdVoucher.value).to.equal(15);
                expect(createdVoucher.usesLeft).to.equal(100);
                expect(createdVoucher.isActive).to.equal(false);
                return done();
            });
        });
    });

    it('should allow to use a valid voucher', (done) => {
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                expires: createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                Voucher.use('CAMP_XXXXXXX', (err) => {
                    expect(err).to.be.null;
                    return done();
                });
            });
        });
    });

    it('should decrease a voucher\'s uses left when used', (done)=>{
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                expires: createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                Voucher.use('CAMP_XXXXXXX', (err) => {
                    expect(err).to.be.null;
                    Voucher.findOne({_id: createdVoucher._id}, (err, retrievedVoucher) => {
                        expect(retrievedVoucher.usesLeft).to.equal(createdVoucher.usesLeft-1);
                        return done();
                    });
                });
            });
        });
    });

    it('should mark voucher as inactive if it has no more uses left');

    it('should return an error when trying to use an inactive voucher', (done)=>{
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                usesLeft: 0,
                isActive: false,
                expires: createdCamp.expires
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                Voucher.use('CAMP_XXXXXXX', (err, numUpdated) => {
                    expect(err).to.not.be.null;
                    return done();
                });
            });
        });
    });

    it('should return an error when trying to use a voucher from an expired campaign', (done) => {
        Campaign.create({id:'CAMP'}, (err, createdCamp) => {
            expect(err).to.be.null;
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: createdCamp._id,
                expires: new Date('1980-01-01')
            };
            Voucher.create(voucher, (err, createdVoucher) => {
                expect(err).to.be.null;
                Voucher.use('CAMP_XXXXXXX', (err, numUpdated) => {
                    expect(err).to.not.be.null;
                    return done();
                });
            });
        });
    });
});
