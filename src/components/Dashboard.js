import React from 'react';
import AddPupil from "./AddPupil/"
import ListPupils from './ListPupils/';
import AddCourse from './AddCourse/';

export const Dashboard = (props) => {
	return (
		<div>
			<ListPupils />
			<AddPupil />
			<h3>legg til kurs</h3>
			<AddCourse />
		</div>
	);
};

export default Dashboard;