import React, { Component, PropTypes } from 'react';
import {connect}            from 'react-redux';
import Product from '../components/Product';
import {setSelectedProduct} from '../actions/selectedProduct';
import {bindActionCreators} from 'redux'
import {fetchVoucher, useVoucher} from '../actions/voucher';

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class ProductContainer extends Component {
    componentWillMount(){
        const {dispatch, products} = this.props;
        const prodID = this.props.params.id;
        const selectedProduct = products.toJS().find(function(el){
            return el.id === prodID;
        });
        dispatch(setSelectedProduct(selectedProduct));
    }

    render(){
        const {selectedProduct} = this.props;

        return (
            <Product {...this.props} selectedProduct={selectedProduct} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        products: state.get('products'),
        selectedProduct:  state.get('selectedProduct'),
        voucher:  state.get('voucher'),
        flash: state.get('flash')
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        fetchVoucher : bindActionCreators(fetchVoucher, dispatch),
        useVoucher   : bindActionCreators(useVoucher, dispatch)
    }
}

export default ProductContainer;
