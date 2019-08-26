import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const TestMarker = (props) => {
	const {temperature, distance, title, id} = props.lake;
	const color = id === props.nearestLake ? 'error' : 'primary';
	
    return (
        <div>
			<h4 style={ { margin: 0, width: '40px' } }>{`${temperature} °C`}</h4>
			<h4 style={ { margin: 0, width: '40px'} }>{`${distance} km`}</h4>
			<h4 style={ { margin: 0, width: '40px'} }>{`${title}`}</h4>
			<LocationOnIcon color={color} fontSize="large" />
        </div>
    );
};

export default TestMarker;
