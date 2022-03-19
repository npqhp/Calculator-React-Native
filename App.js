import React, { Component } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import InputNumberButton from "./InputNumberButton";

const buttons = [
  ["CLEAR", "DEL"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: "0",
      operator: null,
    };
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <InputNumberButton
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this, buttonItems)}
            key={"btn-" + buttonIndex}
          />
        );
      });

      return (
        <View style={styles.inputRow} key={"row-" + index}>
          {rowItem}
        </View>
      );
    });

    return layouts;
  }

  handleInput = (input) => {
    const { displayValue } = this.state;

    switch (input) {
      case "CLEAR":
        this.setState({
          displayValue: "0",
        });
        break;
      case "DEL":
        this.setState({
          displayValue: displayValue.toString().length == 1? "0" : displayValue.toString().substring(0, displayValue.toString().length - 1),
          operator: null
        });
        
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (displayValue.length === 18) break;
        this.setState({
          displayValue: displayValue === "0" ? input : displayValue + input,
        });
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        this.setState({
          operator: input,
        });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
          <Text style={styles.operatorText}>{this.state.operator}</Text>
        </View>

        <View style={styles.inputContainer}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#1E1240",
  },
  inputContainer: {
    flex: 4,
    backgroundColor: "#3D0075",
  },
  operatorText: {
    color: "white",
    fontSize: 40,
    paddingTop: 0,
    paddingLeft: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  resultText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 20,
    textAlign: "right",
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
  },
});
