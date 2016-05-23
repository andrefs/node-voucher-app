import React, { Component, PropTypes } from 'react';
import Immutable     from 'immutable';
import ListGroup     from 'react-bootstrap/lib/ListGroup';


class OrderDetails extends Component {

    render(){
        const {originalPriceStr, voucherDiscount, finalPriceStr, voucherError} = this.props;

        return (
            <div>
                <h1>Order details</h1>
                <ListGroup>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Original price</h4>
                        <p className="order-details-field text-right list-group-item-text">{originalPriceStr}</p>
                    </li>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Voucher discount</h4>
                        {voucherError ?
                            <p className="danger text-right">Something went wrong: {voucherError.get('message')}</p> :
                            <p className="order-details-field text-right list-group-item-text">{voucherDiscount}</p>
                        }
                    </li>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Final price</h4>
                        <p className="order-details-field text-right list-group-item-text">{finalPriceStr}</p>
                    </li>
                </ListGroup>
            </div>
        );
    }
}

export default OrderDetails;
