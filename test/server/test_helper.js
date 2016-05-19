require('babel-register')();
process.env.NODE_ENV = 'test';
import config from '../../config';
import db     from '../../server/db';
import chai   from 'chai';
import async  from 'async';
import chaiDatetime from 'chai-datetime';

chai.config.includeStack = true;
chai.use(chaiDatetime);
global.expect = chai.expect;


beforeEach(function(done){
    async.each(db.collections,
        (coll, next) => {
           coll.remove(next);
        }, (err) => {
            if(err){ throw err; }
            return done();
        }
    );
});

