import React, { Component } from 'react';
import './Message.css';

export class Message extends Component {
    constructor(...props) {
        super(...props);
        let time = new Date();
        this.state = {
            recieveTimestamp: time.toLocaleTimeString()
        };
    }

    render() {
        return (<div className={"message message" + this.props.from}>
            <div className={"box content" + this.props.from}>
                <div className="partner"><span>{this.props.name || (this.props.from === 0) ? "You" : "Partner"}</span></div>
                {this.props.children}
                <br />
                <div className="stamp">{this.state.recieveTimestamp}</div>
            </div>
        </div>);
    }
}