import moment from "moment";
import {
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Label,
  Toast
} from "native-base";
import React, { Component } from "react";
import { Clipboard, Image, Text, TouchableOpacity, View, AsyncStorage } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import InputModalComponent from "../components/InputModalComponent";
import NavigationHeaderComponent from "../components/NavigationHeader";
import Colors from "../constants/Colors";
import Style, { Profile } from "../constants/Style";
import { normalize } from "../utils/screenSize";
import { validateMnemonic } from "../utils/validators";
import { Confirm } from "../components/Loader";

export class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalAction: () => { },
    displayText: "",
    showConfirm: false,
    modalVisible: false,
    image: "",
    emailInvalid: false,
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    country: "",
    cryptoCurrenciesTemplate: [],
    mnemonic: "",
    mnemonicInvalid: false
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSubtitlePress = this.onSubtitlePress.bind(this);
    this.validateMnmonic = this.validateMnmonic.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.resetPIN = this.resetPIN.bind(this);
    this.logout = this.logout.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState(nextProps);
    }
  }

  validateMnmonic() {
    this.setState({ mnemonicInvalid: !validateMnemonic(this.state.mnemonic) });
  }

  handleChange(obj) {
    this.setState(obj);
  }

  handleKeyPress({ nativeEvent: { key: keyValue } }) {
    if (keyValue === "Backspace") {
      const { mnemonic } = this.state;
      const splited = mnemonic.split(" ");
      this.setState({
        mnemonic: splited.splice(0, splited.length - 2 || 0).join(" ")
      });
    }
  }

  updateFromInput() {
    this.setState(this.props);
  }

  async resetPIN() {
    await AsyncStorage.removeItem('pin');
    await AsyncStorage.setItem('resetMode', "true");
    this.props.navigation.navigate('PinUnlock', { navigateTo: 'Main' });
    Toast.show({
      duration: 3000,
      text: "PIN has been removed.",
      position: "top",
      type: "warning"
    });
  }

  logout() {
    Toast.show({ text: 'Logged Out Successfully' })
    this.props.logout()
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "Home" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate("Auth");
    this.props.navigation.dispatch(resetAction);
  }

  onSubtitlePress() {
    this.props.navigation.navigate("ProfileEdit");
  }

  componentDidMount() {
    this.updateFromInput();
  }

  componentDidUpdate() {
    // if (this.state.email !== this.props.profile.email) {
    //   this.updateFromInput();
    // }
  }

  render() {
    const { modalVisible, emailInvalid, mnemonicInvalid } = this.state;
    const { navigation, profile } = this.props;
    const size = normalize(90);
    return (
      <Container>
        <NavigationHeaderComponent
          title={"My Profile"}
          subTitle={"Edit Profile"}
          back={"Home"}
          navigation={navigation}
          onSubtitlePress={this.onSubtitlePress}
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
          }}
        />
        <ImageBackgroundComponent>
          <View
            style={{
              flex: 1,
              alignContent: "flex-end"
            }}
          >
            <InputModalComponent
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
              modalVisible={modalVisible}
            />
            <Content
              style={[
                Style.content,
                { flex: 1, backgroundColor: "transparent" }
              ]}
            >
              <Card style={[Style.cardItem]}>
                <CardItem
                  style={[
                    Style.cardItem,
                    {
                      paddingBottom: normalize(30),
                      flex: 1
                    }
                  ]}
                >
                  <TouchableOpacity style={{ paddingRight: normalize(30) }}>
                    <Image
                      source={{ uri: this.state.image }}
                      style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        alignSelf: "flex-start"
                      }}
                    />
                  </TouchableOpacity>

                  <View>
                    <Text style={Profile.text}>{this.state.name || "--"}</Text>
                    <Text
                      style={[
                        Profile.text,
                        {
                          borderBottomColor: emailInvalid
                            ? Colors.errorBackground
                            : Colors.inputLabel
                        }
                      ]}
                    >
                      {this.state.email.toLowerCase()}
                    </Text>
                    <Text style={Profile.text}>{this.state.phone || "--"}</Text>
                  </View>
                </CardItem>

                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon
                      style={Profile.icon}
                      type="EvilIcons"
                      name="calendar"
                    />
                  </View>

                  <View>
                    <Label style={Profile.label}>Date Of Birth</Label>
                    <Text style={Profile.text}>
                      {moment(this.state.dob || new Date(0)).format(
                        "DD MMMM YYYY"
                      )}
                    </Text>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon
                      style={Profile.icon}
                      type="EvilIcons"
                      name="location"
                    />
                  </View>

                  <View>
                    <Label style={Profile.label}>Address</Label>
                    <Text style={Profile.text}>
                      {this.state.address || "--"}
                    </Text>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon style={Profile.icon} type="FontAwesome" name="flag" />
                  </View>

                  <View>
                    <Label style={Profile.label}>Country</Label>
                    <Text style={Profile.text}>
                      {this.state.country || "--"}
                    </Text>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon
                      style={Profile.icon}
                      type="MaterialCommunityIcons"
                      name="ethereum"
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Tokens");
                      }}
                    >
                      <Label style={Profile.label}>Tokens</Label>
                      <Text style={Profile.text}>Add/Edit/Remove Tokens</Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon style={Profile.icon} type="FontAwesome" name="key" />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        Clipboard.setString(this.state.mnemonic);
                        Toast.show({
                          duration: 3000,
                          text: "Mnemonic Seed copied",
                          position: "bottom"
                        });
                      }}
                    >
                      <Label style={Profile.label}>Mnemonic Seed</Label>
                      <Text style={Profile.text}>Copy Mnemonic Seed</Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon style={Profile.icon} type="FontAwesome" name="ellipsis-h" />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalAction: this.resetPIN, showConfirm: true, displayText: "This will remove your current PIN. A new PIN must be set to access vault." })
                        console.log(this.state)
                      }}
                    >
                      <Label style={Profile.label}>Reset PIN</Label>
                      <Text style={Profile.text}>Warning: This will reset your PIN.</Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon style={Profile.icon} type="Foundation" name="web" />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("QRScan", {
                          title: "Scan Web Login QR Code"
                        });
                      }}
                    >
                      <Label style={Profile.label}>Orichalcum Web</Label>
                      <Text style={Profile.text}>
                        Login by scanning QR Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                <CardItem style={[Profile.cardItem]}>
                  <View style={{ width: normalize(60) }}>
                    <Icon style={Profile.icon} type="AntDesign" name="logout" />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalAction: this.logout, showConfirm: true, displayText: "Confirm Logout from Orichalcum" })
                      }}
                    >
                      <Label style={Profile.label}>Logout</Label>
                      <Text style={Profile.text}>Logout from Orichalcum</Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            </Content>
          </View>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

export default ProfileScreen;
