import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'

class RouterComponent extends Component {
  // There is no need to update this component once it's been mounted
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <PrivateRoute exact path='/' component={Home}/>
        </div>
      </Router>
    )
  }
}

export default RouterComponent
