import express   from 'express';

module.exports = function(app){
    let router = express.Router();

    router.get('/', function(req, res){
        const products = [{
                id: 'prod001',
                description: 'This is the description of Product 1',
                title: 'Product 1',
                image: 'prod001.png'
            },{
                id: 'prod002',
                description: 'This is the description of Product 2',
                title: 'Product 2',
                image: 'prod001.png'
            },{
                id: 'prod003',
                description: 'This is the description of Product 3',
                title: 'Product 3',
                image: 'prod001.png'
            }
        ];
        return res.status(200).send(products);
    });

    app.use('/api/products',router);
};
