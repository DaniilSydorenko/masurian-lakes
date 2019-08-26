import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Map from '@material-ui/icons/Map';
import List from '@material-ui/icons/List';

const styles = theme => ({
	fab: {
		margin: theme.spacing.unit,
	},
	extendedIcon: {
		marginRight: theme.spacing.unit,
	},
});


const SideBar = (props) => {
	const {
		appViewMode,
		onAppViewModeChange,
		onToggleDrawer
	} = props;
	
	const { classes } = props;
	
	const btnCLasses = `${classes.fab} ${(appViewMode === 'map') ? 'list' : ''}`;
	
	return (
            <div>
				<h4>Lakes</h4>
	
				<Fab color="primary" aria-label="Add" className={btnCLasses}
					 onClick={() => onAppViewModeChange('map')}>
					<Map />
				</Fab>
				<Fab color="secondary" aria-label="Edit" className={btnCLasses}
					 onClick={() => {
						 onAppViewModeChange('list');
						 onToggleDrawer();
					 }}
				>
					<List />
				</Fab>
            </div>
        );
}

// FloatingActionButtons.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(SideBar);
