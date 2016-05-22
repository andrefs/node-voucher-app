import React, { Component, PropTypes } from 'react';
import ProductsList         from '../components/ProductsList';
import {fetchProducts}      from '../actions/products';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux'

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class ProductsListContainer extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(fetchProducts());
    }

    render(){
        return (
            <ProductsList />
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.get('products')
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    }
}

export default ProductsListContainer;
