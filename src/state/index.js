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

	deleteCourse = (key) => {
		this.setState(prevState => {
			return {
				courses: prevState.courses.filter(c => c.key !== key)
			}
		})
	}

	addPupil = (name, gradeAndClass, courses = []) => {
		this.setState({
			pupils: [...this.state.pupils, {name, gradeAndClass, courses}]
		})
	}

	deletePupil = (key) => {
		this.setState(prevState => {
			return {
				pupils: prevState.pupils.filter(p => p.key !== key)
			}
		})
	}

	removeCourseFromPupil = (pupilKey, courseKey) => {
		this.setState(prevState => {
			const newPupils = [...prevState.pupils]
			const pupil = newPupils.find(p => p.key === pupilKey)
			pupil.courses = pupil.courses.filter(c => c !== courseKey)
			return {
				pupils: newPupils
			}
		})
	}

	addPupilToCourse = (pupilKey, courseKey) => {
		this.setState(prevState => {
			return {
				pupils: prevState.pupils.map((p) => {
					if (p.key === pupilKey) {
						if (p.courses && p.courses.length) {
							if (!p.courses.includes(courseKey)) p.courses.push(courseKey)
						} else {
							p.courses = [courseKey]
						}
					}
					return p
				})
			}
		})
	}

	render() {
		return (
			<Provider
				value={{
					isLoggedIn: this.state.isLoggedIn,
					setIsLoggedIn: this.setIsLoggedIn,
					
					pupils: this.state.pupils,
					isLoadingPupils: this.state.isLoadingPupils,
					addPupil: this.addPupil,
					deletePupil: this.deletePupil,
					removeCourseFromPupil: this.removeCourseFromPupil,
					addPupilToCourse: this.addPupilToCourse,
					
					courses: this.state.courses,
					isLoadingCourses: this.state.isLoadingCourses,
					addCourse: this.addCourse,
					deleteCourse: this.deleteCourse,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { StateContextProvider, Consumer as StateContextConsumer };