import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class SpeedScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Speed Screen </Text>
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
