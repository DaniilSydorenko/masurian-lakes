import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ViewList from '@material-ui/icons/ViewList';
import { setAppViewMode } from '../../store/actions/actionCreators';

import './style.scss';

const styles = theme => ({
	root: {
		height: 'auto',
		width: '80px',
		position: 'absolute',
		bottom: '3%',
		left: '3%',
		zIndex: 1500,
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
		boxShadow: '2px 2px 3px 0px #564d4d',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: 56,
			left: 0,
			bottom: 0,
			flexDirection: 'row',
			boxShadow: '0px 0px 5px 0px #564d4d'
		}
	}
});

class Panel extends Component {
	state = {
		value: 'map',
	};
	
	componentDidUpdate(prevProps, prevState) {
		if ((this.props.right !== prevProps.right) && !this.props.right) {
			this.setState({
				value: 'map',
			});
		}
	}
	
	handleChange = (event, value) => {
		this.setState({ value });
		this.props.onToggleDrawer(value === 'list')();
	};
	
	render() {
		const { classes } = this.props;
		const { value } = this.state;
		
		return (
			<BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
				<BottomNavigationAction label="List" value="list" icon={<ViewList />} className={'button1'} />
				<BottomNavigationAction label="Map" value="map" icon={<LocationOnIcon />} className={'button1'} />
			</BottomNavigation>
		);
	}
}

Panel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		appViewMode: state.view.appViewMode,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetAppViewMode: (mode) => dispatch(setAppViewMode(mode))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Panel));
