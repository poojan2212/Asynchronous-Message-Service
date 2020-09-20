/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/client/components/JoinChannelDialog.js
// this js is for the Dialog box ti join the channel by the users for multicasting

import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { func } from 'prop-types'

class JoinChannelDialog extends Component {
  state = {
    channelToJoin: '',
  }

  join = () => {
    const { channelToJoin } = this.state

    if (channelToJoin.length >= 1) {
      this.props.join(channelToJoin)

      this.setState({ channelToJoin: '' })
    }
  }
  // fetching the data from the form
  render () {
    const actions = [<RaisedButton label='Join' secondary onClick={this.join} />]

    return (
      <Dialog actions={actions} modal={false} open>
        <p>Join channel</p>
        
        <form onSubmit={this.join}>
          <TextField
            autoFocus
            hintText='Enter the name of the channel'
            floatingLabelText='Name of channel'
            floatingLabelFixed
            value={this.state.channelToJoin}
            onChange={e => this.setState({ channelToJoin: e.target.value })}
          />
        </form>
      </Dialog>
    )
  }
}

JoinChannelDialog.propTypes = {
  join: func.isRequired,
}

export default JoinChannelDialog
