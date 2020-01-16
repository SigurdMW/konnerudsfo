import Rebase from "re-base"
import firebaseSetup from "firebase"

const app = firebaseSetup.initializeApp({
	apiKey: "AIzaSyASmCaFRiSJVkQ1PoQC9MjPMhXNxMjSTYI",
    authDomain: "konnerudsfo.firebaseapp.com",
    databaseURL: "https://konnerudsfo.firebaseio.com",
    projectId: "konnerudsfo",
    storageBucket: "konnerudsfo.appspot.com",
    messagingSenderId: "104002285195",
    appId: "1:104002285195:web:6470d8266ad73f58b92e8e"
});

export const firebase = app.database();
export const base = Rebase.createClass(app.database());