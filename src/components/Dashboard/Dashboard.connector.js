import React from 'react';
import { StateContextConsumer } from '../../state';
import Dashboard from "./Dashboard"

export const DashboardConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <Dashboard isLoading={context.isLoadingPupils && context.isLoadingCourses} />
		}}
		</StateContextConsumer>
	);
};

export default DashboardConnector;