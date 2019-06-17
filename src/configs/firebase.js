import * as firebase from "firebase";
import "firebase/firestore";

const settings = { timestampsInSnapshots: true };

// firebase config
const config = {
  apiKey: "AIzaSyAclgqrbkSKHvlcgyiCgPChDwsILkXvot4",
  authDomain: "rockclimbingtracker.firebaseapp.com",
  databaseURL: "https://rockclimbingtracker.firebaseio.com",
  projectId: "rockclimbingtracker",
  storageBucket: "rockclimbingtracker.appspot.com"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
