import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortBy } from '../../store/utility';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Place from '@material-ui/icons/Place';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';


const styles = theme => ({
	list: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
		[theme.breakpoints.up('md')]: {
			width: '500px',
		},
		[theme.breakpoints.up('lg')]: {
			width: '600px',
		},
	},
	fullList: {
		width: 'auto',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

class SideBox extends Component {
	state = {
		criteria: 'temperature',
		order: 'asc'
	}
	
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleLakesSortOrder(order) {
		this.setState({
			order
		});
	}
	
    render() {
		const { classes } = this.props;
		
		const sideList = (
			<div className={classes.list}>
				<div>
					<FormControl className={classes.formControl}>
						<Select
							value={this.state.criteria}
							onChange={this.handleChange}
							displayEmpty
							name="criteria"
						>
							<MenuItem value={'temperature'}>Temperatura</MenuItem>
							<MenuItem value={'distance'}>Odległość</MenuItem>
							<MenuItem value={'alphabet'}>Alphabet</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="contained"
						className={classes.button}
						onClick={() => this.handleLakesSortOrder('asc')}
					>
						<ArrowUpward/>
					</Button>
					<Button
						variant="contained"
						className={classes.button}
						onClick={() => this.handleLakesSortOrder('desc')}
					>
						<ArrowDownward/>
					</Button>
				</div>
				<Divider />
				<List>
					<ListItem>
						<ListItemIcon><Place /></ListItemIcon>
						<ListItemText primary={<strong>Jezioro</strong>} style={{width: '30%'}}/>
						<ListItemText primary={<strong>Temperatura</strong>} style={{width: '10%'}} />
						<ListItemText primary={<strong>Odległość</strong>} style={{width: '10%'}} />
					</ListItem>
					{sortBy(this.props.lakes, this.state.criteria, this.state.order).map((lake, index) => (
						<ListItem button key={lake.id}>
							<ListItemIcon><Place /></ListItemIcon>
							<ListItemText primary={lake.title} style={{width: '30%'}}/>
							<ListItemText primary={`${lake.temperature} °C`} style={{width: '10%'}} />
							<ListItemText primary={`${lake.distance} km`} style={{width: '10%'}} />
						</ListItem>
					))}
				</List>
			</div>
		);

		return (
            <div>
				<SwipeableDrawer
					anchor="right"
					open={this.props.right}
					onClose={this.props.onToggleDrawer(false)}
					onOpen={this.props.onToggleDrawer(true)}>
					<div
						tabIndex={0}
						role="button"
						onKeyDown={this.props.onToggleDrawer(false)}>
						{sideList}
					</div>
				</SwipeableDrawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
		loading: state.lakes.loading
	};
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onUpdateLakesTemperature: (lakes) => dispatch(updateLakesTemperature(lakes))
// 	};
// };

export default connect(mapStateToProps, null)(withStyles(styles)(SideBox));
