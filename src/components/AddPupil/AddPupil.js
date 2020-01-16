import React, { useState } from 'react';

export const AddPupil = ({ addPupil }) => {
	const [name, setName] = useState("")
	const [gradeAndClass, setGradeAndClass] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		setError("")
		if (!name || !gradeAndClass) {
			setError("Du må angi både navn og klasse.")
			return
		}
		addPupil(name, gradeAndClass)
		setName("")
		setGradeAndClass("")
	}
	return (
		<form action="" method="get" onSubmit={handleSubmit}>
			{error && error}
			<input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)} value={name} />
			<input type="text" placeholder="Klasse" onChange={(e) => setGradeAndClass(e.target.value)} value={gradeAndClass} />
			<button>Submit</button>
		</form>
	);
};

export default AddPupil;