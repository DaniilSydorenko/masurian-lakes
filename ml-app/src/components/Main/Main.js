import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToTimer } from '../../api';

import { fetchLakes, updateLakesTemperature, getNearestLake } from '../../store/actions/actionCreators';
import MapView from './MapView/MapView'
import SideBox from '../SideBox/SideBox'
import Panel from '../Panel/Panel';

import { CONFIG } from '../../config';

class Main extends Component {
	state = {
		right: false
	};
	
	constructor (props) {
		super(props);
		
		subscribeToTimer((err, lakes) => {
			this.props.onUpdateLakesTemperature(lakes);
			// this.props.onGetNearestLake(lakes);
		});
	}
	
	componentDidMount() {
		this.props.onFetchLakes();
		this.props.onGetNearestLake(this.props.lakes);
	}

	toggleDrawer = (open) => () => {
		this.setState({
			right: open,
		});
	};
	
    render() {
		return (
			<main className={'main'}>
				<MapView
					isMarkerShown
					googleMapURL={CONFIG.MAP_CONFIG}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100vh` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					lakes={this.props.lakes}
					nearestLake={this.props.nearestLake}
				/>

				<Panel
					appViewMode={this.state.appViewMode}
					onAppViewModeChange={this.setAppViewMode}
					onToggleDrawer={this.toggleDrawer}
					right={this.state.right}
				/>
				
				<SideBox
					appViewMode={this.state.appViewMode}
					onAppViewModeChange={this.setAppViewMode}
					onToggleDrawer={this.toggleDrawer}
					right={this.state.right}
					lakes={this.props.lakes}
				/>
			</main>
        );
    }
}

const mapStateToProps = state => {
	return {
		lakes: state.lakes.lakes,
		nearestLake: state.lakes.nearestLake,
		loading: state.lakes.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchLakes: () => dispatch(fetchLakes()),
		onGetNearestLake: (lakes) => dispatch(getNearestLake(lakes)),
		onUpdateLakesTemperature: (lakes) => dispatch(updateLakesTemperature(lakes))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
