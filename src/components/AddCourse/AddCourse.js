import React, { useState } from 'react';
import { successTost } from '../../toast';

export const AddCourse = ({ addCourse }) => {
	const [name, setName] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		setError("")
		if (!name) {
			setError("Du må angi navn.")
			return
		}
		addCourse(name)
		successTost(`${name} ble lagt til!`)
		setName("")
	}
	return (
		<form action="" method="get" onSubmit={handleSubmit}>
			{error && error}
			<input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)} value={name} />
			<button>Submit</button>
		</form>
	);
};

export default AddCourse;