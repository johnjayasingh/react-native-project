import { Button, Card, Container, Content, Text, Toast } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import AddressInputComponent from "../components/AddressInputComponent";
import AuthenticateModalComponent from "../components/AuthenticateModalComponent";
import CoinDisplayComponent from "../components/CoinDisplayComponent";
import CurrencyConversionComponent from "../components/CurrencyConversionComponent";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import NavigationHeaderComponent from "../components/NavigationHeader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Style from "../constants/Style";
import { normalize } from "../utils/screenSize";
export default class SendScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    wait: false,
    success: false,
    receiver: "",
    amount: "",
    scanning: false,
    modalVisible: false,
    loading: false,
    transaction: {}
  };

  constructor() {
    super();
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onChangeCoin = this.onChangeCoin.bind(this);
    this.onSendPress = this.onSendPress.bind(this);
    this.onScanFinger = this._onScanFinger.bind(this);
    this.onSubmitTransaction = this.onSubmitTransaction.bind(this);
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
    // this.props.getCryptoBalance();
    // const { to } = this.props.transaction;
    // this.setState({
    //   receiver: to
    // });
  }

  componentWillReceiveProps(nextProps) {
    const payment = nextProps.navigation.getParam("payment", null);
    const address = nextProps.navigation.getParam(
      "address",
      this.state.receiver
    );
    if (address != this.state.receiver) {
      this.setState({ receiver: address });
    }
    if (payment && !this.state.modalVisible) {
      const { receiver, amount, coinCode } = payment;
      let changed = false;
      if (receiver != this.state.receiver) {
        this.setState({ receiver });
        changed = true;
      }
      if (amount != this.state.amount) {
        this.setState({ amount });
        changed = true;
      }
      if (coinCode != this.state.coinCode) {
        this.setState({ coinCode });
        this.onChangeCoin(
          this.props.cryptoCurrenciesKeyIndex[payment.coinCode]
        );
        changed = true;
      }
      if (changed) {
        this.onSubmitTransaction()
      }
    }
  }

  onAddressChange(receiver) {
    this.setState({ receiver });
  }

  onAmountChange(amount) {
    this.setState({ amount });
  }

  onChangeCoin(keyIndex) {
    this.props.changeSelectedCrypto(keyIndex);
  }

  componentWillMount() {
    this.setState({ modalVisible: false });
  }

  onSendPress() {
    const { receiver, amount } = this.state;
    const { coinCode, fiatSymbol, fiatValue } = this.props;
    if (!amount || !receiver || amount <= 0) {
      console.log("Payment Amount");
      Toast.show({
        duration: 3000,
        text: `Please fill in the payment ${
          receiver ? "amount" : "receiver address"
          }`,
        type: "danger",
        position: "top"
      });
      return;
    }
    this.setState({
      modalVisible: true,
      // transaction: {
      //   coinCode,
      //   fiatSymbol,
      //   fiatAmount: fiatValue[coinCode] * amount
      // }
    });
  }

  onSubmitTransaction() {
    this.setState({ modalVisible: false });
    const {
      publicKey,
      privateKey,
      txrefs,
      coinCode,
      balance,
      balanceActual,
      gasLimit,
      gasPrice,
      txCount,
      fiatBalance,
      fiatCode,
      isToken,
      contractAddress,
      fiatSymbol
    } = this.props;
    let { receiver, amount } = this.state;
    this.props.signTransaction({
      receiver,
      amount,
      publicKey,
      privateKey,
      txrefs,
      coinCode,
      balance,
      balanceActual,
      gasLimit,
      gasPrice,
      txCount,
      fiatBalance,
      fiatCode,
      isToken,
      contractAddress,
      fiatSymbol
    });
  }

  render() {
    const { displayText, navigation } = this.props;
    // const { hash } = transaction;
    let { receiver = "", amount, modalVisible, transaction } = this.state;
    return (
      <Container>
        <NavigationHeaderComponent
          title={`${displayText} Wallet`}
          back='HomeStack'
          onBackPress={() => {
            this.setState({
              wait: false,
              success: false,
              receiver: "",
              amount: "",
              scanning: false,
              modalVisible: false,
              loading: false,
              transaction: {}
            });
          }}
          navigation={navigation}
        />
        <ImageBackgroundComponent>
          <Content
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column-reverse",
              flexWrap: "wrap"
            }}
          >
            {modalVisible && <AuthenticateModalComponent
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
              onSubmitTransaction={this.onSubmitTransaction}
              modalVisible={modalVisible}
              transaction={transaction}
            />}
            <Card
              style={[
                Style.cardItem,
                {
                  minHeight: 300
                }
              ]}
            >
              <CoinDisplayComponent
                onChangeCoin={this.onChangeCoin}
                {...this.props}
              />
              <AddressInputComponent
                {...this.props}
                onAddressChange={this.onAddressChange}
                value={receiver}
              />
              <CurrencyConversionComponent
                onAmountChange={this.onAmountChange}
                value={amount}
                {...this.props}
              />
              {/* <TextInput value={hash} /> */}

              <Button
                full
                transparent
                onPress={this.onSendPress}
                style={{
                  backgroundColor: Colors.secondaryBackgroundColor,
                  height: normalize(60),
                  borderRadius: 8,
                  alignSelf: "center",
                  marginBottom: 10,
                  width: Layout.window.width - normalize(28)
                }}
              >
                <Text
                  style={{
                    fontFamily: "ubuntu-bold",
                    fontSize: normalize(16),
                    color: Colors.buttonSendColor
                  }}
                >
                  Send
                </Text>
              </Button>
            </Card>
          </Content>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}
