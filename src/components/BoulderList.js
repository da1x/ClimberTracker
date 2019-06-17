import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { fetchData, firebaseDb } from "../redux/actions";

import ChartKit from "./ChartKit";

import BoulderForm from "./BoulderForm";
import { connect } from "react-redux";

import firebase from "firebase";
//firestore
const db = firebase.firestore();

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

    var wholeData = [];

    db.collection("boulder")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          wholeData.push(doc.data());
        });
        console.log(wholeData);
        this.setState({ dataList: wholeData });
      })
      .catch(error => {
        console.log("Error!", error);
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
