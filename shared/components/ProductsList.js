import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';

class Products extends Component {
    render(){
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
        return (
            <div className="container">
                <h1>Products</h1>
                <Link to={'/'}>Go back</Link>
                <Row className="marketing">

                    {products.map(prod =>
                        <Col lg={6}>
                            <Link className="product" to={'/buy/'+prod.id}>
                            <div className="product-box">
                                <h4>{prod.title}</h4>
                                <div>
                                    <img className="prod-img center-block" src={"/img/"+prod.image} />
                                </div>
                                <p className="prod-desc">{prod.description}</p>
                            </div>
                            </Link>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}

export default Products;
