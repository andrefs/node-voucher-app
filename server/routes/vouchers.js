import express from 'express';
import Voucher from '../models/Voucher';
import checkAuth from '../middlewares/auth';

module.exports = function(app){

    let router = express.Router();


    router.get('/:code', checkAuth({read:['vouchers']}), function(req, res){
        const query = {
            code: req.params.code
        };

        Voucher.findOne(query, (err, doc) => {
            if(err){
                return res.status(500).send({
                    error: 'E_ERROR',
                    message: err.message()
                });
            }
            if(!doc){
                return res.status(404).json({
                    error: 'E_VNOFOUND',
                    message: 'Voucher not found'
                });
            }
            if(!doc.isActive){
                return res.status(404).json({
                    error: 'E_VNOACTIVE',
                    message: 'This voucher is no longer active'
                });
            }
            if(doc.expires < Date.now()){
                return res.status(404).json({
                    error: 'E_VEXPIRED',
                    message: 'This voucher has already expired'
                });
            }
            if(doc.usesLeft === 0){
                return res.status(404).json({
                    error: 'E_VUSED',
                    message: 'This voucher has already been used'
                });
            }
            return res.status(200).send(doc);
        });
    });

    router.patch('/:code', checkAuth({write:['vouchers']}), function(req, res){
        if(req.body.action === 'use'){
            Voucher.use(req.params.code, (err) => {
                if(err){
                    res.status(500).send({
                        error: 'E_ERROR',
                        message: err.message()
                    });
                }
                else res.sendStatus(204);
            });
        } else {
            return res.status(400).send({
                error: 'E_VBADACTION',
                message: 'Could not understand PATCH action'
            });
        }
    });

    app.use('/api/vouchers',router);
};
