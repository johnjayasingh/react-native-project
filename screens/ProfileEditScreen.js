import moment from "moment";
import { Card, CardItem, Container, Content, DatePicker, Input, Item, Label, Textarea, Toast } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import InputModalComponent from "../components/InputModalComponent";
import NavigationHeaderComponent from "../components/NavigationHeader";
import Colors from "../constants/Colors";
import Style, { EditProfile, Profile } from "../constants/Style";
import { normalize } from "../utils/screenSize";
import { validateForm, validateMnemonic } from "../utils/validators";
import { Confirm } from "../components/Loader";

export class ProfileEditScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    showConfirm: false,
    modalAction: () => { },
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
    mnemonicInvalid: false,
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSubtitlePress = this.onSubtitlePress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.setState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image != this.state.image)
      this.setState({ image: nextProps.image })
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
    // const { profile, mnemonic } = this.props;
    this.setState(this.props);
    // this.setState({ mnemonic });
  }

  onSubtitlePress() {
    if (this.state.emailInvalid || !this.state.email) {
      Toast.show({
        duration: 3000,
        text: !this.state.email ? 'Email is required' : 'Email is invalid',
        buttonText: "Okay",
        type: "danger",
        position: "top"
      });
      return;
    }
    this.setState({ mnemonic: this.state.mnemonic.toLowerCase().trim() })
    if (!validateMnemonic(this.state.mnemonic)) {
      Toast.show({
        duration: 3000,
        text: 'Given Mnemonic Seed is invalid',
        buttonText: "Okay",
        type: "danger",
        position: "top"
      });
      return;
    }
    const {
      image,
      name,
      email,
      phone,
      dob,
      address,
      country,
      mnemonic
    } = this.state;

    this.props.saveChanges({
      image,
      name,
      email,
      phone,
      dob,
      address,
      country,
      mnemonic: validateMnemonic(mnemonic) ? mnemonic : this.props.mnemonic
    });
    this.props.navigation.goBack();
  }

  render() {
    const {
      modalVisible,
      emailInvalid,
      mnemonicInvalid
    } = this.state;
    const { navigation, profile } = this.props;
    const size = normalize(110);
    return (
      <Container>
        <NavigationHeaderComponent
          title={"Edit Profile"}
          subTitle={"Save"}
          back={"Profile"}
          navigation={navigation}
          onSubtitlePress={() => {
            this.setState({ showConfirm: true, modalAction: this.onSubtitlePress })
          }}
        />
        <Confirm
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
                      flex: 1,
                      alignContent: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const options = {
                        title: "Select Avatar",
                        customButtons: [
                          { name: "fb", title: "Choose Photo from Facebook" }
                        ],
                        storageOptions: {
                          skipBackup: true,
                          path: "images"
                        }
                      };
                      // Open Image Library:
                      ImagePicker.launchImageLibrary(options, response => {
                        if (response.data) {
                          let { name, type, uri, data, fileName } = response;
                          if (data) {
                            data = data.replace(/(?:\r\n|\r|\n)/g, "");

                            this.props.uploadImage({
                              fileName,
                              name,
                              type,
                              uri,
                              data: `data:${response.type};base64,${
                                response.data
                                }`
                            });
                          }
                        }
                      });
                    }}
                  >
                    {this.props.loading ? (
                      <ActivityIndicator
                        style={{
                          width: size,
                          height: size,
                          alignSelf: "center"
                        }}
                        size="large"
                      />
                    ) : (
                        <Image
                          source={{ uri: this.state.image }}
                          style={{
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            alignSelf: "center"
                          }}
                        />
                      )}

                    <Text
                      style={{
                        color: Colors.noticeText,
                        fontFamily: "ubuntu",
                        textAlign: "center",
                        paddingTop: normalize(10)
                      }}
                    >
                      Change Picture
                    </Text>
                  </TouchableOpacity>
                </CardItem>
                <TouchableOpacity onPress={() => {
                  this.setState({ image: 'https://www.nepad.org/sites/default/files/default_images/user_placeholder.png' })
                }}>
                  <Text
                    style={{
                      color: Colors.failedColor,
                      fontFamily: "ubuntu",
                      textAlign: "center",
                      paddingBottom: normalize(10)
                    }}
                  > Remove Picture
                    </Text>
                </TouchableOpacity>
                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Name</Label>
                    <Input
                      autoCapitalize="none"
                      style={EditProfile.formInput}
                      placeholder={this.state.name || "--"}
                      value={this.state.name}
                      onChangeText={name => {
                        this.handleChange({ name });
                      }}
                    />
                  </Item>
                </CardItem>
                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Email</Label>
                    <Input
                      autoCapitalize="none"
                      style={EditProfile.formInput}
                      placeholder={this.state.email || "--"}
                      value={this.state.email}
                      keyboardType="email-address"
                      onChangeText={email => {
                        this.handleChange({ email, ...validateForm(email) });
                      }}
                      autoFocus={emailInvalid}
                    />
                  </Item>
                </CardItem>
                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Phone</Label>
                    <Input
                      autoCapitalize="none"
                      style={EditProfile.formInput}
                      placeholder={this.state.phone || "--"}
                      value={this.state.phone}
                      keyboardType="phone-pad"
                      onChangeText={phone => {
                        this.handleChange({ phone });
                      }}
                    />
                  </Item>
                </CardItem>

                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label
                      style={[
                        EditProfile.formLabel,
                        {
                          marginBottom: 0
                        }
                      ]}
                    >
                      Date of Birth
                    </Label>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date(1900, 1, 1)}
                      maximumDate={new Date()}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText={moment(
                        this.state.dob || new Date(0)
                      ).format("DD MMMM YYYY")}
                      textStyle={[
                        EditProfile.formInput,
                        {
                          paddingLeft: 0
                        }
                      ]}
                      placeHolderTextStyle={[EditProfile.formInput]}
                      onDateChange={dob => {
                        this.handleChange({ dob: dob });
                      }}
                    />
                  </Item>
                </CardItem>
                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Address</Label>
                    <Input
                      autoCapitalize="none"
                      style={EditProfile.formInput}
                      placeholder={this.state.address || "--"}
                      value={this.state.address}
                      onChangeText={address => {
                        this.handleChange({ address });
                      }}
                    />
                  </Item>
                </CardItem>
                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Country</Label>
                    <Input
                      autoCapitalize="none"
                      style={EditProfile.formInput}
                      placeholder={this.state.country || "--"}
                      value={this.state.country}
                      onChangeText={country => {
                        this.handleChange({ country });
                      }}
                    />
                  </Item>
                </CardItem>

                <CardItem style={[EditProfile.cardItem]}>
                  <Item
                    stackedLabel
                    style={{
                      color: Colors.inputLabel,
                      borderColor: "transparent"
                    }}
                  >
                    <Label style={[EditProfile.formLabel]}>Menmonic Seed</Label>
                    <Textarea
                      blurOnSubmit={true}
                      style={[
                        Profile.textarea,
                        {
                          borderBottomColor: mnemonicInvalid
                            ? Colors.errorBackground
                            : "transparent"
                        }
                      ]}
                      selectTextOnFocus={true}
                      // onKeyPress={this.handleKeyPress}
                      onChangeText={mnemonic => {
                        this.setState({ mnemonic });
                      }}
                      numberOfLines={4}
                      rowSpan={4}
                      bordered
                      value={this.state.mnemonic}
                      placeholder={this.state.mnemonic || "--"}
                    />
                  </Item>
                </CardItem>
              </Card>
            </Content>
          </View>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

export default ProfileEditScreen;
