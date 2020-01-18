import React from 'react';
import Pupils from "../Pupils"
import Courses from "../Courses"
import { Spin } from "antd"

export const Dashboard = ({ isLoading }) => {
	if (isLoading) return <Spin />
	return (
		<div>
			<Courses />
			<Pupils />
		</div>
	);
};

export default Dashboard;