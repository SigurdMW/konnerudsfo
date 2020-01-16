import React from 'react';
import Router from "./Router"
import { StateContextProvider } from './state';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
	render() {
		return (
			<StateContextProvider>
				<ToastContainer autoClose={5000} position="bottom-right" />
				<Router />
			</StateContextProvider>
		);
	}
}

export default App;
