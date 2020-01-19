import React, { useState } from 'react';
import Button from '../Button';
import { Form, Icon, Input, Alert, message } from 'antd';


export const AddCourse = ({
	addCourse,
	updateCourse,
	course = {
		name: "",
		startDate: null,
		endDate: null,
		place: "",
		time: ""
	},
	update = false
}) => {
	const [name, setName] = useState(course.name)
	const [startDate, setStartDate] = useState(course.startDate)
	const [endDate, setEndDate] = useState(course.endDate)
	const [place, setPlace] = useState(course.place)
	const [time, setTime] = useState(course.time)
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		setError("")
		if (!name) {
			setError("Du må angi navn på kurset.")
			return
		}
		if (update) {
			updateCourse({
				key: course.key,
				name,
				startDate,
				endDate,
				time,
				place
			})
			message.info(`Kurset ${name} ble oppdatert!`)
		} else {
			addCourse({
				name,
				startDate,
				endDate,
				time,
				place
			})
			message.info(`Kurset ${name} ble lagt til!`)
			setName("")
			setStartDate()
			setEndDate()
			setPlace("")
			setTime("")
		}
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
			<Form.Item>
				<div style={{display: "flex"}}>
					<div style={{flex: 1}}>
						<label htmlFor="startdate">Fra dato</label>
						<Input
							onChange={(e) => setStartDate(e.target.value)}
							value={startDate}
							prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Start dato"
							type="date"
							id="startdate"
						/>
					</div>
					<div>
						<label htmlFor="todate">Til dato</label>
						<Input
							onChange={(e) => setEndDate(e.target.value)}
							value={endDate}
							prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Slutt dato"
							type="date"
							id="todate"
						/>
					</div>
				</div>
			</Form.Item>
			<Form.Item>
				<Input
					onChange={(e) => setPlace(e.target.value)}
					value={place}
					prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Sted"
				/>
			</Form.Item>
			<Form.Item>
				<Input
					onChange={(e) => setTime(e.target.value)}
					value={time}
					prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Klokkeslett"
				/>
			</Form.Item>
			<Button type="primary" htmlType="submit" className="login-form-button">
				{update ? "Oppdater" : "Legg til kurs"}
			</Button>
		</Form>
	);
};

export default AddCourse;