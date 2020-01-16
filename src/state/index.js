import React, { Component } from "react";
import firebase from "firebase"
import { base } from "../firebase.config"

const { Provider, Consumer } = React.createContext();

class StateContextProvider extends Component {
	state = {
		isLoggedIn: false,
		pupils: [],
		isLoadingPupils: true,
		courses: [],
		isLoadingCourses: true
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					isLoggedIn: true
				})
			}
		});

		this.pupilRef = base.syncState('pupils', {
			context: this,
			state: 'pupils',
			asArray: true,
			then() {
			  this.setState({ isLoadingPupils: false });
			}
		});

		this.coursesRef = base.syncState("courses", {
			context: this,
			state: "courses",
			asArray: true,
			then() {
				this.setState({ isLoadingCourses: false })
			}
		})
	}

	setIsLoggedIn = (bool) => {
		this.setState(prevState => {
			return {
				isLoggedIn: bool
			};
		});
	};

	addCourse = (name) => {
		this.setState(prevState => {
			return {
				courses: [...prevState.courses, { name }]
			}
		})
	}

	addPupil = (name, gradeAndClass, courses = []) => {
		this.setState({
			pupils: [...this.state.pupils, {name, gradeAndClass, courses}]
		})
	}

	render() {
		return (
			<Provider
				value={{
					isLoggedIn: this.state.isLoggedIn,
					setIsLoggedIn: this.setIsLoggedIn,
					courses: this.state.courses,
					addCourse: this.addCourse,
					pupils: this.state.pupils,
					addPupil: this.addPupil
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { StateContextProvider, Consumer as StateContextConsumer };
