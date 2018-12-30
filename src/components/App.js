// "use strict";
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import Grid from '@material-ui/core/Grid';

import { createMuiTheme } from '@material-ui/core/styles';

//import '@assets/scss/components/App.scss';
import configureStore, { history } from '@store';
import Main from '@components/Main';
import Header from '@components/Header';
import Footer from '@components/Footer';

const store = configureStore();

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class App extends Component {
  render() {
    console.log(store);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Header/>
              </Grid>
              <Grid item xs={12}>
                <Main />
              </Grid>
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);