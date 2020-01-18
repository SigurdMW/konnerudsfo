import React from 'react';
import Button from "../Button"
import { Modal, Tag, Card } from "antd"
import "./PupilList.scss"

const { confirm } = Modal

export const ListPupils = ({
	deletePupil,
	removeCourseFromPupil,
	getCourseName,
	getPupilsByClass
}) => {
	const confirmDelete = (pupil) => () => {
		confirm({
			title: `Er du sikker på at du vil slette eleven ${pupil.name} i klasse ${pupil.gradeAndClass}?`,
			content: '',
			onOk() {
				deletePupil(pupil.key)
			},
			onCancel() {},
			cancelText: "Avbryt"
		});
	}

	const drag = (pupilKey) => (ev) => {
		ev.dataTransfer.setData("pupilkey", pupilKey);
	}
	const gradeAndClass = getPupilsByClass()
	return (
		<ul className="pupil-list">
			{Object.entries(gradeAndClass).map(([key, value]) => (
				<li>
					<Card size="small" title={`Klasse ${key}`}>
						<ul>
							{value.map(pupil => (
								<li key={pupil.key} draggable="true" onDragStart={drag(pupil.key)} className="pupil-list-item">
									{pupil.name}
			
									<Button type="link" shape="round" icon="delete" size="small" onClick={confirmDelete(pupil)} />
									{pupil.courses && pupil.courses.map((course) => (
										<Tag closable onClose={() => removeCourseFromPupil(pupil.key, course)}>
											{getCourseName(course)}
										</Tag>
									))}
								</li>
							))}
						</ul>
					</Card>
				</li>
			))}
		</ul>
	);
};

export default ListPupils;