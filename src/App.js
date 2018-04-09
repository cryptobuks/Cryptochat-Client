import React, { Component } from 'react';

import './App.css';
// Import components
import { UserConfigDialog } from './UserConfigDialog';

import { TitleBar } from './components/TitleBar';
import { InputBox } from './components/InputBox';
import { ChatContent } from './components/ChatContent';

import { Message } from './components/Message';

class App extends Component {

  constructor(...props) {
    super(...props);

    // Default config
    window.config = {
      KEY_SIZE: 2048,
      conversation: 'DEBUG'
    };

    this.state = {
      messages: [
        <Message key={0} from={0}>Hey,<br />what
            s up?</Message>,
        <Message key={1} from={1}>Not much... How about you?</Message>
      ],
      messageid: 2
    };

    this.addMessage = this.addMessage.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  addMessage(text, sender = 0) {
    let msg = this.state.messages;
    msg.push(<Message from={sender} key={this.state.messageid}>{text}</Message>);
    this.setState({
      messages: msg,
      messageid: this.state.messageid + 1
    });
  }

  messageSubmit(message) {
    this.addMessage(message);
  }

  render() {
    return (
      <div className="App">
        <UserConfigDialog />
        <TitleBar />
        <ChatContent>
          {this.state.messages}
        </ChatContent>
        <InputBox onSubmit={this.messageSubmit} />
      </div>
    );
  }
}

export default App;
