import React, {Component} from 'react'
import HomeConnection from '../../bridge/HomeConnection'

class Home extends Component {
  render() {
    return (
      <div className='page'>  
        Home Page
      </div>
    );
  }
}

export default HomeConnection(Home)
