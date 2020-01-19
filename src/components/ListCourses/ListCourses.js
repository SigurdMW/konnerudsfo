import React, { useState } from 'react';
import { Card, Modal, Select } from "antd"
import "./ListCourses.scss"
import Button from "../Button"
import AddCourse from "../AddCourse/"

const { confirm } = Modal;
const { Option, OptGroup } = Select;

export const ListCourses = ({
	courses,
	deleteCourse,
	addPupilToCourse,
	getPupilsForCourse,
	getPupilsByClass
}) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [courseToEdit, setCourseToEdit] = useState(null)
	const [dragActiveClass, setDragActiveClass] = useState("")

	const initEdit = (course) => {
		setShowEditModal(true)
		setCourseToEdit(course)
	}

	const endEdit = () => {
		setShowEditModal(false)
		setTimeout(() => {
			setCourseToEdit(null)
		}, 200)
	}

	const initDeleteCourse = () => {
		confirm({
			title: `Er du sikker på at du vil slette kurset ${courseToEdit.name}?`,
			content: 'Hvis du sletter det, kan det ikke gjenopprettes.',
			onOk() {
				deleteCourse(courseToEdit.key)
				endEdit()
			},
			onCancel() {},
			cancelText: "Avbryt"
		});
	}

	function allowDrop(ev) {
		ev.preventDefault();
		ev.target.classList.add("drop-target")
	}

	const removeDropZone = (ev) => {
		ev.preventDefault()
		ev.target.classList.remove("drop-target")
	}

	const drop = (courseKey) => (ev) => {
		ev.preventDefault();
		const pupilKey = ev.dataTransfer.getData("pupilkey");
		addPupilToCourse(pupilKey, courseKey)
		removeDropZone(ev)
	}

	const handleAddPupil = (courseKey) => (pupilKey) => {
		addPupilToCourse(pupilKey, courseKey)
	}

	const getPupilsNotEnrolled = (courseKey, pupils) => {
		const enrolled = getPupilsForCourse(courseKey)
		return pupils.filter(p => enrolled.findIndex(e => e.key === p.key) === -1)
	}
	
	const pupilsByClass = getPupilsByClass()
	return (
		<React.Fragment>
			<ul
				className="courses-list"
				onDragEnter={() => setDragActiveClass("courses-list__drop--active")}
				onDragExit={() => setDragActiveClass("")}
				onDrop={() => setDragActiveClass("")}
			>
				{courses.map(course => (
					<li
						key={course.key}
					>
						<div >
							<Card
								title={course.name}
								extra={<Button type="link" shape="round" icon="edit" size="small" onClick={() => initEdit(course)} />}
								style={{ width: "100%" }}
								size="small"
							>
								<div
									onDragOver={allowDrop}
									onDragEnd={removeDropZone}
									onDragExit={removeDropZone}
									onDrop={drop(course.key)}
									className={"courses-list__drop " + dragActiveClass}
								></div>
								<ul className="courses-list-members">
									{getPupilsForCourse(course.key).map(p => (
										<li key={p.key}>
											<span>{p.name}, {p.gradeAndClass}</span>
										</li>
									))}
								</ul>

								<Select
									style={{ width: "100%" }}
									size="small"
									onChange={handleAddPupil(course.key)}
									placeholder="Legg til elev"
								>
									{Object.entries(pupilsByClass).map(([key, value]) => (
										<OptGroup label={`Klasse ${key}`} key={key}>
											{getPupilsNotEnrolled(course.key, value).map((pupil => <Option value={pupil.key} key={pupil.key}>{pupil.name}</Option>))}
										</OptGroup>
									))}
								</Select>
							</Card>
						</div>
					</li>
				))}
			</ul>
			<Modal
				title="Oppdater kurs"
				visible={showEditModal}
				onOk={endEdit}
				onCancel={endEdit}>
					{courseToEdit &&
						<React.Fragment>
							<AddCourse course={courseToEdit} update={true} />
							<br />
							<br />
							<Button type="danger" icon="delete" onClick={initDeleteCourse}>Slett kurs</Button>
						</React.Fragment>
					}
			</Modal>
		</React.Fragment>
	);
};

export default ListCourses;