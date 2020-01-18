import React, { useState } from 'react';
import Button from '../Button';
import { Form, Icon, Input, Alert, message } from 'antd';


export const AddCourse = ({ addCourse }) => {
	const [name, setName] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		setError("")
		if (!name) {
			setError("Du må angi navn på kurset.")
			return
		}
		addCourse(name)
		message.info(`Kurset ${name} ble lagt til!`)
		setName("")
	}
	return (
		<Form onSubmit={handleSubmit} className="login-form">
			{error && <Alert message={error} type="error" />}
			<Form.Item>
				<Input
				onChange={(e) => setName(e.target.value)}
				value={name}
					prefix={<Icon type="thunderbolt" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Kurs"
				/>
			</Form.Item>
			<Button type="primary" htmlType="submit" className="login-form-button">
				Legg til kurs
			</Button>
		</Form>
	);
};

export default AddCourse;