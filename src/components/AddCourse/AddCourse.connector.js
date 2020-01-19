import React from 'react';
import { StateContextConsumer } from '../../state';
import AddCourse from "./AddCourse"

export const AddPupilConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <AddCourse addCourse={context.addCourse} updateCourse={context.updateCourse} {...props} />
		}}
		</StateContextConsumer>
	);
};

export default AddPupilConnector;