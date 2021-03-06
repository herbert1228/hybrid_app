import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'typeface-roboto' //eslint-disable-line
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme()

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
