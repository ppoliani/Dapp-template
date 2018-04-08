import React from 'react'
import {render} from 'react-dom'
import {MuiThemeProvider, createMuiTheme, withTheme} from 'material-ui/styles'
import '../../../common/fn'
import RootContainer from './RootContainer'
import configureStore from '../data'
import './index.html'
import './app.scss'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});


const bootstrap = Component => {
  render(
    <MuiThemeProvider theme={theme}>
      <Component store={configureStore()}/>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

bootstrap(RootContainer);
