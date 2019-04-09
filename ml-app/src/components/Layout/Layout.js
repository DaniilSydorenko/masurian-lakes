import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLakes } from '../../store/actions/actionCreators';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Aux from '../hoc/Aux/Aux';
import Main from '../Main/Main'

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});

class Layout extends Component {
	state = {
		appViewMode: 'map'
	};
	
	componentDidMount() {
		this.props.onFetchLakes();
	}
	
	setAppViewMode = (mode) => {
		this.setState({
			appViewMode: mode
		});
	};
	
    render() {
		const { classes } = this.props;
		
        return (
			<Aux>
				<div className={classes.root}>
					<Grid container spacing={0}>
						<Grid item xs={12}>
							<Main
								lakes={this.props.lakes}
								appViewMode={this.state.appViewMode}
							/>
						</Grid>
					</Grid>
				</div>
			</Aux>
        );
    }
}

const mapStateToProps = state => {
	return {
		lakes: state.lakes.lakes,
		loading: state.lakes.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchLakes: () => dispatch(fetchLakes()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));
