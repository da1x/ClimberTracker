import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

//Not using
//import Icon from "react-native-vector-icons/FontAwesome";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";

export default class EmailLoginButton extends Component {
  state = {
    email: "",
    password: ""
  };

  signUpUser = async (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }

      let newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await console.log(newUser);
    } catch (error) {
      console.log(error.toString());
    }
  };
  loginUser = async (email, password) => {
    try {
      let user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await console.log(user);
      //Navigate to Main screen if Logged in
      await this.props.navigate("Home");
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
        </Item>

        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
          />
        </Item>

        <Button
          full
          rounded
          success
          onPress={() => this.loginUser(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}> Login</Text>
        </Button>

        <Button
          full
          rounded
          primary
          onPress={() => this.signUpUser(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}> Sign up</Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff"
  }
});
