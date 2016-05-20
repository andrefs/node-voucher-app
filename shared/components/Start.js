import React from 'react';
import {Link} from 'react-router';
import Jumbotron  from 'react-bootstrap/lib/Jumbotron';
import Button  from 'react-bootstrap/lib/Button';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import Glyphicon  from 'react-bootstrap/lib/Glyphicon';

class Start extends React.Component {
    render(){
        return (
            <div>
                <div className="container">
                    <Jumbotron>
                        <h1><span>Welcome to</span><span>node-voucher-app!</span></h1>
                        <p className="lead">If you just want to see the product list, where you can select which one you want to buy and add a voucher, click on the button below!</p>
                    <Button bsSize="lg" bsStyle="success" href="/products">See products <Glyphicon glyph="gift" /></Button>
                    </Jumbotron>
                    <Row className="marketing">
                    <Col lg={6}>
                        <h4>Campaigns</h4>
                        <p>If you want to check out the campaigns or even create a new one, use this button:</p>
                        <Button bsStyle="primary" href="/campaigns">See campaigns <Glyphicon glyph="stats" /></Button>
                    </Col>
                    <Col lg={6}>
                        <h4>Vouchers</h4>
                        <p>Or, if what you want is to have an overview of the vouchers, click here instead::</p>
                        <Button bsStyle="primary" href="/vouchers">See vouchers <Glyphicon glyph="tags" /></Button>
                    </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Start;
