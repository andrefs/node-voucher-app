import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import {Link} from 'react-router';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import Flash from './Flash';

class Products extends Component {

    static propTypes = {
        products: PropTypes.instanceOf(Immutable.List).isRequired,
        flash: PropTypes.instanceOf(Immutable.Map).isRequired
    };

    componentDidMount() {
        const {dispatch} = this.props;
    }

    render(){
        const {products, flash} = this.props;

        return (
            <div className="container">
                <h1>Products</h1>
                <Link to={'/'}>Go back</Link>
                <Flash flash={flash} />
                <Row className="marketing">
                    {products.map(prod =>
                        <Col lg={6} key={prod.get('id')} >
                            <Link className="product" to={'/buy/'+prod.get('id')}>
                            <div className="product-box">
                                <h4>{prod.get('title')}</h4>
                                <div>
                                    <img className="prod-img center-block" src={"/img/"+prod.get('image')} />
                                </div>
                                <p className="prod-desc">{prod.get('description')}</p>
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
