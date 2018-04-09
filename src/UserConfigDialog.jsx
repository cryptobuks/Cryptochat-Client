import React, { Component } from 'react';
import './UserConfigDialog.css';

import { CryptoHandler } from './handlers/CryptoHandler';

/**
 * Configuration Dialog that is opened upon starting the chat app
 */
export class UserConfigDialog extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            // display: 'block'
            display: "none"
        };
        let ch = new CryptoHandler();
    }

    render() {
        return (<div className="dialog" style={ { display: this.state.display } }>
            <h2>Configuration</h2>

        </div>);
    }

}
