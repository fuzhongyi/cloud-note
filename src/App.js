import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            // Name of the styleSheet
            root: {
                // Name of the rule
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
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
                        <Route path="/login" component={Login}/>
                        {/*<Route path="/home" component={Home}/>*/}
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
