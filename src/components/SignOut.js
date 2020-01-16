import React, { useState } from 'react';
import firebase from "firebase"
import { StateContextConsumer } from '../state';
import { useHistory } from "react-router-dom"

export const SignOut = (props) => {
	const [error, setError] = useState("")
	const history = useHistory();

	const logout = (setIsLoggedIn) => () => {
		setError("")
		firebase.auth().signOut().then(() => {
			setIsLoggedIn(false)
			history.push("/")
		}).catch(function(error) {
			setError(error.message || "En feil hindret utlogging.")
		});
	}
	return (
		<StateContextConsumer>
		{(context) => {
			if (!context.isLoggedIn) return null
			return (
				<div>
					{error && error}
					<button onClick={logout(context.setIsLoggedIn)}>Logg ut</button>
				</div>
			)}
		}
		</StateContextConsumer>
	);
};

export default SignOut;