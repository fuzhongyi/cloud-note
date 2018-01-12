import React, {Component} from 'react';
import {LinearProgress} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
const styles = theme => ({
    loading: {
        position: 'absolute',
        width: '100%'
    }
});

class Loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <LinearProgress color="accent" className={classes.loading}
                            style={{display: this.props.loading ? null : 'none'}}/>

        );
    }
}
const mapStateToProps = (state) => {
    return {loading: state.loading}
};
export default connect(mapStateToProps)(withStyles(styles)(Loading));