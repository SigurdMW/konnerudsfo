import React, { useState } from 'react';
import Button from '../Button';
import { Form, Icon, Input, Alert, message, Switch } from 'antd';
import Datepicker from "../Datepicker"
import { weekNumber } from "../../utils/weekNumber"

export const AddCourse = ({
	addCourse,
	updateCourse,
	course = {
		name: "",
		startDate: null,
		endDate: null,
		showWeekNumber: false,		
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
	const [showWeekNumber, setShowWeekNumber] = useState(course.showWeekNumber)
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
				place,
				showWeekNumber
			})
			message.info(`Kurset ${name} ble oppdatert!`)
		} else {
			addCourse({
				name,
				startDate,
				endDate,
				time,
				place,
				showWeekNumber
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
						<Datepicker
							label="Fra dato"
							date={startDate}
							onChange={setStartDate}
							id="startdate"
						/>
						Uke: {startDate && weekNumber(startDate)}
					</div>
					<div>
						<Datepicker
							label="Til dato"
							date={!endDate && startDate ? (new Date()).setDate((new Date()).getDate() + 7) : endDate }
							onChange={setEndDate}
							id="enddate"
						/>
						Uke: {(startDate || endDate) && weekNumber(endDate || startDate)}
					</div>
				</div>
			</Form.Item>
			<Form.Item>
				<Switch
					onChange={() => setShowWeekNumber(!showWeekNumber)}
					checked={showWeekNumber || undefined}
					unCheckedChildren="Dato"
					checkedChildren="Uke"
				/>
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