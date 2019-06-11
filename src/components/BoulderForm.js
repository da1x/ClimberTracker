import React, { Component } from "react";
import { Button, TextInput, StyleSheet } from "react-native";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

import { addBoulderRoute, fetchData } from "../redux/actions";
import { connect } from "react-redux";

// Climbing grades
import {
  boulder_JP,
  boulder_FR,
  boulder_USA,
  gradeCountryList
} from "./ClimbingGrades";

class BoulderForm extends Component {
  state = {
    selectedValue: 0,
    numOfClimb: "1",
    currentGrade: "JP"
  };

  handleGradeCountryOnValueChange = value => {
    //TODO: Need refractoring.
    if (value == 0) {
      this.setState({
        currentGrade: "JP"
      });
    } else if (value == 1) {
      this.setState({
        currentGrade: "FR"
      });
    } else if (value == 2) {
      this.setState({
        currentGrade: "USA"
      });
    }
  };

  handleGradeLevelOnValueChange = value => {
    this.setState({
      selectedValue: value
    });
  };

  handleGetData = () => {
    console.log(this.props.data);
  };

  handleAddRouteToList = () => {
    // TODO: Need error checking
    this.props.addBoulderRoute({
      grade: this.state.selectedValue,
      numOfClimb: this.state.numOfClimb
    });
  };

  getGrades = language => {
    switch (language) {
      case "JP":
        return boulder_JP;
      case "FR":
        return boulder_FR;
      case "USA":
        return boulder_USA;
      default:
        console.log("Error Grade list not selected");
        break;
    }
  };

  render() {
    //Japanese Grade - Need to change this to a function;
    var options = this.getGrades(this.state.currentGrade);
    var gradeOption = gradeCountryList;

    return (
      <Container>
        <Form>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder={this.state.currentGrade}
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.currentGrade}
            onValueChange={this.handleGradeCountryOnValueChange}
          >
            {Object.keys(gradeOption).map(key => {
              return (
                <Picker.Item label={gradeOption[key]} value={key} key={key} />
              );
            })}
          </Picker>

          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder={options[0]}
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.selectedValue}
            onValueChange={this.handleGradeLevelOnValueChange}
          >
            {Object.keys(options).map(key => {
              return <Picker.Item label={options[key]} value={key} key={key} />;
            })}
          </Picker>
          <TextInput
            keyboardType="number-pad"
            maxLength={2}
            style={styles.textInput}
            onChangeText={text => this.setState({ numOfClimb: text })}
            value={this.state.numOfClimb}
          />
          <Button title="Add route" onPress={this.handleAddRouteToList} />
          <Button title="Get Data" onPress={this.handleGetData} />
        </Form>
      </Container>
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
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    boulderList: state.boulderList
  };
};

export default connect(
  mapStateToProps,
  { addBoulderRoute: addBoulderRoute }
)(BoulderForm);
