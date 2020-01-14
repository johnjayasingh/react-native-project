import React, { Component } from "react";
import { Button, Container, View } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { Content, Item, Input, Label } from "native-base";
import Colors from "../constants/Colors";
import screenSize, { normalize } from "../utils/screenSize";

export class AddressDisplayComponent extends Component {
  state = {
    address: ""
  };

  render() {
    const {
      address,
      coinCode,
      displayText,
      style,
      size = normalize(136),
      bgColor = Colors.noticeText,
      fgColor = Colors.backgroundColor
    } = this.props;

    return (
      <View
        contentContainerStyle={{}}
        style={{
          backgroundColor: Colors.backgroundColor,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          ...style
        }}
      >
        <View
          style={{
            borderColor: Colors.noticeText,
            borderWidth: 5
          }}
        >
          <QRCode
            logoBorderRadius={5}
            size={normalize(size)}
            color={Colors.backgroundColor}
            backgroundColor={Colors.noticeText}
            logoBackgroundColor={Colors.backgroundColor}
            value={address}
          />
        </View>
        <Label
          style={{
            textAlign: "center",
            color: Colors.inputLabel,
            marginTop: normalize(10),
            fontSize: normalize(16),
            ...style
          }}
        >
          Scan QR code to get your {coinCode || "---"} address
        </Label>
      </View>
    );
  }
}

export default AddressDisplayComponent;
