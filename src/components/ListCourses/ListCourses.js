import React from 'react';
import { Card, Modal } from "antd"
import "./ListCourses.scss"
import Button from "../Button"

const { confirm } = Modal;

export const ListCourses = ({ courses, deleteCourse, addPupilToCourse, getPupilsForCourse }) => {
	const initDeleteCourse = (course) => () => {
		confirm({
			title: `Er du sikker på at du vil slette kurset ${course.name}?`,
			content: 'Hvis du sletter det, kan det ikke gjenopprettes.',
			onOk() {
				deleteCourse(course.key)
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
	
	return (
		<React.Fragment>
			<ul className="courses-list">
				{courses.map(course => (
					<li
						key={course.key}
					>
						<div >
							<Card
								title={course.name}
								extra={<Button type="link" shape="round" icon="delete" size="small" onClick={initDeleteCourse(course)} />}
								style={{ width: "100%" }}
								size="small"
							>
								<div
									onDragOver={allowDrop}
									onDragEnd={removeDropZone}
									onDragExit={removeDropZone}
									onDrop={drop(course.key)}
									className="courses-list__drop"
								></div>
								<ul>
									{getPupilsForCourse(course.key).map(p => <li>{p.name}</li>)}
								</ul>
							</Card>
						</div>
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default ListCourses;