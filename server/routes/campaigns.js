import express   from 'express';
import Campaign  from '../models/Campaign';
import checkAuth from '../middlewares/auth';

module.exports = function(app){

    let router = express.Router();


    router.get('/', checkAuth({read:['vouchers']}), function(req, res){
        let offset = 0;
        let limit  = 20;
        Campaign.paginate({},{offset, limit}, function(err, result){
            if(err){ res.send(err); }
            res.json(result.docs);
        });
    });


    app.use('/api/campaigns',router);
};
