/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/client/components/AppRouter.js

// Importing all this
import React from 'react'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from './AppContainer'

const AppRouter = () => (
  <Router>
    <AppContainer>
      <Route exact path='/' component={Login} />
      <Route path='/chat' component={Chat} />
      <Route path='/register' component={Register} />
    </AppContainer>
  </Router>
)

export default AppRouter
