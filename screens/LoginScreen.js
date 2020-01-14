import {
  Content,
  Fab,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Toast
} from "native-base";
import React, { Component } from "react";
import { Image, Keyboard, TouchableOpacity, View } from "react-native";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Style from "../constants/Style";
import { normalize } from "../utils/screenSize";
import { validateEmail, validateForm } from "../utils/validators";
import Loader from "../components/Loader";

const INITIAL_STATE = {
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
  keyBoard: false,
  mnemonic: "",
  isLogin: true,
  storeAvailable: false,
  mnemonicAvailable: false,
  secureTextEntry: true
};

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = INITIAL_STATE;

  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  async componentDidMount() {
    const { store } = this.props;
    if (store && store.email) {
      // if (store && (store.email != email || store.password != password)) {
      this.setState({ email: store.email });
    }

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  onFormSubmit() {
    const { store } = this.props;
    const { id } = store;
    const { email, password } = this.state;
    const { emailInvalid, passwordInvalid } = validateForm(email, password);
    const credentials = { id, email, password, loginAfterSuccess: true };
    if (password !== store.password) {
      Toast.show({ type: "danger", text: 'Password is incorrect' })
      return
    }
    if (!emailInvalid && !passwordInvalid) {
      this.props.login(credentials);
    }
  }

  _keyboardDidShow() {
    this.setState({ keyBoard: true });
  }

  _keyboardDidHide() {
    this.setState({ keyBoard: false });
  }

  validateForm() {
    const { email, password } = this.state;
    let emailInvalid = false;
    let passwordInvalid = false;
    if (email && email.length) {
      emailInvalid = !validateEmail(email);
    }
    if (email && email.length && (password && password.length <= 0)) {
      passwordInvalid = true;
    } else {
      this.setState({ emailInvalid, passwordInvalid });
    }
  }

  render() {
    const {
      compatible,
      emailInvalid,
      passwordInvalid,
      email,
      password,
      secureTextEntry
    } = this.state;
    const { id } = this.props.store;

    return (
      <ImageBackgroundComponent>
        {/* <Loader {...this.props}></Loader> */}
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
                Login to your account
              </Text>
              <Text
                style={{
                  fontFamily: "ubuntu-bold",
                  color: Colors.noticeText,
                  textAlign: "left",
                  fontSize: normalize(18)
                }}
              >
                {this.props.profile.email}
              </Text>
              {/* <Item floatingLabel error={emailInvalid}>
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
                  disabled={true}
                  style={[Style.formInput]}
                  onChangeText={email => {
                    this.setState({ email });
                  }}
                  value={email}
                />
              </Item> */}
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
                  autoCapitalize="none"
                  blurOnSubmit={true}
                  onSubmitEditing={this.onFormSubmit}
                  style={[Style.formInput]}
                  onChangeText={password => {
                    this.setState({ password });
                  }}
                  onBlur={() => {
                    // TODO form submit
                  }}
                  value={password}
                  autoFocus={true}
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text
                  style={[
                    {
                      fontFamily: "ubuntu",
                      textAlign: "center",
                      fontSize: normalize(15),
                      color: Colors.noticeText
                    }
                  ]}
                >
                  Create New Account
                </Text>
              </TouchableOpacity>
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
