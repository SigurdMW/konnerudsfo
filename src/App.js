import React from 'react';
import Router from "./Router"
import { StateContextProvider } from './state';

class App extends React.Component {
	render() {
		return (
			<StateContextProvider>
				<Router />
			</StateContextProvider>
		);
	}
}

export default App;
