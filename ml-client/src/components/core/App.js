import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../Layout/Layout';

class App extends Component {
	render () {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Layout}/>
					<Redirect from="*" to="/" />
				</Switch>
			</div>
		);
	}
}

export default App;
