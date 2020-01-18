import React, { useState } from 'react';
import { Modal } from 'antd';
import Button from './Button';
import AddPupil from './AddPupil/';
import ListPupils from './ListPupils/';

export const Courses = (props) => {
	const [showModal, setShowModal] = useState(false)
	return (
		<div>
			<h2>Elever
				<Button type="primary" shape="round" icon="plus-circle" size={100} onClick={() => setShowModal(true)}>
					Ny elev
				</Button>
			  </h2>
			<Modal
				title="Legg til ny elev"
				visible={showModal}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
				>
					<AddPupil />
			</Modal>
			<ListPupils />
		</div>
	);
};

export default Courses;