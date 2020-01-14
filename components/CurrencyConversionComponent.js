import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
import Colors from "../constants/Colors";
import { isEquivalent } from "../utils/compare";
import { normalize } from "../utils/screenSize";

export default class CurrencyConversionComponent extends Component {
  state = {
    amount: "0",
    toValue: 0,
    cryptoInput: true,
    fiatValue: {},
    coinValue: {},
    fiatCode: "",
    coinCode: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { to, value, fiatValue, coinValue, coinCode, settings } = nextProps;
    const { fiatCode } = settings;
    this.setState({
      amount: value,
      coinCode,
      fiatCode: fiatCode,
      fiatValue,
      coinValue
    });
  }

  render() {
    const {
      coinCode,
      fiatCode,
      cryptoInput,
      fiatValue,
      amount,
      toValue
    } = this.state;
    return (
      <View
        style={{
          margin: 14
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Item stackedLabel style={{ width: "43%", height: normalize(50) }}>
            <Label>Enter {cryptoInput ? coinCode : fiatCode}</Label>
            <Input
              keyboardType="numeric"
              style={{ color: Colors.noticeText }}
              value={amount}
              onChangeText={this.props.onAmountChange}
            />
          </Item>
          <Icon
            type="MaterialCommunityIcons"
            style={{
              color: Colors.noticeText,
              fontSize: normalize(18),
              margin: 15,
              marginTop: 30
            }}
            // onPress={this.onChangePress}
            name="currency-eth"
          />
          <Item stackedLabel style={{ width: "43%", height: normalize(50) }}>
            <Label>{cryptoInput ? fiatCode : coinCode}</Label>

            <Input
              disabled={true}
              keyboardType="numeric"
              style={{ color: Colors.noticeText }}
              value={`${Number(fiatValue[coinCode] * amount || 0).toFixed(4)}`}
            />
          </Item>
        </View>
      </View>
    );
  }
}
