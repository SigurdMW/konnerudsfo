import React, { useState, useEffect } from 'react';
import { StateContextConsumer } from '../state';
import firebase from "firebase"
import { useHistory } from "react-router-dom"

export const Login = (props) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const history = useHistory();

	useEffect(() => {
		setError("")
	}, [email, password])

	const signin = (email, password) => new Promise((res, rej) => {
		setError("")
		setIsLoading(true)
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(data => {
				console.log("Signed in", data)
				res()
			})
			.catch(function(error) {
				console.log(error)
				setError(error.message)
				rej()
			})
			.finally(() => {
				setIsLoading(false)
			})
	})

	const handleSubmit = (setIsLoggedIn) => (e) => {
		e.preventDefault()
		signin(email, password)
			.then(() => {
				// setIsLoggedIn(true)
				history.push("/home");
			})
	}

	return (
		<StateContextConsumer>
			{(context) => {
				if (isLoading) return <div>Is loading...</div>
				return (
					<form action="" method="get" onSubmit={handleSubmit(context.setIsLoggedIn)}>
						{error && error}
						<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
						<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
						<button type="submit">Login</button>
					</form>
				)
			}}
		</StateContextConsumer>
	);
};

export default Login;