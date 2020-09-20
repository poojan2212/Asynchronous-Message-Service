/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/client/components/ChatInput.js

import React, { Component } from 'react' // import React
import { func } from 'prop-types'

class ChatInput extends Component {
  state = {
    msgToSend: '',
  }

  componentDidMount () {
    this.msgInput.focus()
  }

  sendMsg = e => {
    e.preventDefault()

    this.props.sendMsg(this.state.msgToSend)

    this.setState({ msgToSend: '' })

    this.msgInput.focus()
  }
  // fetching the data from the form
  render () {
    return (
      <div style={{ position: 'fixed', bottom: '0' }}>
        <form onSubmit={this.sendMsg}> 
          <input
            style={{ width: '96vw', height: '3vw', margin: '20px 20px' }}
            ref={input => {
              this.msgInput = input
            }}
            type='text'
            value={this.state.msgToSend}
            onChange={e => this.setState({ msgToSend: e.target.value })}
            placeholder='Type your message & press Enter to send.'
          />
        </form>
      </div>
    )
  }
}

ChatInput.propTypes = {
  sendMsg: func.isRequired,
}

export default ChatInput
