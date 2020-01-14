import { Content, Toast } from "native-base";
import React, { Component } from "react";
import { AsyncStorage, FlatList, Text, View } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import Colors from "../constants/Colors";
import screenSize, { normalize } from "../utils/screenSize";
import ImageBackgroundComponent from "./ImageBackgroundComponent";
import NavigationHeaderComponent from "./NavigationHeader";
import { ScrollView } from "react-native-gesture-handler";
import { Confirm } from "./Loader";

export class PinUnlock extends Component {
  state = {
    pin: "",
    pinInput: "",
    newPinInput: "",
    confirmPinInput: "",
    mnemonic: [],
    displayText: "",
    showConfirm: false,
    modalAction: () => { },
    resetMode: false,
    isSet: true
  };

  pinInput = React.createRef();
  newPinInput = React.createRef();
  confirmPinInput = React.createRef();

  constructor() {
    super();
    this.onPinInput = this.onPinInput.bind(this);
    this.onNewPinInput = this.onNewPinInput.bind(this);
    this.onFulfill = this.onFulfill.bind(this);
    this.onConfirmPinInput = this.onConfirmPinInput.bind(this);
    this.onNewPinInputFulfill = this.onNewPinInputFulfill.bind(this);
    this.onConfirmPinInputFulfill = this.onConfirmPinInputFulfill.bind(this);
    this.setNewPIN = this.setNewPIN.bind(this)
    this.cancelAction = this.cancelAction.bind(this)
  }

  async componentDidMount() {
    let mnemonic = await AsyncStorage.getItem("mnemonic");
    let pin = await AsyncStorage.getItem("pin");
    let resetMode = await AsyncStorage.getItem("resetMode");
    if (resetMode) {
      this.setState({ resetMode: true })
    }
    if (mnemonic) {
      mnemonic = JSON.parse(mnemonic);
    } else {
      mnemonic = "- - - - - - - - - - - -";
    }
    if (pin) {
      this.setState({ isSet: true, pin, mnemonic: mnemonic.split(" ") });
    } else {
      this.setState({ isSet: false });
    }
  }

  async onFulfill(pinInput) {
    let pin = await AsyncStorage.getItem("pin");
    const { navigation } = this.props;
    console.log(pin, pinInput);
    if (pinInput === pin) {
      const navigateTo = navigation.getParam("navigateTo", "PlayIntro");
      navigation.navigate(navigateTo);
    } else {
      this.pinInput.current.shake().then(() => this.setState({ pinInput: "" }));
      Toast.show({
        duration: 3000,
        position: "top",
        text: "Incorrect PIN entered",
        buttonText: "Try Again",
        type: "warning"
      });
    }
  }

  async onPinInput(pinInput) {
    if ((pinInput > 0 && pinInput <= 9999) || !pinInput)
      this.setState({ pinInput });
  }

  async onNewPinInput(newPinInput) {
    if ((newPinInput > 0 && newPinInput <= 9999) || !newPinInput)
      this.setState({ newPinInput });
  }

  async onConfirmPinInput(confirmPinInput) {
    if ((confirmPinInput > 0 && confirmPinInput <= 9999) || !confirmPinInput)
      this.setState({ confirmPinInput });
  }


  async onNewPinInputFulfill(newPinInput) {
    console.log("onNewPinInputFulfill");
  }

  async setNewPIN() {
    await AsyncStorage.setItem("pin", this.state.confirmPinInput);
    this.onFulfill(this.state.confirmPinInput);
    Toast.show({
      duration: 3000,
      position: "top",
      text: "PIN has been set successfully",
      type: "success",
      buttonText: "Okay"
    });
  }

  cancelAction() {
    this.confirmPinInput.current.shake().then(() => this.setState({ confirmPinInput: "" }));
    this.newPinInput.current.shake().then(() => this.setState({ newPinInput: "" }));
  }

  async onConfirmPinInputFulfill(confirmPinInput) {
    console.log("onConfirmPinInputFulfill");
    if (confirmPinInput === this.state.newPinInput) {
      this.setState({ displayText: 'Entered PIN has been accepted. Please confirm the PIN', showConfirm: true, modalAction: this.setNewPIN })
    } else {
      this.confirmPinInput.current.shake().then(() => this.setState({ confirmPinInput: "" }));
      this.newPinInput.current.shake().then(() => this.setState({ newPinInput: "" }));
      Toast.show({
        duration: 3000,
        position: "top",
        text: "PIN is not matching",
        buttonText: "Try Again",
        type: "warning"
      });
    }
  }


