import firebase from "firebase";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAclgqrbkSKHvlcgyiCgPChDwsILkXvot4",
  authDomain: "rockclimbingtracker.firebaseapp.com",
  databaseURL: "https://rockclimbingtracker.firebaseio.com",
  projectId: "rockclimbingtracker",
  storageBucket: "rockclimbingtracker.appspot.com"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();

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

// export const addBoulderRoute = (key, boulderHistory) => {
//   if (firebase.auth().currentUser !== null) {
//     userId = firebase.auth().currentUser.uid;
//   }

//   //Get todays date
//   let todaysDate = getTodayDate();
//   return dispatch => {
//     var newKey = firebaseDb
//       .ref(`${userId}/boulder/${todaysDate}`)
//       .push({
//         ...boulderHistory
//       })
//       .catch(error =>
//         dispatch({
//           type: "ADD_BOULDER_ROUTE_ERROR",
//           message: error.message
//         })
//       );
//   };
// };

export const addBoulderRoute = data => {
  //deleted error checking
  //get logged in user ID
  userId = firebase.auth().currentUser.uid;

  //Get todays date
  let todayDate = getTodayDate();

  return dispatch => {
    var myRef = firebaseDb.ref(`${userId}/boulder/${todayDate}`).push();
    var key = myRef.key;

    var newData = {
      key: key,
      grade: data.grade,
      numOfClimb: data.numOfClimb
    };

    myRef.set(newData);
    //console.log(newData);
  };
};

export const fetchData = () => async dispatch => {
  if (firebase.auth().currentUser !== null) {
    userId = firebase.auth().currentUser.uid;
  }
  //TODO: Need to change this to newest top 5 climbs
  let date = "2019-6-8";

  var leadsRef = firebaseDb.ref(`${userId}/boulder/${date}`);
  leadsRef.on("value", snapshot => {
    var items = [];
    // get children as an array
    snapshot.forEach(child => {
      //console.log(child.key, child.val());
      items.push({
        key: child.val().key,
        grade: child.val().grade,
        numOfClimb: child.val().numOfClimb
      });
    });
    dispatch({
      type: FETCH_FIREBASE_DATA,
      payload: items
    });
  });
};
