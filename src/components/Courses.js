import React, { useState } from 'react';
import AddCourse from './AddCourse/';
import ListCourses from "./ListCourses/"
import { Typography, Icon, Modal } from 'antd';
import Button from './Button';

const { Title } = Typography;

export const Courses = (props) => {
	const [showModal, setShowModal] = useState(false)
	return (
		<div>
			<h1>Kurs
				<Button type="primary" shape="round" icon="plus-circle" size={100} onClick={() => setShowModal(true)}>
					Nytt kurs
				</Button>
			  </h1>
			<Modal
				title="Legg til nytt kurs"
				visible={showModal}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
				>
					<AddCourse />
			</Modal>
			<ListCourses />
		</div>
	);
};

export default Courses;