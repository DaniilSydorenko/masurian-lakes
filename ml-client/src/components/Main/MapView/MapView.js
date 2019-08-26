import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import TestMarker from './TestMarker';
import img from '../../../assets/img/bubble.svg';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class MapView extends Component {
	state = {
		active: null
	};
	
	handleClick = (lake) => {
		this.setState({
			active: this.state.active !== lake.id ? lake.id : null
		})
	};
	
	render() {
		return <GoogleMap defaultZoom={6} defaultCenter={{ lat: 52.7282632, lng: 18.2360822 }}
						  defaultOptions={{
							  zoomControlOptions: {
								  position: window.google.maps.ControlPosition.RIGHT_CENTER
							  },
							  streetViewControlOptions: {
								  position: window.google.maps.ControlPosition.RIGHT_CENTER
							  },
						  }}
		>
			{this.props.isMarkerShown && this.props.lakes.map(lake => {
				return (
					<MarkerWithLabel key={lake.id} position={{ lat: parseFloat(lake.latitude), lng: parseFloat(lake.longitude) }}
									 // icon={' '}
									 lake={lake} nearestLake={this.props.nearestLake[0]} labelAnchor={new window.google.maps.Point(0, 17)}
									 labelStyle={{
									 	backgroundColor: this.state.active === lake.id ? "#98A6FF" : "#FFF74F",
										fontSize: "10px",
										fontWeight: "100",
										color: "#282828",
										padding: "2px",
										border: "thin solid #282828"
									 }}
									 onClick={this.handleClick.bind(this, lake)}>
						<div>
							<h4 style={ { margin: 0 } }>
								<span>{`${lake.title}: `}</span>
								<span>{`${lake.temperature}°C `}</span>
							</h4>
							{this.state.active === lake.id && <div>
								<h4 style={ { margin: 0 } }>{`Distance: ${lake.distance}km`}</h4>
							</div>}
						</div>
					</MarkerWithLabel>
				);
			})}
		</GoogleMap>;
	}
}

export default withScriptjs(withGoogleMap(MapView));
