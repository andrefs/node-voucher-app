import React, { Component, PropTypes } from 'react';
import CampaignsList         from '../components/CampaignsList';
import {fetchCampaigns}      from '../actions/campaigns';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux'

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class CampaignsListContainer extends Component {
    componentWillMount() {
        const {dispatch, config} = this.props;
        dispatch(fetchCampaigns(config.get('apiBaseURL'), config.get('apiToken')));
    }

    render(){
        return (
            <CampaignsList {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        campaigns: state.get('campaigns'),
        flash: state.get('flash'),
        config: state.get('config')
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    }
}

export default CampaignsListContainer;
