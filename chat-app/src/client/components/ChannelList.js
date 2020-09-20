// Name : Poojanbhai N Patel
// Student ID : 1001827807
// https://github.com/avrj/slack-clone/blob/master/src/client/components/ChannelList.js

import React from 'react'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import IconButton from 'material-ui/IconButton'

import ChannelListItem from './ChannelListItem'
import { string, object, func } from 'prop-types'

const ChannelList = ({
  channels,
  activeChannel,
  setActiveChannel,
  showJoinChannelDialog,
}) => {
  const renderMenuItems = () =>
    Object.keys(channels).map(key => {
      const channel = channels[key]

      return (
        <ChannelListItem
          active={activeChannel === key}
          hasNewMessages={channel.hasNewMessages}
          key={key}
          onClick={() => setActiveChannel(key)}
          title={key}
        />
      )
    })

  return (
    <div>
      <div className='DrawerListTitle'>
        Channels{' '}
        <IconButton
          className='VerticalAlignMiddle'
          tooltip='Join channel'
          onClick={showJoinChannelDialog} // this event will happen on click
        >
          <AddCircle />
        </IconButton>
      </div>

      <div>{renderMenuItems()}</div>
    </div>
  )
}

ChannelList.propTypes = {
  activeChannel: string,
  channels: object.isRequired,
  setActiveChannel: func.isRequired,
  showJoinChannelDialog: func.isRequired,
}

ChannelList.defaultProps = {
  activeChannel: null,
}

export default ChannelList
