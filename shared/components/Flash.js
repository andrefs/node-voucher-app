import React, { Component, PropTypes } from 'react';
import Immutable     from 'immutable';
import Alert  from 'react-bootstrap/lib/Alert';



class Flash extends Component {

    render(){
        const {flash} = this.props;

        return (
            <div>
                { flash.get('error') ?
                    <Alert bsStyle="danger">
                        <h4>{flash.get('error')}</h4>
                    </Alert>
                    : null
                }
                { flash.get('success') ?
                    <Alert bsStyle="success">
                        <h4>{flash.get('success')}</h4>
                    </Alert>
                    : null
                }
                { flash.get('info') ?
                    <Alert bsStyle="info">
                        <h4>{flash.get('info')}</h4>
                    </Alert>
                    : null
                }
                { flash.get('warning') ?
                    <Alert bsStyle="warning">
                        <h4>{flash.get('warning')}</h4>
                    </Alert>
                    : null
                }
            </div>
        );
    }
}

export default Flash;
