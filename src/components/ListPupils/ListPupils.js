import React, { useState } from 'react';
import Button from "../Button"
import { Modal, Tag, Card } from "antd"
import "./PupilList.scss"
import AddPupil from "../AddPupil"

const { confirm } = Modal

export const ListPupils = ({
	deletePupil,
	removeCourseFromPupil,
	getCourseName,
	getPupilsByClass
}) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [pupilToEdit, setPupilToEdit] = useState(null)

	const initEdit = (pupil) => {
		setShowEditModal(true)
		setPupilToEdit(pupil)
	}

	const endEdit = () => {
		setShowEditModal(false)
		setTimeout(() => {
			setPupilToEdit(null)
		}, 200)
	}

	const confirmDelete = () => {
		confirm({
			title: `Er du sikker på at du vil slette eleven ${pupilToEdit.name} i klasse ${pupilToEdit.gradeAndClass}?`,
			content: '',
			onOk() {
				deletePupil(pupilToEdit.key)
				endEdit()
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
		<React.Fragment>
			<ul className="pupil-list">
				{Object.entries(gradeAndClass).map(([key, value]) => (
					<li key={key}>
						<Card size="small" title={`Klasse ${key}`}>
							<ul>
								{value.map(pupil => (
									<li key={pupil.key} draggable="true" onDragStart={drag(pupil.key)} className="pupil-list-item">
										{pupil.name}
				
										<Button type="link" shape="round" icon="edit" size="small" onClick={() => initEdit(pupil)} />
										{pupil.courses && pupil.courses.map((course) => (
											<Tag closable onClose={() => removeCourseFromPupil(pupil.key, course)} key={course.key}>
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
			<Modal
				title="Oppdater elev"
				visible={showEditModal}
				onOk={endEdit}
				onCancel={endEdit}>
					{pupilToEdit &&
						<React.Fragment>
							<AddPupil pupil={pupilToEdit} update={true} />
							<br />
							<br />
							<Button type="danger" icon="delete" onClick={confirmDelete}>Slett elev</Button>
						</React.Fragment>
					}
			</Modal>
		</React.Fragment>
	);
};

export default ListPupils;