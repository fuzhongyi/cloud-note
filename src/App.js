import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
const theme = createMuiTheme({
    overrides: {
        MuiFormLabel: {
            focused: {
                color: pink['A200']
            }
        },
        MuiInput: {
            inkbar: {
                '&:after': {
                    backgroundColor: pink['A200']
                }
            },
        },
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Route path="/" component={Login}/>
                        {/*<Route path="/home" component={Home}/>*/}
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
