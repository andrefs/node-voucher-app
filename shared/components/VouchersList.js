import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import {Link} from 'react-router';
import Flash from './Flash';
import Table  from 'react-bootstrap/lib/Table';

class VouchersList extends Component {

    static propTypes = {
        vouchers: PropTypes.instanceOf(Immutable.List).isRequired,
    };

    render(){
        const {vouchers, flash} = this.props;

        var infinity = (
            <span className="inf-symbol">∞</span>
        );

        return (
            <div className="container">
                <h1>Vouchers</h1>
                <Link to={'/'}>Back to start</Link>
                <Flash flash={flash} />
                <Table striped hover id="vouchers-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Campaign</th>
                            <th>Expires</th>
                            <th>Value</th>
                            <th>Uses left</th>
                        </tr>
                    </thead>
                    <tbody>
                    { vouchers.map(voucher =>
                        <tr key={voucher.get('code')} className={voucher.get('usesLeft') > 0 ? 'success' : 'danger'}>
                            <td>{voucher.get('code')}</td>
                            <td>{voucher.getIn(['campaign','id'])}</td>
                            <td>{voucher.get('isForever') ? infinity : voucher.get('expires').replace(/T/,' ')}</td>
                            <td>{voucher.get('value')}{voucher.get('isRate') ? ' %' : null}</td>
                            <td>{voucher.get('usesLeft')}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default VouchersList;
