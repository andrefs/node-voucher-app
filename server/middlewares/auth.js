import config from '../../config';
import Auth   from '../models/Auth';


function readToken(req, res, callback){
    req.auth = {};
    if(!req.query.token){
        if(config.auth){
            if(config.auth.allowUnauthWrites){ req.auth.canWrite = true; }
            if(config.auth.allowUnauthReads){  req.auth.canRead  = true; }
        }
        return callback();
    }

    Auth.findOne({token:req.query.token}, (err, doc) => {
        if(err){
            return res.status(401).json({
                error: 'E_ERROR',
                message: err.message()
            });
        }
        if(!doc){ return callback(); }
        req.auth.canRead  = req.auth.canRead  || doc.canRead;
        req.auth.canWrite = req.auth.canWrite || doc.canWrite;
        return callback();
    });
}

export default function({write,read}){
    return function(req, res, next){
        return readToken(req, res, function(){
            let authorized = true;
            if(read && read.length){
                read.forEach(function(resource){
                    if(!req.auth || !req.auth.canRead){
                        authorized = false;
                        return;
                    }
                    if(req.auth.canRead === true){ return; }
                    if(!req.auth.canRead[resource]){ authorized = false; }
                });
            }
            if(write && write.length){
                write.forEach(function(resource){
                    if(!req.auth || !req.auth.canWrite){
                        authorized = false;
                        return;
                    }
                    if(req.auth.canWrite === true){ return; }
                    if(!req.auth.canWrite[resource]){ authorized = false; }
                });
            }
            if(!authorized){
                return res.status(401).json({
                    error: 'E_NOAUTH',
                    message: "This token does not grant you all the permissions you need"
                });
            }
            return next();
        });
    };
}
