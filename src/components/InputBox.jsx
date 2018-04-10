import React, { Component } from 'react';
import './InputBox.css';

export class InputBox extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            text: ''
        };

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit() {
        this.props.onSubmit(this.state.text);
        this.setState({text:''});
    }

    handleChange(value) {
        this.setState({
            text: value.target.value
        });
    }

    render() {
        return(<div className="inputbox">
            <textarea className="text"
            onChange={this.handleChange
            } value={this.state.text}></textarea>
            <button className="submit"
            onClick={this.submit}>Send</button>
        </div>);
    }
}