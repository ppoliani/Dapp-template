import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom'
import AuthGuard from './AuthGuard'
import Layout from './Layout';

class PrivateRoute extends PureComponent {
  render() {
    const {component: Component, ...rest} = this.props;
    return <Route {...rest} render={props => <AuthGuard {...props} component={Layout(Component, props)} /> }/> 
  }
}

export default PrivateRoute
