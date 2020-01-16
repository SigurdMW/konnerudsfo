import React from "react"
import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"

export const Router = (props) => {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/home">
						<Dashboard />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};


export default Router;