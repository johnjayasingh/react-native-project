import React, { Component } from "react";
import { Text, View } from "react-native";
import { Content, Button } from "native-base";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export class FullButtonComponent extends Component {
  render() {
    const { textStyle, buttonStyle, displayText, onPress } = this.props;
    return (
      <Button
        full
        transparent
        onPress={onPress}
        style={{
          backgroundColor: Colors.secondaryBackgroundColor,
          marginLeft: 14,
          marginRight: 14,
          marginTop: 20,
          height: normalize(60),
          borderRadius: 8,
          ...buttonStyle
        }}
      >
        <Text
          style={{
            fontFamily: "ubuntu-bold",
            fontSize: normalize(18),
            ...textStyle
          }}
        >
          {displayText}
        </Text>
      </Button>
    );
  }
}

export default FullButtonComponent;
