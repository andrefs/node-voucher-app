import React, { Component, PropTypes } from 'react';
import VouchersList         from '../components/VouchersList';
import {fetchVouchers}      from '../actions/vouchers';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux'

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class VouchersListContainer extends Component {
    componentWillMount() {
        const {dispatch, config} = this.props;
        dispatch(fetchVouchers(config.get('apiBaseURL'), config.get('apiToken')));
    }

    render(){
        return (
            <VouchersList {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        vouchers: state.get('vouchers'),
        flash: state.get('flash'),
        config: state.get('config')
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    }
}

export default VouchersListContainer;
