import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
//import { Constants } from "expo";

import EmailLoginButton from "../components/EmailLoginButton";
import FBLoginButton from "../components/FBLoginButton";

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: "Welcome!"
  };

  state = {
    username: "",
    password: ""
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <EmailLoginButton navigate={navigate} />
        <FBLoginButton navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    padding: 50,
    backgroundColor: "#fe2"
  },
  paddingEdge: {
    paddingBottom: 20
  },
  text: {
    textAlign: "center"
  }
});
