import React, { Component } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Content, Container, Button, View, Toast } from "native-base";
import Colors from "../constants/Colors";
import AddressInputComponent from "./AddressInputComponent";
import CoinDisplayComponent from "../components/CoinDisplayComponent";
import CurrencyConversionComponent from "./CurrencyConversionComponent";
import FullButtonComponent from "./FullButtonComponent";
import moveToBottom from "../utils/moveToBottom";
import Layout from "../constants/Layout";
import PropTypes from "prop-types";
import { TextInput } from "react-native-gesture-handler";
import CurrencyConversionContainer from "../containers/CurrencyConversionContainer";

export default class SendComponent extends Component {
  state = {
    wait: false,
    success: false,
    receiver: "",
    amount: "",
    scanning: false
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCoin = this.onChangeCoin.bind(this);
    this.onSendPress = this.onSendPress.bind(this);
    this.onScanFinger = this._onScanFinger.bind(this);
  }

  async _onScanFinger() {
    this.setState({ wait: true });
    await FingerPrintScanner.authenticate(
      "Do youre biometric authentication to access Orichalcum"
    )
      .then(success => {
        if (success) {
          this.setState({ wait: false, success });
        }
      })
      .catch(error => {
        this.setState({ message: error ? error.message : error.name });
      });
  }

  componentDidMount() {
    this.props.getCryptoBalance();
    const { to } = this.props.transaction;
    this.setState({
      receiver: to
    });
  }

  handleClick() {
    Alert.alert("I am clicked");
  }

  onChangeText(text) {}

  onChangeCoin(keyIndex) {
    this.props.changeSelectedCrypto(keyIndex);
  }

  onSendPress(text) {
    const {
      publicKey,
      privateKey,
      txrefs,
      balance,
      cryptoIndex,
      cryptoCurrencies
    } = this.props;
    let { receiver, amount } = this.state;
    // Alert.alert("Send");
    this.props.signTransaction({
      ...cryptoCurrencies[cryptoIndex],
      publicKey,
      privateKey,
      txrefs,
      balance,
      receiver,
      amount
    });
  }
}
