import React, { Component } from "react";
import { Text, View, Alert, TouchableOpacity, Clipboard } from "react-native";
import {
  Content,
  Container,
  Button,
  Item,
  Label,
  Input,
  Icon,
  Toast
} from "native-base";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import FullButtonComponent from "./FullButtonComponent";
import CoinDisplayComponent from "./CoinDisplayComponent";
import AddressDisplayComponent from "./AddressDisplayComponent";
import moveToBottom from "../utils/moveToBottom";
import Layout from "../constants/Layout";
import Style from "../constants/Style";
import screenSize, { normalize } from "../utils/screenSize";

export class ReceiveComponent extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.onSharePress = this.onSharePress.bind(this);
    this.onChangeCoin = this.onChangeCoin.bind(this);
  }

  onSharePress() {
    Clipboard.setString(this.props.address);
    Toast.show({duration: 3000,
      text: "Address copied",
      position: "bottom"
    });
  }

  onChangeCoin(keyIndex) {
    this.props.changeSelectedCrypto(keyIndex);
  }

  render() {
    const { coinCode, displayText, address } = this.props;

    return (
      <View style={{}}>
        <View style={{ height: screenSize("1") }} />
        <CoinDisplayComponent
          onChangeCoin={this.onChangeCoin}
          {...this.props}
        />
        <View style={{ height: screenSize("8") }} />
        <AddressDisplayComponent
          coinCode={coinCode}
          displayText={displayText}
          address={address}
        />
        <View style={{ height: screenSize("12") }} />

        <View style={{ marginLeft: normalize("14") }}>
          <Label
            style={{
              textAlign: "left",
              fontSize: normalize(16),
              marginBottom: normalize(5),
              overflow: "hidden",
              color: Colors.inputLabel,
              width: Layout.window.width - screenSize("1")
            }}
          >
            Your {coinCode || "---"} Address
          </Label>
          <Label
            style={{
              fontFamily: "ubuntu",
              fontSize: normalize(17),
              color: Colors.noticeText
            }}
          >
            {address || "---"}
            {"\n"}
          </Label>
        </View>
        {/* <Item stackedLabel>
          <Input
            style={{
              color: Colors.noticeText,
              paddingRight: normalize(50),
              overflow: "hidden"
            }}
            value={address}
            disabled={true}
          />
          <TouchableOpacity
            onPress={this.onSharePress}
            style={{
              position: "absolute",
              right: 0,
              bottom: 15
            }}
          >
            <Icon
              type="Entypo"
              name="share"
              fontSize={normalize(22)}
              style={{
                color: Colors.noticeText
              }}
            />
          </TouchableOpacity>
        </Item> */}
        <View style={{ padding: normalize(14) }}>
          <Button
            full
            transparent
            onPress={this.onSharePress}
            style={{
              backgroundColor: Colors.secondaryBackgroundColor,
              height: normalize(60),
              borderRadius: 8,
              marginTop: normalize(20)
            }}
          >
            <Text
              style={{
                fontFamily: "ubuntu-bold",
                fontSize: normalize(16),
                color: Colors.buttonReceiveColor
              }}
            >
              Share Address to Receive
            </Text>
          </Button>
        </View>
        <View style={{ height: screenSize("1") }} />
      </View>
    );
  }
}

export default ReceiveComponent;

ReceiveComponent.propTypes = {
  coinCode: PropTypes.string.isRequired,
  fiatSymbol: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
  style: PropTypes.object,
  cryptoCurrencies: PropTypes.array,
  changeSelectedCrypto: PropTypes.func.isRequired
};
