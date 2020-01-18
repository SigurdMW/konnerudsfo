import React, { useState, useEffect } from 'react';
import firebase from "firebase"
import { Form, Icon, Input, Button, Alert } from 'antd';
import "./Login.scss"
import { useHistory } from 'react-router-dom';

export const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setError("")
	}, [email, password])

	const signin = (email, password) => new Promise((res, rej) => {
		setError("")
		setIsLoading(true)
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				res()
			})
			.catch((error) => {
				setError(error.message)
				rej()
			})
			.finally(() => {
				setIsLoading(false)
			})
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		signin(email, password)
			.then(() => {
				history.push("/home")
				window.location.reload()
			})
	}
	if (isLoading) return <div>Is loading...</div>
	return (
		<div>
			<h1>Logg inn</h1>
			<Form onSubmit={handleSubmit} className="login-form">
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
};

export default Login;