  render() {
    const { pinInput, newPinInput, confirmPinInput, isSet, resetMode } = this.state;
    let { mnemonic = "" } = this.props;
    mnemonic = mnemonic.split(" ");
    return (
      <ImageBackgroundComponent>
        <NavigationHeaderComponent
          title={"PIN Input"}
          back="Auth"
          navigation={this.props.navigation}
        />
        <Confirm
          displayText={this.state.displayText}
          visible={this.state.showConfirm}
          confirmAction={() => {
            this.setState({ showConfirm: false });
            this.state.modalAction();
          }}
          cancelAction={() => {
            this.setState({ showConfirm: false });
            this.cancelAction()
          }}
        />
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            margin: 10
          }}
        >
          {!isSet && (
            <View>
              <Text
                style={{
                  color: Colors.noticeText,
                  fontSize: normalize(16),
                  textAlign: "left",
                  fontFamily: "ubuntu",
                  marginBottom: 10
                }}
              >
                Set your PIN for Orichalcum app. Remember this PIN. You will
                need this PIN to access vault and validate the
                transaction.
              </Text>
            </View>
          )}
          {isSet ? <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: normalize(250)
            }}
          >
            <Text
              style={{
                color: Colors.noticeText,
                fontSize: normalize(16),
                textAlign: "center",
                fontFamily: "ubuntu",
                marginBottom: 10,
                marginTop: 10
              }}
            >
              Please enter your PIN to login
            </Text>

            <SmoothPinCodeInput
              ref={this.pinInput}
              password
              mask="*"
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
                fontSize: 24,
                color: Colors.noticeText
              }}
              textStyleFocused={{
                color: Colors.textTintColor
              }}
              autoFocus={false}
              value={pinInput}
              onFulfill={this.onFulfill}
              onTextChange={this.onPinInput}
            />
          </View> :
            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                alignContent: "center",
                minHeight: normalize(200)
              }}
            >
              <Text
                style={{
                  color: Colors.noticeText,
                  fontSize: normalize(16),
                  textAlign: "center",
                  fontFamily: "ubuntu",
                  marginBottom: 10,
                  marginTop: 10
                }}
              >
                Set your login PIN
              </Text>
              <SmoothPinCodeInput
                ref={this.newPinInput}
                password
                mask="*"
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
                  fontSize: 24,
                  color: Colors.noticeText
                }}
                textStyleFocused={{
                  color: Colors.textTintColor
                }}
                autoFocus={false}
                value={newPinInput}
                onFulfill={this.onNewPinInputFulfill}
                onTextChange={this.onNewPinInput}
              />
              <Text
                style={{
                  color: Colors.noticeText,
                  fontSize: normalize(16),
                  textAlign: "center",
                  fontFamily: "ubuntu",
                  marginBottom: 10,
                  marginTop: 10
                }}
              >
                Confirm your PIN
              </Text>

              <SmoothPinCodeInput
                ref={this.confirmPinInput}
                password
                mask="*"
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
                  fontSize: 24,
                  color: Colors.noticeText
                }}
                textStyleFocused={{
                  color: Colors.textTintColor
                }}
                autoFocus={false}
                value={confirmPinInput}
                onFulfill={this.onConfirmPinInputFulfill}
                onTextChange={this.onConfirmPinInput}
              />
            </ScrollView>}
          {!isSet && !resetMode && (
            <ScrollView>
              <Text
                style={{
                  color: Colors.failedColor,
                  fontSize: normalize(17),
                  textAlign: "left",
                  fontFamily: "ubuntu",
                  marginTop: 30,
                  marginBottom: 30
                }}
              >
                Please note down this Mnemonic seed in the below order to
                recover account.
              </Text>
              <Text
                style={{
                  color: Colors.tintColor,
                  fontSize: normalize(18),
                  textAlign: "center",
                  fontFamily: "ubuntu-bold",
                  marginBottom: 10
                }}
              >
                Mnemonic Seed
              </Text>
              <FlatList
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                style={{}}
                data={mnemonic}
                // keyExtractor={this._keyExtractor} //has to be unique
                renderItem={(data, index) => (
                  <View style={{ width: screenSize(16) }}>
                    <Text
                      style={{
                        color: Colors.noticeText,
                        fontSize: normalize(20),
                        borderBottomColor: Colors.tintColor,
                        marginBottom: normalize(3),
                        textAlign: "center",
                        fontFamily: "ubuntu"
                      }}
                    >
                      {data.item}
                    </Text>
                    <Text
                      style={{
                        color: Colors.tintColor,
                        fontSize: normalize(16),
                        textAlign: "center",
                        fontFamily: "ubuntu"
                      }}
                    >
                      {data.index + 1}
                    </Text>
                  </View>
                )}
                horizontal={false}
                numColumns={3}
              />
            </ScrollView>
          )}
        </Content>
      </ImageBackgroundComponent>
    );
  }
}

export default PinUnlock;
