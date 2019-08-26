import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	lakes: [],
	loading: false
};

const fetchLakesStart = (state) => {
	return updateObject(state, { loading: true });
};

const fetchLakesSuccess= (state, action) => {
	return updateObject(state, { lakes: action.lakes, loading: false });
};

const fetchLakesFail = (state) => {
	return updateObject(state, { loading: false });
};

const updateLakesTemperature = (state, action) => {
	return updateObject(state, { lakes: action.lakes, loading: false });
};

const updateLakesDistance = (state, action) => {
	return updateObject(state, { lakes: action.lakes, loading: false });
};

const getNearestLake = (state, action) => {
	return updateObject(state, { nearestLake: action.nearestLake });
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.FETCH_LAKES_START: return fetchLakesStart(state);
		case actionTypes.FETCH_LAKES_SUCCESS: return fetchLakesSuccess(state, action);
		case actionTypes.FETCH_LAKES_FAIL: return fetchLakesFail(state);
		case actionTypes.UPDATE_LAKES_TEMPERATURE: return updateLakesTemperature(state, action);
		case actionTypes.UPDATE_LAKES_DISTANCE: return updateLakesDistance(state, action);
		case actionTypes.GET_NEAREST_LAKE: return getNearestLake(state, action);
		default: return state;
	}
};

export default reducer;
