import React, { Component } from 'react';
import './TitleBar.css';

export class TitleBar extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {
        return(<div className="titleBar">
            <div className="logo">
                CryptoChat
            </div>
        </div>);
    }
}