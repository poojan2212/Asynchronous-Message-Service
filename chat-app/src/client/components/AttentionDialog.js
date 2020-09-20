/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/client/components/AttentionDialog.js

import React from 'react'
import Dialog from 'material-ui/Dialog'
import { string } from 'prop-types'

const AttentionDialog = ({ title, text }) => (
  <Dialog title={title} modal open>
    {text}
  </Dialog>
)

AttentionDialog.propTypes = {
  title: string.isRequired,
  text: string.isRequired,
}

export default AttentionDialog
