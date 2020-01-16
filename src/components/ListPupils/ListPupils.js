import React from 'react';

export const ListPupils = ({ pupils }) => {
	return (
		<div>
			<ul>
				{pupils.map(pupil => (<li key={pupil.key}>{pupil.name}</li>))}
			</ul>
		</div>
	);
};

export default ListPupils;