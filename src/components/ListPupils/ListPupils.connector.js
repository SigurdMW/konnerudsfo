import React from 'react';
import { StateContextConsumer } from '../../state';
import ListPupils from "./ListPupils"

export const ListPupilsConnector = (props) => {
	return (
		<StateContextConsumer>
		{(context) => {
			return <ListPupils pupils={context.pupils} />
		}}
		</StateContextConsumer>
	);
};

export default ListPupilsConnector;