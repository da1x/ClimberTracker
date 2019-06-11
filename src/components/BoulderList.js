import React, { Component } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { fetchData, firebaseDb } from "../redux/actions";

import ChartKit from "./ChartKit";

import BoulderForm from "./BoulderForm";
import { connect } from "react-redux";

import firebase from "firebase";

class BoulderList extends Component {
  state = {
    dataList: []
  };

  componentDidMount() {
    this.fetchDataFromFirebase();
  }

  fetchDataFromFirebase = () => {
    this.fetchDataDebug();
    // const result = this.props.fetchData();
    //console.log(result);
    // this.setState({ dataList: result } /*console.log(this.state.dataList)*/);
  };

  //TODO: Delete this after debug
  fetchDataDebug = () => {
    if (firebase.auth().currentUser !== null) {
      userId = firebase.auth().currentUser.uid;
    }
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
      //console.log(items);
      this.setState({ dataList: items });
    });
  };

  render() {
    const data = this.state.dataList;
    return (
      <View style={styles.container}>
        <ChartKit data={this.state.dataList} />
        <BoulderForm data={this.props.fetchFirebaseDate} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              Grade: {item.grade} Numbers of Climbs: {item.numOfClimb}
            </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: { padding: 20 },
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center"
  },
  text: {
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  //console.log(state);
  return {
    fetchFirebaseDate: state
  };
};

export default connect(
  mapStateToProps,
  { fetchData: fetchData }
)(BoulderList);
