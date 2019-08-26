import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import HaversineGeolocation from 'haversine-geolocation';
import { getCurrentPoint } from '../utility';

export const fetchLakesSuccess = (lakes) => {
	return {
		type: actionTypes.FETCH_LAKES_SUCCESS,
		lakes
	};
};

export const fetchLakesFail = (error) => {
	return {
		type: actionTypes.FETCH_LAKES_FAIL,
		error
	};
};

export const fetchLakesStart = () => {
	return {
		type: actionTypes.FETCH_LAKES_START
	};
};

export const fetchLakes = () => {
	return dispatch => {
		
		dispatch(fetchLakesStart());
		
		async function getUpdatedLakes () {
			const lakes = await axios.get('/lakes.json')
				.then(res => res.data)
				.catch(err => {
					dispatch(fetchLakesFail(err));
				});
			
			return await HaversineGeolocation.isGeolocationAvailable()
				.then(data => {
					return lakes.map(lake => ({
							...lake,
							distance: HaversineGeolocation.getDistanceBetween(getCurrentPoint(data), lake)
						}));
				})
				.catch(err => {
					dispatch(fetchLakesFail(err));
				});
		}
		
		getUpdatedLakes().then(data => {
			dispatch(fetchLakesSuccess(data));
			// TODO dispatch nearest lake HERE
		});
	};
};

export const setAppViewMode = (mode) => {
	return {
		type: actionTypes.SET_APP_VIEW_MODE,
		appViewMode: mode
	};
};

// TODO clean from haversine here

export const updateLakesTemperature = (lakes) => {
	return dispatch => {
		dispatch(fetchLakesStart());
		
		HaversineGeolocation.isGeolocationAvailable()
			.then(data => {
				const updatedLakes = lakes.map(lake => {
					return {
						...lake,
						distance: HaversineGeolocation.getDistanceBetween(getCurrentPoint(data), lake)
					};
				})
				dispatch(fetchLakesSuccess(updatedLakes));
			});
	
	};
};

export const getNearestLakeSuccess = (nearestLake) => {
	return {
		type: actionTypes.GET_NEAREST_LAKE,
		nearestLake
	};
};

export const getNearestLake = (lakes) => {
	console.log(lakes)
	let smallestDistance = null;
	let nearestLake = [];
	
	for (let key in lakes) {
		HaversineGeolocation.isGeolocationAvailable()
			.then(data => {
				let distance = HaversineGeolocation.getDistanceBetween(getCurrentPoint(data), lakes[key]);
				if (smallestDistance === null || distance < smallestDistance) {
					smallestDistance = distance;
					nearestLake.splice(0,1);
					nearestLake.push(lakes[key].id);
				}
			});
	}
	
	return dispatch => {
		dispatch(getNearestLakeSuccess(nearestLake));
	};
};
