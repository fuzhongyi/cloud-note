import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from 'material-ui';
import {Grid} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import Done from 'material-ui-icons/Done';
import AddIcon from 'material-ui-icons/Add';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import pink from 'material-ui/colors/pink';
import swirl from '../assets/swirl.png';
const styles = theme => ({
    root: {
        backgroundImage: `url(${swirl})`,
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        zIndex: -2,
    },
    loginBox: {
        transition: 'width,height .3s',
        borderRadius: 8,
        margin: '0 auto',
        width: '80vw',
        height: 300,
        backgroundColor: '#fff',
        position: 'relative',
        boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
        '@media only screen and (min-width: 960px)': {
            height: 400
        },
        '&:before': {
            content: '\' \'',
            width: '95%',
            height: '100%',
            position: 'absolute',
            top: -6,
            borderRadius: 8,
            backgroundColor: '#fff',
            zIndex: -1,
            boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
        }
    },
    title: {
        width: '100%',
        borderLeft: '3px solid #FE6B8B',
        fontSize: 20,
        color: pink['A200'],
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center'
    },
    rightBtn: {
        position: 'absolute',
        top: 20,
        right: -20
    },
    submit: {
        marginTop: 30,
        width: 150,
        height: 35,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)'
    }
});
class Login extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            username: '',
            password: '',
            formSelect: ''
        }
    }

    componentWillMount() {
        console.log('123')
        this.setState({
            formSelect: 'login'
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    toggleForm() {
        this.setState(prevState => ({
            formSelect: prevState.formSelect === 'login' ? 'register' : 'login'
        }))
    }

    render() {
        return (
            <Grid className={this.classes.root} container spacing={0} justify="center" alignItems="center"
                  direction="column">
                <Grid container spacing={0} justify="center" alignItems="center" direction="column"
                      className={this.classes.loginBox}
                      style={{display: this.state.formSelect === 'login' ? '' : 'none'}}>
                    <Button fab color="accent" aria-label="add"
                            className={this.classes.rightBtn}
                            onClick={() => this.toggleForm()}>
                        <AddIcon/>
                    </Button>
                    <div className={this.classes.title}>
                        <div style={{width: '195px'}}>LOGIN</div>
                    </div>
                    <Grid item>
                        <TextField
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Password"
                            value={this.state.password}
                            type="password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <Button raised color="primary" className={this.classes.submit}>
                            <Done/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0} justify="center" alignItems="center" direction="column"
                      className={this.classes.loginBox}
                      style={{display: this.state.formSelect === 'register' ? '' : 'none'}}>
                    <Button fab color="accent" aria-label="add"
                            className={this.classes.rightBtn}
                            onClick={() => this.toggleForm()}>
                        <KeyboardArrowLeft/>
                    </Button>
                    <div className={this.classes.title}>
                        <div style={{width: '195px'}}>REGISTER</div>
                    </div>
                    <Grid item>
                        <TextField
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Password"
                            value={this.state.password}
                            type="password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <Button raised color="primary" className={this.classes.submit}>
                            <Done/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);