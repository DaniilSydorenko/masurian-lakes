import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	appViewMode: 'map',
	sortedBy: 'temperature',
	lastUpdate: false,
	userLatitude: false,
	userLongitude: false
};

const setAppViewMode = (state, action) => {
	return updateObject(state, { appViewMode: action.appViewMode });
};

const sortListBy = (state, action) => {
	return updateObject(state, { sortedBy: action.sortedBy });
};

const getLastUpdate = (state, action) => {
	return updateObject(state, { lastUpdate: action.lastUpdate });
};

const getUserGeolocation = (state, action) => {
	return updateObject(state, {
		userLatitude: action.userGeolocation.userLatitude,
		userLongitude: action.userGeolocation.userLongitude
	});
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.SET_APP_VIEW_MODE: return setAppViewMode(state, action);
		case actionTypes.SORT_LIST_BY: return sortListBy(state, action);
		case actionTypes.GET_LAST_UPDATE: return getLastUpdate(state);
		case actionTypes.GET_USER_GEOLOCATION: return getUserGeolocation(state);
		default: return state;
	}
};

export default reducer;
