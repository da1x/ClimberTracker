import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

import BoulderList from "../components/BoulderList";

export default class BoulderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Boulder Screen </Text>
        <BoulderList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center"
  },
  text: {
    textAlign: "center"
  }
});
