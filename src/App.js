import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import Loading from './components/Loading'
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import loading from './store/loading';
import user from './store/user';
let store = createStore(combineReducers({loading, user}));
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
            }
        }
    }
});

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <Loading/>
                        <Router>
                            <div>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                            </div>
                        </Router>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
