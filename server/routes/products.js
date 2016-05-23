import express   from 'express';

module.exports = function(app){
    let router = express.Router();

    router.get('/', function(req, res){
        const products = [{
                id: 'prod001',
                description: 'This hands-on guide shows you the connection between MongoDB and the business problems it’s designed to solve',
                title: 'MongoDB Applied Design Patterns',
                image: 'prod001.jpg',
                price: 3002,
                currency: {
                    name: 'dollar',
                    symbol: '$'
                }
            },{
                id: 'prod002',
                description: 'Get up to speed on Git for tracking, branching, merging, and managing code revisions.',
                title: 'Version Control with Git',
                image: 'prod002.jpg',
                price: 2252,
                currency: {
                    name: 'pound',
                    symbol: '£'
                }
            },{
                id: 'prod003',
                description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack.',
                title: 'Web Development with Node and Express',
                image: 'prod003.jpg',
                price: 2195,
                currency: {
                    name: 'euro',
                    symbol: '€'
                }
            }
        ];
        return res.status(200).send(products);
    });

    app.use('/api/products',router);
};
