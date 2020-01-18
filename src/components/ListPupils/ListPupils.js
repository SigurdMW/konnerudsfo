import React, { useState, useEffect } from 'react';
import Button from "../Button"
import { Modal, Tag, Card } from "antd"
import "./PupilList.scss"

const { confirm } = Modal

export const ListPupils = ({ pupils, deletePupil, removeCourseFromPupil }) => {
	const [gradeAndClass, setGradeAndClass] = useState({})
	
	useEffect(() => {
		const groupedByGradeAndClass = pupils.reduce((grouped, pupil) => {
			if (grouped[pupil.gradeAndClass]) {
				grouped[pupil.gradeAndClass].push(pupil)
			} else {
				grouped[pupil.gradeAndClass] = [pupil]
			}
			return grouped
		}, {})
		setGradeAndClass(groupedByGradeAndClass)
	}, [pupils])

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

	return (
		<ul className="pupil-list">
			{Object.entries(gradeAndClass).map(([key, value]) => (
				<li>
					<Card size="small" title={`Klasse ${key}`}>
						<ul>
							{value.map(pupil => (
								<li key={pupil.key} draggable="true" onDragStart={drag(pupil.key)}>
									{pupil.name}
			
									<Button type="link" shape="round" icon="delete" size="small" onClick={confirmDelete(pupil)} />
									{pupil.courses && pupil.courses.map((course) => (
										<Tag closable onClose={() => removeCourseFromPupil(pupil.key, course)}>
											{course}
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