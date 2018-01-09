import React, {Component} from 'react';
import {Button} from 'material-ui';
import {withStyles} from 'material-ui/styles';
const styles = theme => ({});

class Home extends Component {
    render() {
        return (
            <div className="login-page">
                <Button raised color="primary">
                    Home
                </Button>
            </div>
        );
    }
}
export default withStyles(styles)(Home);