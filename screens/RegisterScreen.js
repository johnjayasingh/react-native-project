import React, { Component } from "react";
import { View, TouchableOpacity, Image, Keyboard } from "react-native";
import {
  Content,
  Text,
  Toast,
  Fab,
  Icon,
  Item,
  Form,
  Input,
  Label,
  CheckBox,
  Textarea
} from "native-base";
import FingerPrintScanner from "react-native-fingerprint-scanner";
import Style from "../constants/Style";

import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";
import {
  validateEmail,
  validateForm,
  validateMnemonic
} from "../utils/validators";
import Loader from "../components/Loader";

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    emailErrorMessage: "",
    compatible: false,
    fingerprints: false,
    success: false,
    wait: false,
    message: "",
    complete: false,
    email: "",
    emailInvalid: false,
    enableEmail: true,
    password: "",
    passwordInvalid: false,
    mnemonic:
      "sister cereal head stick gauge expose deposit carpet clip carbon style umbrella",
    mnemonicInvalid: false,
    keyBoard: false,
    isLogin: false,
    storeAvailable: false,
    mnemonicAvailable: false,
    secureTextEntry: true
  };

  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._validateMnmonic = this._validateMnmonic.bind(this);
  }

  isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) == 0;
  }

  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    await FingerPrintScanner.isSensorAvailable()
      .then(() => {
        this.setState({
          compatible: true
        });
      })
      .catch(err => {
        this.setState({
          compatible: false
        });
      });
  }

  componentWillReceiveProps(nextProps) { }

  onFormSubmit() {
    const { email, password } = this.state;
    const { emailInvalid, passwordInvalid } = validateForm(email, password);
    if (!emailInvalid && !passwordInvalid) {
      this.props.register({
        email,
        password,
        loginAfterSuccess: true
      });
    } else {
      this.setState({ emailInvalid, passwordInvalid });
    }
  }

  _keyboardDidShow() {
    this.setState({ keyBoard: true });
  }

  _keyboardDidHide() {
    this.setState({ keyBoard: false });
  }

  _validateMnmonic(text) {
    this.setState({ mnemonicInvalid: !validateMnemonic(this.state.mnemonic) });
  }

  render() {
    const {
      emailInvalid,
      passwordInvalid,
      mnemonicInvalid,
      email,
      password,
      mnemonic,
      secureTextEntry,
      mnemonicAvailable,
      emailErrorMessage
    } = this.state;

    return (
      <ImageBackgroundComponent>
        <Loader {...this.props}></Loader>
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../assets/images/logo.png")}
                style={{
                  width: Layout.window.width - normalize(200),
                  height: normalize(200)
                }}
                imageStyle={{
                  borderRadius: 10
                }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <View style={Style.form}>
            <Form>
              <Text
                style={{
                  fontFamily: "ubuntu-bold",
                  color: Colors.tintColor,
                  textAlign: "left",
                  fontSize: normalize(24)
                }}
              >
                Register
              </Text>
              <Item floatingLabel error={emailInvalid}>
                <Icon
                  style={{
                    color: Colors.inputLabel,
                    fontSize: normalize(24)
                  }}
                  type="Octicons"
                  name="logo-github"
                />
                <Label style={[Style.formLabel]}>Email</Label>
                <Input
                  style={[Style.formInput]}
                  onChangeText={email => {
                    this.setState({ email: email.trim() });
                  }}
                  autoCapitalize="none"
                  autoFocus={true}
                  value={email}
                />
              </Item>
              <Item floatingLabel error={passwordInvalid}>
                <Icon
                  style={{
                    color: Colors.inputLabel,
                    fontSize: normalize(24)
                  }}
                  type="SimpleLineIcons"
                  name="lock"
                />
                <Label style={[Style.formLabel]}>Password</Label>
                <Input
                  blurOnSubmit={true}
                  autoCapitalize="none"
                  // onSubmitEditing={this.onFormSubmit}
                  style={[Style.formInput]}
                  onChangeText={password => {
                    this.setState({ password: password.trim() });
                  }}
                  onBlur={() => {
                    // TODO form submit
                  }}
                  value={password}
                  secureTextEntry={secureTextEntry}
                />
                <Icon
                  onPress={() => {
                    this.setState({ secureTextEntry: !secureTextEntry });
                  }}
                  type="MaterialIcons"
                  style={{
                    color: Colors.inputLabel
                  }}
                  color={Colors.inputLabel}
                  name={secureTextEntry ? "visibility" : "visibility-off"}
                />
              </Item>
            </Form>
          </View>
          {!this.state.keyBoard && (
            <View style={{}}>
              {Boolean(this.props.store && this.props.store.email) && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <Text
                    style={[
                      {
                        fontFamily: "ubuntu",
                        textAlign: "center",
                        fontSize: normalize(14),
                        color: Colors.noticeText
                      }
                    ]}
                  >
                    Login to {this.props.store.email}
                  </Text>
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
                onPress={() => {
                  //TODO
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text
                  style={[
                    {
                      fontFamily: "ubuntu",
                      textAlign: "center",
                      marginTop: normalize(15),
                      fontSize: normalize(12),
                      color: Colors.noticeText
                    }
                  ]}
                >
                  Terms & Conditions
                </Text>
              </TouchableOpacity> */}
              <Fab
                active={false}
                direction="up"
                containerStyle={{}}
                style={{
                  backgroundColor: Colors.tintColor,
                  alignSelf: "flex-end"
                }}
                position="bottomRight"
                onPress={this.onFormSubmit}
              >
                <Icon type="AntDesign" name="arrowright" />
              </Fab>
            </View>
          )}
        </Content>
      </ImageBackgroundComponent>
    );
  }
}
