import { firebase } from "../firebase.config"

export function createPupil(firstName, theClass) {
	firebase.database().ref('pupils/').set({
	  firstName: firstName,
	  class: theClass
	});
}
  