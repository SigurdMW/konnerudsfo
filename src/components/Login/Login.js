import React, { useState, useEffect } from 'react';
import { StateContextConsumer } from '../../state';
import firebase from "firebase"
import { useHistory } from "react-router-dom"
import { Form, Icon, Input, Button, Alert } from 'antd';
import "./Login.scss"

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
			.catch(function (error) {
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
					<div>
						<h1>Logg inn</h1>
						<Form onSubmit={handleSubmit(context.setIsLoggedIn)} className="login-form">
							{error && <Alert message={error} type="error" />}
							<Form.Item>
								<Input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Username"
								/>
							</Form.Item>
							<Form.Item>
								<Input
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Logg inn
							</Button>
							<br/>
							<br/>
							<p>Ute etter en bruker eller glemt passord? Kontakt <a href="mailto:sigurdmwahl@gmail.com">sigurdmwahl@gmail.com</a>.</p>
						</Form>
					</div>
				)
			}}
		</StateContextConsumer>
	);
};

export default Login;