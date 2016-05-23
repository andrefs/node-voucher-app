import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import {Link} from 'react-router';
import Flash from './Flash';
import Table  from 'react-bootstrap/lib/Table';

class CampaignsList extends Component {

    static propTypes = {
        campaigns: PropTypes.instanceOf(Immutable.List).isRequired,
    };

    render(){
        const {campaigns, flash} = this.props;

        var infinity = (
            <span className="inf-symbol">∞</span>
        );

        return (
            <div className="container">
                <h1>Campaigns</h1>
                <Link to={'/'}>Back to start</Link>
                <Flash flash={flash} />
                <Table striped hover id="camp-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                    { campaigns.map(camp =>
                        <tr key={camp.get('id')}>
                            <td>{camp.get('id')}</td>
                            <td>{camp.get('isForever') ? infinity : camp.get('expires').replace(/T/,' ')}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CampaignsList;
