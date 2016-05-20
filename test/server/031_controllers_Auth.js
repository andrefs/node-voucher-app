import config   from '../../config';
import request  from 'supertest';
import server   from '../../server/server';
import async    from 'async';
import Voucher  from '../../server/models/Voucher';
import Campaign from '../../server/models/Campaign';
import Auth     from '../../server/models/Auth';

describe('Auth Controllers', () => {
    it("should return a 401 when request to API has token with unsufficient permissions", (done) => {
        request(server)
            .get('/api/vouchers/CAMP_XXXXXXX?token=thistokendoesnotexist')
            .expect(401)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res.body.error).to.equal('E_NOAUTH');
                return done();
            });
    });

    it("should return a 200 when request to API has valid token", (done) => {
        const auth     = {username: 'USERNAME', canRead:{vouchers:true}};
        const campaign = {id: 'CAMP'};
        const voucher  = {code: 'CAMP_XXXXXXX'};
        async.waterfall([
                (next) => { Campaign.create(campaign, next); },
                ({_id,expires}, next) => {
                    Voucher.create({campaign:_id, expires, ...voucher}, next);
                },
                (v, next) => { Auth.create(auth, next); }
            ],
            (err, {token}) => {
                expect(err).to.be.null;
                request(server)
                    .get('/api/vouchers/CAMP_XXXXXXX?token='+token)
                    .expect(200)
                    .end(function(err, res){
                        expect(err).to.be.null;
                        return done();
                    });
            }
        );

    });

});
