import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import {Link} from 'react-router';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import Button from  'react-bootstrap/lib/Button';
import Form from  'react-bootstrap/lib/Form';
import FormControl from  'react-bootstrap/lib/FormControl';
import FormGroup from  'react-bootstrap/lib/FormGroup';
import InputGroup from  'react-bootstrap/lib/InputGroup';


class Product extends Component {
    static propTypes = {
        selectedProduct: PropTypes.instanceOf(Immutable.Map).isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
    }


    render(){
        const {selectedProduct} = this.props;

        return (
            <div className="container">
                <h1>{selectedProduct.get('title')}</h1>
                <Row className="marketing">
                    <Col lg={6} >
                        <p className="prod-desc">{selectedProduct.get('description')}</p>
                        <div>
                            <img className="prod-img center-block" src={"/img/"+selectedProduct.get('image')} />
                        </div>
                    </Col>
                    <Col lg={6} >
                        <h2>Have a voucher?</h2>
                        <Form inline onSubmit={this.onSubmit}>
                            <FormGroup>
                                <FormControl type="text" placeholder="Enter your voucher here"/>
                            </FormGroup>
                            {' '}
                            <Button type="submit" bsStyle="success">Add!</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Product;
