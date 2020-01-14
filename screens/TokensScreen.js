import { Button, Card, CardItem, Container, Content, Form, Icon, Input, Item, Label, Left, Right, Title, Toast } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheetComponent from "../components/BottomSheetComponent";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import { Confirm } from "../components/Loader";
import NavigationHeaderComponent from "../components/NavigationHeader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Style, { Tokens } from "../constants/Style";
import { normalize } from "../utils/screenSize";


const newCryptoTemplate = {
  displayText: "EOS",
  coinCode: "EOS",
  image: "../assets/images/ethereum.png",
  symbol: "Ξ",
  contractAddress: "0x1BE3Cd2Dbf68D2621d792dA84afdeA9Bdb58f196",
  isToken: true,
  balance: 0,
  displayBalance: 0,
  fiatSymbol: "USD",
  fiatBalance: "0"
};
export class TokensScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: false,
    cryptoCurrenciesTemplate: {},
    cryptoCurrenciesTemplateKeys: [],
    disableInput: true,
    displayText: "",
    contractAddress: "",
    coinCode: "",
    cryptoChanged: false,
    removedKeys: {},
    showConfirm: false
  };

  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.onAddPress = this.onAddPress.bind(this);
    this.removeCrypto = this.removeCrypto.bind(this);
    this.onSaveChanges = this.onSaveChanges.bind(this);
  }

  componentDidMount() {
    this.setState(this.props);
  }

  removeCrypto(key) {
    const { removedKeys } = this.state;
    console.log(key, removedKeys);
    if (!removedKeys) {
      removedKeys = {};
    }
    if (removedKeys[key]) {
      delete removedKeys[key];
    } else {
      removedKeys[key] = true;
    }
    this.setState({ removedKeys, cryptoChanged: true });
  }

  onAddPress() {
    const {
      displayText,
      coinCode,
      contractAddress,
    } = this.state;
    const newCrypto = {
      ...newCryptoTemplate,
      displayText,
      coinCode,
      contractAddress
    };
    const cryptoCurrenciesTemplate = { ...this.state.cryptoCurrenciesTemplate }
    if (
      !displayText ||
      !coinCode ||
      !contractAddress ||
      !cryptoCurrenciesTemplate
    ) {
      Toast.show({
        duration: 3000,
        text: "Please fill in all the fields",
        type: "danger",
        position: "top"
      });
      return;
    } else if (cryptoCurrenciesTemplate[coinCode]) {
      console.log("Code Taken");

      Toast.show({
        duration: 3000,
        text: "Token code already taken",
        type: "danger"
      });
      return;
    } else {
      cryptoCurrenciesTemplate[coinCode] = newCrypto;
      this.handleClose();
      this.setState({ cryptoChanged: true });
    }
    this.setState({ cryptoCurrenciesTemplate })
  }

  handleClose() {
    this.setState({ modalVisible: false });
  }

  onSaveChanges() {
    const { cryptoCurrenciesTemplate } = this.state;
    Object.keys(this.state.removedKeys).forEach(key => {
      delete cryptoCurrenciesTemplate[key];
    });
    this.props.saveCryptoTemplateChanges(cryptoCurrenciesTemplate);
    this.setState({
      contractAddress: "",
      coinCode: "",
      displayText: "",
      modalVisible: false
    });
    // this.props.navigation.navigate("Profile");
  }


  render() {
    const {
      coinCode,
      displayText,
      contractAddress,
      cryptoChanged,
      removedKeys,
      cryptoCurrenciesTemplate
    } = this.state;

    const cryptoCurrenciesTemplateKeys = Object.keys(
      cryptoCurrenciesTemplate
    ).filter(key => !["BTC", "BCH", "ETC", "ETH"].includes(key));

    const { navigation } = this.props;

    return (
      <Container>
        <NavigationHeaderComponent
          title={"Tokens"}
          subTitle={cryptoChanged && "Save Changes"}
          navigation={navigation}
          back="Profile"
          onSubtitlePress={() => {
            this.setState({ showConfirm: true });
          }}
        />
        <Confirm
          visible={this.state.showConfirm}
          confirmAction={() => {
            this.setState({ showConfirm: false });
            this.onSaveChanges();
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
            <Content
              style={[
                Style.content,
                { flex: 1, backgroundColor: "transparent" }
              ]}
            >
              <Card style={[Style.cardItem]}>
                {cryptoCurrenciesTemplateKeys.map(key => {
                  return (
                    <CardItem key={key} style={[Tokens.cardItem]}>
                      <View
                        style={{
                          maxWidth: Layout.window.width - normalize(20),
                          marginRight: normalize(20)
                        }}
                      >
                        <Label
                          style={[
                            Tokens.label,
                            removedKeys[key]
                              ? {
                                textDecorationLine: "line-through",
                                color: Colors.failedColor
                              }
                              : {}
                          ]}
                        >
                          {cryptoCurrenciesTemplate[key].displayText}
                        </Label>
                        <Text
                          style={[
                            Tokens.text,
                            removedKeys[key]
                              ? {
                                textDecorationLine: "line-through",
                                color: Colors.failedColor
                              }
                              : {}
                          ]}
                        >
                          {cryptoCurrenciesTemplate[key].coinCode}
                        </Text>
                        <Text
                          style={[
                            Tokens.text,
                            removedKeys[key]
                              ? {
                                textDecorationLine: "line-through",
                                color: Colors.failedColor
                              }
                              : {}
                          ]}
                        >
                          {cryptoCurrenciesTemplate[key].contractAddress}
                        </Text>
                      </View>
                      <View style={{ width: normalize(20) }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.removeCrypto(key);
                          }}
                        >
                          <Icon
                            style={[
                              Tokens.icon,
                              removedKeys[key]
                                ? { color: Colors.failedColor }
                                : {}
                            ]}
                            type="AntDesign"
                            name="closecircleo"
                          />
                        </TouchableOpacity>
                      </View>
                    </CardItem>
                  );
                })}
                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "left",
                      color: Colors.tintColor,
                      fontSize: normalize(16),
                      fontFamily: "ubuntu-bold",
                      marginTop: normalize(20),
                      marginLeft: normalize(22)
                    }}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                  >
                    + Add Token
                  </Text>
                </TouchableOpacity>
              </Card>
            </Content>
          </View>
          <BottomSheetComponent modalVisible={this.state.modalVisible}>
            <Card style={[Style.cardItem]}>
              <CardItem style={[Style.cardItem]}>
                <Left>
                  <Title
                    style={{
                      color: Colors.noticeText,
                      fontFamily: "ubuntu-light",
                      fontSize: normalize(17)
                    }}
                  >
                    Add Token
                  </Title>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={this.handleClose}
                    style={{
                      alignSelf: "flex-end",
                      marginRight: normalize(15)
                    }}
                  >
                    <Icon
                      name="close"
                      style={{
                        fontSize: normalize(40),
                        color: Colors.inputLabel
                      }}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>

              <Form>
                <Item style={{ marginVertical: normalize(20) }} stackedLabel>
                  <Label>Token Name</Label>
                  <Input
                    style={[Style.formInput]}
                    autoCapitalize="words"
                    value={displayText}
                    onChangeText={displayText => {
                      this.setState({ displayText });
                    }}
                    autoFocus={this.state.modalVisible}
                  />
                </Item>
                <Item style={{ marginVertical: normalize(20) }} stackedLabel>
                  <Label>Token Code</Label>
                  <Input
                    autoCapitalize="characters"
                    style={[Style.formInput]}
                    value={coinCode}
                    onChangeText={coinCode => {
                      this.setState({ coinCode });
                    }}
                  />
                </Item>
                <Item style={{ marginVertical: normalize(20) }} stackedLabel>
                  <Label>Contract Address</Label>
                  <Input
                    autoCapitalize="none"
                    style={[Style.formInput]}
                    value={contractAddress}
                    onChangeText={contractAddress => {
                      this.setState({ contractAddress });
                    }}
                  />
                </Item>
                <Button
                  full
                  transparent
                  disabled={!coinCode && !displayText && !contractAddress}
                  onPress={this.onAddPress}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Save</Text>
                </Button>
              </Form>
            </Card>
          </BottomSheetComponent>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

export default TokensScreen;

const styles = StyleSheet.create({
  addButtonText: {
    fontFamily: "ubuntu-bold",
    fontSize: normalize(16),
    color: Colors.buttonSendColor
  },
  addButton: {
    backgroundColor: Colors.secondaryBackgroundColor,
    height: normalize(60),
    borderRadius: 8
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  sheet: {
    position: "absolute",
    top: Layout.window.height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: Colors.backgroundColor,
    // marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: normalize(300)
  },
  card: {
    height: "100%",
    width: 200
  }
});

const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
const cards = [1, 2, 3, 4, 5, 5, 6];
