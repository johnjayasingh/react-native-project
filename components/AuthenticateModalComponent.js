import { Card, CardItem, Icon, Toast } from "native-base";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import Modal from "react-native-modal";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";
import IconImageComponent from "./IconImageComponent";
import FingerPrintScanner from "react-native-fingerprint-scanner";
import LottieView from "lottie-react-native";

export class AuthenticateModalComponent extends Component {
  state = {
    pinInput: "",
    pin: "",
    wait: false,
    compatible: false,
    fingerPrintFailed: false,
    secureTextEntry: true,
    errorMessage: ""
  };

  pinInput = React.createRef();

  constructor() {
    super();
    this.onPinInput = this.onPinInput.bind(this);
    this.scanFinger = this.scanFinger.bind(this);
    this.bioMetricSuccess = this.bioMetricSuccess.bind(this);
  }

  async componentDidMount() {
    let pin = await AsyncStorage.getItem("pin");
    this.setState({ pin });

    setInterval(() => {
      this.setState({ errorMessage: "" });
    }, 2000);

    await FingerPrintScanner.isSensorAvailable()
      .then(async () => {
        await FingerPrintScanner.release();
        this.setState({
          compatible: true
        });
        return this.scanFinger();
      })
      .catch(err => {
        console.log(err);
        Toast.show(err.message);
        this.setState({
          fingerPrintFailed: true,
          compatible: false,
          errorMessage: err.message || err.name
        });
      });
  }

  async onPinInput(pinInput) {
    const { pin } = this.state;
    this.setState({ pinInput });
    console.log(pinInput, pin, pinInput === pin);
    if (pinInput === pin) {
      this.setState({ fingerPrintFailed: false });
      this.setState({ pinInput: "" });
      this.props.onSubmitTransaction();
      this.props.onClose();
    } else if (pinInput.length === 4) {
      this.pinInput.current.shake().then(() => this.setState({ pinInput: "" }));
      this.setState({ errorMessage: "PIN not Valid" });
      Toast.show({ type: "danger", text: this.state.errorMessage })
    }
  }

  bioMetricSuccess(success) {
    this.props.onClose();
    if (success) {
      this.setState({ fingerPrintFailed: false });
      FingerPrintScanner.release();
      this.props.onSubmitTransaction();
    } else {
      FingerPrintScanner.release();
      this.setState({ errorMessage: "Biometric Authentication Failed" });
      Toast.show({ type: "danger", text: this.state.errorMessage })
    }
  }

  async scanFinger() {
    await FingerPrintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttempted
    })
      .then(this.bioMetricSuccess)
      .catch(async error => {
        await FingerPrintScanner.release();
        this.setState({
          errorMessage: "Biometric Authentication Failed",
          fingerPrintFailed: true,
          errorMessage: error.message
        });
        Toast.show({ type: "danger", text: this.state.errorMessage })
        // return this.scanFinger();
      });
  }

  handleAuthenticationAttempted = error => {
    this.setState({ errorMessage: error.message });
  };

  componentWillUnmount() {
    if (this.state.compatible) FingerPrintScanner.release();
  }

  render() {
    const { compatible, fingerPrintFailed } = this.state;
    const { transaction, modalVisible, onClose } = this.props;
    const {
      coinCode,
      receiver,
      transactedOn,
      amount = 0,
      fiatSymbol = "USD",
      fiatAmount = 0
    } = transaction;

    const deviceWidth = Layout.window.width;
    const deviceHeight = Layout.window.height;
    return (
      <Modal
        // isVisible={true}
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card
          style={{
            backgroundColor: Colors.modalBackground,
            width: Layout.window.width - normalize(40),
            borderRadius: 15
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
            style={{
              alignSelf: "flex-end",
              marginRight: normalize(15)
            }}
          >
            <Icon
              name="close"
              style={{ fontSize: normalize(40), color: Colors.inputLabel }}
            />
          </TouchableOpacity>
          <CardItem
            style={{
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                marginTop: normalize(-15)
              }}
            >
              <IconImageComponent size={22} name={coinCode} />
            </View>
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text numberOfLines={2} style={styles.address}>
                {receiver}
              </Text>
            </View>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: "transparent",
              justifyContent: "space-between",
              margin: normalize(15)
            }}
          >
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text style={styles.amountTitle}>Quantity</Text>
              <Text style={styles.amount}>
                {amount}
                {coinCode}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text style={styles.amountTitle}>Amount</Text>
              <Text style={styles.amount}>
                {fiatSymbol}
                {Number(fiatAmount).toFixed(2)}
              </Text>
            </View>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: "transparent",
              justifyContent: "center"
            }}
          >
            {compatible && !fingerPrintFailed ? (
              <TouchableOpacity onPress={this.scanFinger}>
                <LottieView
                  style={{
                    height: normalize(140)
                  }}
                  source={require("../assets/lottie/fingerprint.json")}
                  loop
                  autoPlay
                  autoSize={true}
                  duration={1000}
                />
              </TouchableOpacity>
            ) : (
                <SmoothPinCodeInput
                  ref={this.pinInput}
                  placeholder="฿"
                  cellStyle={{
                    borderWidth: 2,
                    borderRadius: 24,
                    borderColor: Colors.tintColor,
                    backgroundColor: Colors.noticeBackground
                  }}
                  cellStyleFocused={{
                    borderColor: "lightseagreen",
                    backgroundColor: "lightcyan"
                  }}
                  textStyle={{
                    fontSize: 16,
                    color: Colors.noticeText
                  }}
                  textStyleFocused={{
                    color: Colors.textTintColor
                  }}
                  autoFocus={true}
                  value={this.state.pinInput}
                  onTextChange={this.onPinInput}
                />
              )}
          </CardItem>
        </Card>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: normalize(15),
    marginLeft: normalize(-20),
    marginTop: normalize(10),
    position: "absolute"
  },
  address: {
    fontFamily: "ubuntu",
    fontSize: normalize(15),
    overflow: "hidden",
    maxWidth: Layout.window.width - normalize(160),
    color: Colors.noticeText
  },
  date: {
    fontFamily: "ubuntu",
    fontSize: normalize(14),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.noticeText
  },
  amountTitle: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.inputLabel
  },
  amount: {
    fontFamily: "ubuntu-bold",
    fontSize: normalize(15),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.successColor
  },
  status: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.noticeText
  },
  statusTitle: {
    fontFamily: "ubuntu-bold",
    fontSize: normalize(15),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.inputLabel
  }
});

export default AuthenticateModalComponent;
