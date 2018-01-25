import React, {Component} from 'react';
import {Button, Avatar, Divider, AppBar, Toolbar, Typography} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import FolderIcon from 'material-ui-icons/Folder';
import ImageIcon from 'material-ui-icons/Image';
const styles = theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div className="home-page">
                <AppBar position="static" color="accent">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            NOTES
                        </Typography>
                        <Button color="inherit"
                                onClick={() => {
                                    this.props.history.push('/login')
                                }}>Login
                        </Button>
                    </Toolbar>
                </AppBar>
                <List className={this.props.classes.list}>
                    <ListItem button>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        <ListItemText primary="Work" secondary="Jan 28, 2014"/>
                    </ListItem>
                    <Divider inset/>
                    <ListItem button>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                        <ListItemText primary="Vacation" secondary="Jan 20, 2014"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}
export default withStyles(styles)(Home);