import React, {Component} from 'react';
import {connect} from 'react-redux';
import {vanishIn} from 'react-magic';
import {StyleSheet, css} from 'aphrodite';
import{
    Button, AppBar, Toolbar, Typography, Slide, Fade, Dialog, IconButton, Avatar
} from
    'material-ui';
import Card, {CardContent} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import List, {ListItem} from 'material-ui/List';
import CloseIcon from 'material-ui-icons/Close';
import {showLoading} from '../store/loading';
import AccountCircle from 'material-ui-icons/AccountCircle';
const animation = StyleSheet.create({
    vanishIn: {
        animationName: vanishIn,
        animationDuration: '1s'
    }
});

const url = '//5a56cb24eb96f9001230ace6.mockapi.io/api/v1/note';
const styles = theme => ({
    list: {
        marginTop: 56,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
    },
    notLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 55px)'
    },
    contentEdit: {
        marginTop: 56,
        whiteSpace: 'pre-wrap',
        padding: '15px 20px',
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            notes: [],
            note: {},
        };
    }

    componentWillMount() {
        if (this.props.user) {
            this.getNotes();
        }
    }

    openContentBox = (note) => {
        this.setState({open: true, note});
    };

    closeConentBox = () => {
        this.setState({open: false});
    };

    transitionUp(props) {
        return <Slide direction="up" {...props} />;
    }

    gotoLogin() {
        this.props.history.push('/login');
    }

    getNotes() {
        this.props.loading(true);
        setTimeout(() => {
            fetch(url, {method: 'get'})
                .then(response => response.json())
                .then(notes => {
                    this.props.loading(false);
                    this.setState({notes});
                })
                .catch(error => {
                    this.props.loading(false);
                    alert(error);
                });
        }, 1000);
    }

    render() {
        return (
            <Fade in={true} timeout={800}>
                <div className="home-page">
                    <AppBar color="accent">
                        <Toolbar>
                            <Typography type="title" color="inherit" style={{flex: 1}}>
                                NOTES
                            </Typography>
                            <Button color="inherit"
                                    onClick={() => this.gotoLogin()}>
                                { this.props.user ? 'Exit' : 'Login'}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {this.props.user ?
                        <List className={this.props.classes.list}>
                            {this.state.notes.map((v, i) => (
                                <div key={i} className={css(animation.vanishIn)}>
                                    <ListItem button onClick={() => this.openContentBox(v)}>
                                        <Card className={this.props.classes.card}>
                                            <CardContent>
                                                <Typography className={this.props.classes.title}>
                                                    {v.time}
                                                </Typography>
                                                <Typography component="div" className={this.props.classes.content}>
                                                    {v.content}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                </div>
                            ))}
                        </List> :
                        <div className={this.props.classes.notLogin}>
                            <Avatar style={{marginRight: '0.5em'}}>
                                <AccountCircle />
                            </Avatar>
                            <Typography type='title' color="inherit" align='center' component='div'>
                                Not Logged In
                            </Typography>
                        </div>
                    }
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        transition={this.transitionUp}>
                        <AppBar color="accent" position='fixed'>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.closeConentBox} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography type="title" color="inherit" style={{flex: 1}}>
                                    {this.state.note.time}
                                </Typography>
                                <Button color="inherit" onClick={this.closeConentBox}>
                                    save
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Typography className={this.props.classes.contentEdit} children={this.state.note.content}/>
                    </Dialog>
                </div>
            </Fade>
        );
    }
}
const mapStateToProps = (state) => {
    return {user: state.user.user}
};
const mapDispatchToProps = (dispatch) => {
    return {
        loading: (flag) => dispatch(showLoading(flag))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));