import React, { useState } from 'react';
import { Form, Icon, Input, Alert } from 'antd';
import Button from '../Button';

export const AddPupil = ({
	addPupil,
	updatePupil,
	update = false,
	pupil = { name: "", gradeAndClass: ""}
}) => {
	const [name, setName] = useState(pupil.name)
	const [gradeAndClass, setGradeAndClass] = useState(pupil.gradeAndClass)
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		setError("")
		if (!name || !gradeAndClass) {
			setError("Du må angi både navn og klasse.")
			return
		}
		if (update) {
			updatePupil({
				key: pupil.key,
				name,
				gradeAndClass
			})
		} else {
			addPupil(name, gradeAndClass)
			setName("")
			setGradeAndClass("")
		}
	}
	return (
		<Form onSubmit={handleSubmit} className="login-form">
			{error && <Alert message={error} type="error" />}
			<Form.Item>
				<Input
					onChange={(e) => setName(e.target.value)}
					value={name}
					prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Navn"
				/>
			</Form.Item>
			<Form.Item>
				<Input
					onChange={(e) => setGradeAndClass(e.target.value)}
					value={gradeAndClass}
					prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Klasse"
				/>
			</Form.Item>
			<Button type="primary" htmlType="submit" className="login-form-button">
				{update ? "Oppdater" : "Legg til elev"}
			</Button>
		</Form>
	);
};

export default AddPupil;