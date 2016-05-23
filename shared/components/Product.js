import React, { Component, PropTypes } from 'react';
import Immutable     from 'immutable';
import {Link}        from 'react-router';
import Row           from 'react-bootstrap/lib/Row';
import Col           from 'react-bootstrap/lib/Col';
import Button        from 'react-bootstrap/lib/Button';
import Form          from 'react-bootstrap/lib/Form';
import FormControl   from 'react-bootstrap/lib/FormControl';
import FormGroup     from 'react-bootstrap/lib/FormGroup';
import InputGroup    from 'react-bootstrap/lib/InputGroup';
import ListGroup     from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import OrderDetails  from './OrderDetails';
import Flash from './Flash';


class Product extends Component {
    static propTypes = {
        selectedProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
        voucher: PropTypes.instanceOf(Immutable.Map).isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {apiBaseURL, apiToken} = this.props;
        const voucherCode = this.refs.code.value.toUpperCase();
        if(voucherCode !== ''){
            this.props.fetchVoucher(apiBaseURL, apiToken, voucherCode);
        }
    }

    onClick = (e) => {
        e.preventDefault();
        const {apiBaseURL, apiToken} = this.props;
        const {voucher} = this.props;
        if(!voucher){ return; }
        this.props.useVoucher(apiBaseURL, apiToken, voucher.get('code'));
    }

    render(){
        const {selectedProduct, voucher, flash} = this.props;

        const originalPrice = (selectedProduct && selectedProduct.get('id')) ? (+selectedProduct.get('price')/100) : '';
        const originalPriceStr = originalPrice ? originalPrice.toFixed(2)+' '+selectedProduct.getIn(['currency','symbol']) : '';

        let voucherDiscount = '';
        if(voucher && voucher.get('code')){
            if(voucher.get('isRate')){
                voucherDiscount = voucher.get('value')+' %';
            } else {
                voucherDiscount = voucher.get('value').toFixed(2)+' '+selectedProduct.getIn(['currency','symbol']);
            }
        }

        let finalPrice = originalPrice;
        if(voucherDiscount){
            if(voucher.get('isRate')){
                finalPrice = originalPrice - originalPrice*voucher.get('value')/100;
            } else {
                finalPrice = originalPrice - voucher.get('value');
            }
        }
        const finalPriceStr = finalPrice ? finalPrice.toFixed(2)+' '+selectedProduct.getIn(['currency','symbol']) : '';
        const voucherError = (voucher && voucher.get('error')) ? voucher : null;

        return (
            <div className="container">
                <Link to={'/products'}>Back to products</Link>
                <Flash flash={flash} />
                <Row className="marketing">
                    <Col lg={6} >
                        <h1>{selectedProduct.get('title')}</h1>
                        <p className="prod-desc lead">{selectedProduct.get('description')}</p>
                        <div>
                            <img className="prod-img-big center-block" src={"/img/"+selectedProduct.get('image')} />
                        </div>
                    </Col>
                    <Col lg={6} >
                        <h1>Have a voucher?</h1>
                        <Form inline onSubmit={this.onSubmit}>
                            <FormGroup>
                                <input id="voucher-code" type="text" placeholder="Enter your voucher here" className="form-control input-lg" ref="code" />
                            </FormGroup>
                            {' '}
                            <Button type="submit" bsSize="lg" bsStyle="primary">Add</Button>
                        </Form>
                        <OrderDetails originalPriceStr={originalPriceStr} voucherDiscount={voucherDiscount} finalPriceStr={finalPriceStr} voucherError={voucherError} />
                        <Button onClick={this.onClick} id="buy" type="submit" bsSize="large" className="pull-right" bsStyle="success">Buy</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Product;
