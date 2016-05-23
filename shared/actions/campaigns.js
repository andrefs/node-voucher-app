import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    CAMPAIGNS_FETCH_REQUEST,
    CAMPAIGNS_FETCH_SUCCESS,
    CAMPAIGNS_FETCH_FAILURE
} from '../constants';

const fetchCampaigns = function(baseURL, token){
    return (dispatch) => {
        dispatch(campaignsRequest());

        return fetch(baseURL+'/api/campaigns/', token)
        .then(response => response.json())
        .then(campaigns => {
            dispatch(campaignsSuccess(campaigns));
        })
        .catch(error => {throw error});
    };
};

const campaignsSuccess = createAction(CAMPAIGNS_FETCH_SUCCESS);
const campaignsRequest = createAction(CAMPAIGNS_FETCH_REQUEST);

export {fetchCampaigns};
