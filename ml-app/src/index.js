import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './components/core/App';
import lakesReducer from './store/reducers/lakesReducer';
import viewReducer from './store/reducers/viewReducer';

import 'normalize.css'
import './styles/scss/inbdex.scss';

const rootReducer = combineReducers({
	lakes: lakesReducer,
	view: viewReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
