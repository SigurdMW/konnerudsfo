import React from 'react';
import { StateContextConsumer } from '../../state';
import ListCourses from "./ListCourses"

export const ListCoursesConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <ListCourses
				courses={context.courses}
				deleteCourse={context.deleteCourse}
				addPupilToCourse={context.addPupilToCourse}
				getPupilsForCourse={context.getPupilsForCourse}
				getPupilsByClass={context.getPupilsByClass}
			/>
		}}
		</StateContextConsumer>
	);
};

export default ListCoursesConnector;