import React from 'react';
import { StateContextConsumer } from '../../state';
import ListPupils from "./ListPupils"

export const ListPupilsConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <ListPupils pupils={context.pupils} deletePupil={context.deletePupil} removeCourseFromPupil={context.removeCourseFromPupil} />
		}}
		</StateContextConsumer>
	);
};

export default ListPupilsConnector;