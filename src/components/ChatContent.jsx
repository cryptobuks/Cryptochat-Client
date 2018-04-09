import React, { Component } from 'react';
import './ChatContent.css';

export class ChatContent extends Component {
    constructor(...props) {
        super(...props);
    }

    render() {
        return(<div className="content">
        { this.props.children }
        </div>);
    }
}