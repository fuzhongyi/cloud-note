import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from 'material-ui';
import {Grid} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import Done from 'material-ui-icons/Done';
import AddIcon from 'material-ui-icons/Add';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import swirl from '../assets/swirl.png';
import {tinLeftIn, tinRightIn, slideDownReturn} from 'react-magic'
import {StyleSheet, css} from 'aphrodite';
const styles = theme => ({
    root: {
        backgroundImage: `url(${swirl})`,
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        zIndex: -2,
    },
    loginBox: {
        transition: 'width,height .5s',
        borderRadius: 8,
        margin: '0 auto',
        width: '80vw',
        minWidth: 256,
        maxWidth: 350,
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
    errorMsg: {
        position: 'absolute',
        top: 0,
        left: -195 / 2,
        width: 195,
        textAlign: 'center',
        fontSize: 14,
        color: red['A400']
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
        transition: 'width .5s',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
        '@media only screen and (min-width: 960px)': {
            width: 195
        }
    }
});
const animation = StyleSheet.create({
    tinLeftIn: {
        animationName: tinLeftIn,
        animationDuration: '1s'
    },
    tinRightIn: {
        animationName: tinRightIn,
        animationDuration: '1s'
    },
    slideDownReturn: {
        animationName: slideDownReturn,
        animationDuration: '.5s'
    }
});
const url = '//5a56cb24eb96f9001230ace6.mockapi.io/api/v1/users';

class Login extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            username: '',
            password: '',
            formSelect: '',
            errorMsg: '',
            success: false,
            users: []
        }
    }

    componentWillMount() {
        this.setState({
            formSelect: 'login'
        });
        this.getUser();
    }

    getUser() {
        fetch(url, {method: 'get'})
            .then(response => response.json())
            .then(users => this.setState({users}))
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = name => event => {
        let state = {[name]: event.target.value};
        if (this.state.errorMsg !== '') {
            state = {...state, errorMsg: ''}
        }
        this.setState(state);
    };

    toggleForm() {
        this.setState(prevState => ({
            username: '',
            password: '',
            errorMsg: '',
            formSelect: prevState.formSelect === 'login' ? 'register' : 'login',
        }))
    }

    login() {
        const {username, password, users} = this.state;
        let errorMsg = '账户不存在';
        if (username.trim() === '' || password === '') {
            errorMsg = '输入内容不能为空';
        } else {
            for (let user of users) {
                if (user.username === username) {
                    if (user.password !== password) {
                        errorMsg = '账户密码不匹配';
                    } else {
                        errorMsg = '';
                    }
                }
            }
        }
        if (errorMsg === '') {
            console.log('登陆成功');
            this.setState({success:true});
        }
        this.setState({errorMsg})
    }

    register() {
        const {username, password, users} = this.state;
        let userIds = users.map(v => v.id);
        let errorMsg = '';
        if (username.trim() === '' || password === '') {
            errorMsg = '输入内容不能为空';
            this.setState({errorMsg});
            return false;
        }
        if (userIds.indexOf(username) !== -1) {
            errorMsg = '已存在该账户';
            this.setState({errorMsg});
            return false;
        } else {
            let data = {username, password, createTime: +new Date()};
            console.log(data)
            fetch(url,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({errorMsg});
                    this.getUser();
                    console.log('登陆成功')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <Grid className={this.classes.root} container spacing={0} justify="center" alignItems="center"
                  direction="column">
                {this.state.formSelect === 'login' ?
                    <Grid container spacing={0} justify="center" alignItems="center" direction="column"
                          className={`${this.classes.loginBox} ${css(animation.tinLeftIn)}`}>
                        <Button fab color="accent"
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
                        {this.state.errorMsg ?
                            <Grid item style={{position: 'relative'}}>
                                <span
                                    className={`${this.classes.errorMsg} ${css(animation.slideDownReturn)}`}>{this.state.errorMsg}</span>
                            </Grid>
                            : null
                        }
                        <Grid item>
                            <Button raised color="primary"
                                    className={this.classes.submit}
                                    onClick={() => this.login()}>
                                {this.state.success?<Done/>:'GO'}
                            </Button>
                        </Grid>
                    </Grid> :
                    <Grid container spacing={0} justify="center" alignItems="center" direction="column"
                          className={`${this.classes.loginBox} ${css(animation.tinRightIn)}`}>
                        <Button fab color="accent"
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
                        {this.state.errorMsg ?
                            <Grid item style={{position: 'relative'}}>
                                <span
                                    className={`${this.classes.errorMsg} ${css(animation.slideDownReturn)}`}>{this.state.errorMsg}</span>
                            </Grid>
                            : null
                        }
                        <Grid item>
                            <Button raised color="primary" className={this.classes.submit}
                                    onClick={() => this.register()}>
                                {this.state.success?<Done/>:'GO'}
                            </Button>
                        </Grid>
                    </Grid>}
            </Grid>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);