import React from 'react';
import { StateContextConsumer } from '../../state';
import ListPupils from "./ListPupils"

export const ListPupilsConnector = () => {
	return (
		<StateContextConsumer>
		{(context) => {
			return (
				<ListPupils
					deletePupil={context.deletePupil}
					removeCourseFromPupil={context.removeCourseFromPupil}
					getCourseName={context.getCourseName}
					getPupilsByClass={context.getPupilsByClass}
				/>
			)
		}}
		</StateContextConsumer>
	);
};

export default ListPupilsConnector;