import React, { Component } from "react";
import { Alert, Button, Text, View } from "react-native";
//firebase
import firebase from "firebase";

import Icon from "react-native-vector-icons/FontAwesome";

export default class FBLoginButton extends Component {
  state = {
    errMsg: {},
    token: ""
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  loginWithFacebook = async () => {
    // try {
    //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    //     "1279613812192467",
    //     { permissions: ["public_profile"] }
    //   );
    //   if (type === "success") {
    //     const credential = firebase.auth.FacebookAuthProvider.credential(token);
    //     this.props.navigate("Home");
    //     return firebase
    //       .auth()
    //       .signInAndRetrieveDataWithCredential(credential)
    //       .catch(error => console.log(error));
    //   } else {
    //     return { cancelled: true };
    //   }
    // } catch (error) {
    //   console.log(error.toString());
    // }
  };

  render() {
    return (
      <View>
        <Icon.Button
          name="facebook"
          backgroundColor="#3b5998"
          onPress={this.loginWithFacebook}
        >
          Login with Facebook
        </Icon.Button>
      </View>
    );
  }
}
