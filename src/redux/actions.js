import firebase from "../configs/firebase";

//firestore
const db = firebase.firestore();

export const firebaseDb = firebase.database();

//Import login function from api

//action types
export const LOG_IN_SENT = "LOG_IN_SENT";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const ADD_BOULDER_ROUTE = "ADD_BOULDER_ROUTE";
export const ADD_BOULDER_ROUTE_ERROR = "ADD_BOULDER_ROUTE_ERROR";
export const FETCH_FIREBASE_DATA = "FETCH_FIREBASE_DATA";

// async action creators
export const logInUser = (username, password) => async dispatch => {
  dispatch({ type: LOG_IN_SENT });
  try {
    const token = await login(username, password);
    dispatch({ type: LOG_IN_SUCCESS, payload: token });
  } catch (err) {
    dispatch({ type: LOG_IN_FAILED, payload: err.message });
  }
};

const getTodayDate = () => {
  var today = new Date();
  return (date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
};

//For debug
let userId = "";

export const addBoulderRoute = data => {
  //deleted error checking
  //get logged in user ID
  userId = firebase.auth().currentUser.uid;

  //Get todays date
  let todayDate = getTodayDate();

  return dispatch => {
    db.collection("boulder").add({
      grade: data.grade,
      numOfClimb: data.numOfClimb
    });
  };
};

export const fetchData = () => async dispatch => {
  if (firebase.auth().currentUser !== null) {
    userId = firebase.auth().currentUser.uid;
  }
  //TODO: Need to change this to newest top 5 climbs
  let date = "2019-6-17";

  var wholeData = [];

  db.collection("boulder")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        wholeData.push(doc.data());
      });
      console.log(wholeData);
    })
    .catch(error => {
      console.log("Error!", error);
      dispatch({
        type: FETCH_FIREBASE_DATA,
        payload: items
      });
    });
};
