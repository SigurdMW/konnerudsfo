import React from 'react';
import { StateContextConsumer } from '../../state';
import AddPupil from "./AddPupil"

export const AddPupilConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <AddPupil addPupil={context.addPupil} />
		}}
		</StateContextConsumer>
	);
};

export default AddPupilConnector;