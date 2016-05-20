import request  from 'supertest';
import server from '../../server/server';
import Voucher  from '../../server/models/Voucher';
import Campaign from '../../server/models/Campaign';
import Auth     from '../../server/models/Auth';

describe('Voucher Controllers', () => {

    it("should return a 401 when request are missing a token");

    it("should return a voucher by it's code", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            camp.generateVouchers(1, true, 10, 1, (err, vouchers) => {
                const voucher = vouchers[0];
                request(server)
                    .get('/api/vouchers/'+voucher.code)
                    .expect(200)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        expect(res.body.code).to.equal(voucher.code);
                        return done();
                    });
            });
        });
    });

    it("should return a 404 E_NOFOUND when voucher does not exist", (done) => {
        request(server)
            .get('/api/vouchers/NOCAMP_NOCODE')
            .expect(404)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res.body.error).to.not.be.null;
                expect(res.body.error).to.equal('E_VNOFOUND');
                return done();
            });
    });

    it("should should return a 404 E_NOACTIVE when voucher has isActive=false", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: camp._id,
                expires: camp.expires,
                isActive: false
            };
            Voucher.create(voucher, (err) => {
                request(server)
                    .get('/api/vouchers/CAMP_XXXXXXX')
                    .expect(404)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        expect(res.body.error).to.not.be.null;
                        expect(res.body.error).to.equal('E_VNOACTIVE');
                        return done();
                    });
            });
        });
    });

    it("should should return a 404 E_VEXPIRED when voucher has expired", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: camp._id,
                expires: new Date('1980-01-01')
            };
            Voucher.create(voucher, (err) => {
                request(server)
                    .get('/api/vouchers/CAMP_XXXXXXX')
                    .expect(404)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        expect(res.body.error).to.not.be.null;
                        expect(res.body.error).to.equal('E_VEXPIRED');
                        return done();
                    });
            });
        });
    });

    it("should should return a 404 E_VUSED when voucher has no more uses left", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: camp._id,
                expires: camp.expires,
                usesLeft: 0
            };
            Voucher.create(voucher, (err) => {
                request(server)
                    .get('/api/vouchers/CAMP_XXXXXXX')
                    .expect(404)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        expect(res.body.error).to.not.be.null;
                        expect(res.body.error).to.equal('E_VUSED');
                        return done();
                    });
            });
        });
    });


    it("should return a 400 when unrecognizable action is sent to voucher", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: camp._id,
                expires: camp.expires
            };
            Voucher.create(voucher, (err) => {
                request(server)
                    .patch('/api/vouchers/CAMP_XXXXXXX')
                    .send({action: 'WEIRD_ACTION'})
                    .expect(404)
                    .end(function(err, res){
                        return done();
                    });
            });
        });
    });

    it("should return a 204 when a voucher is successfully used", (done) => {
        Campaign.create({id: 'CAMP'}, (err, camp) => {
            const voucher = {
                code: 'CAMP_XXXXXXX',
                campaign: camp._id,
                expires: camp.expires,
                usesLeft: 10
            };
            Voucher.create(voucher, (err) => {
                expect(err).to.be.null;
                request(server)
                    .patch('/api/vouchers/CAMP_XXXXXXX')
                    .send({action: 'use'})
                    .expect(204)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        Voucher.findOne({code: voucher.code}, (err, {usesLeft}) => {
                            expect(err).to.be.null;
                            expect(usesLeft).to.equal(9);
                            return done();
                        });
                    });
            });
        });
    });
});
