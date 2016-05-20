import Auth from '../../server/models/Auth';
require('./test_helper');

describe('Auth Model', () => {
    it('should create a new auth profile', (done) => {
        const auth = {username: 'USER'};
        Auth.create(auth, (err, createdAuth) => {
            expect(err).to.be.null;
            expect(createdAuth).to.not.be.null;
            return done();
        });
    });

    it('should create new auth profile with default values', (done) => {
        const auth = {username: 'USER'};
        Auth.create(auth, (err, createdAuth) => {
            expect(err).to.be.null;
            expect(createdAuth).to.not.be.null;
            expect(createdAuth.isActive).to.equal(true);
            expect(createdAuth.canWrite).to.equal(false);
            return done();
        });
    });

    it('should create new auth profile with custom values', (done) => {
        const auth = {username: 'USER', isActive:false, canWrite:true};
        Auth.create(auth, (err, createdAuth) => {
            expect(err).to.be.null;
            expect(createdAuth).to.not.be.null;
            expect(createdAuth.isActive).to.equal(false);
            expect(createdAuth.canWrite).to.equal(true);
            return done();
        });
    });


    it('should not allow creating profile with existing username', (done) => {
        const auth = {username: 'USER'};
        Auth.create(auth, (err, createdAuth) => {
            expect(err).to.be.null;
            Auth.create(auth, (err, createdAuth) => {
                expect(err).to.not.be.null;
                expect(createdAuth).to.be.undefined;
                return done();
            });
        });
    });

    it('should automatically assign a token when creating a profile', (done) => {
        const auth = {username: 'USER'};
        Auth.create(auth, (err, createdAuth) => {
            expect(err).to.be.null;
            expect(createdAuth.token).to.not.be.null;
            return done();
        });
    });
});
