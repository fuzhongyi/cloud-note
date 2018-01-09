import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from 'material-ui';
import {Grid} from 'material-ui';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        backgroundColor: '#88F9E5',
        position: 'absolute',
        width: '100%',
        minHeight: '100%'
    },
    loginBox: {
        borderRadius: '10px',
        margin: '0 auto',
        width: '80vw',
        height: '300px',
        backgroundColor: '#fff'
    },
    title: {
        width: '100%',
        textIndent: '26px',
        borderLeft: '3px solid #FE6B8B',
        fontSize: '20px',
        color: '#FE6B8B',
        fontWeight: 'bold'
    },
    submit: {
        marginTop: '30px',
        width: '150px',
        height: '35px'
    }
});
class Login extends Component {
    constructor(props) {
        super();
        this.classes = props.classes;
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    render() {
        return (
            <Grid className={this.classes.root} container spacing={0} justify="center" alignItems="center"
                  direction="column">
                <Grid container spacing={0} justify="center" alignItems="center" direction="column"
                      className={this.classes.loginBox}>
                    <Grid item className={this.classes.title}>LOGIN</Grid>
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
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <Button raised color="primary" className={this.classes.submit}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);