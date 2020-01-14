import React, { Component } from "react";
import {
  View,
  Image,
  Platform,
  Text,
  ImageBackground,
  TouchableOpacity,
  Clipboard
} from "react-native";
import {
  Container,
  Thumbnail,
  Content,
  CardItem,
  Left,
  Label,
  Item,
  Icon,
  Right,
  Input,
  Toast
} from "native-base";
import NavigationHeaderComponent from "../components/NavigationHeader";
import QRCode from "react-native-qrcode-svg";

import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Colors from "../constants/Colors";
import Style from "../constants/Style";
import TransactionListComponent from "../components/TransactionListComponent";
import Layout from "../constants/Layout";
import DoubleLineText from "../components/DoubleLineText";
import IconImageComponent from "../components/IconImageComponent";
import { normalize } from "../utils/screenSize";
import ModalComponent from "../components/ModalComponent";

export class DetailsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: false,
    selected: {},
    refreshing: false,
    showAll: false
  };

  constructor(props) {
    super(props);
    this.onSharePress = this.onSharePress.bind(this);
  }

  onSharePress() {
    Clipboard.setString(this.props.address);
    Toast.show({ duration: 3000, text: "Address copied", position: "bottom" });
  }

  onSelect(item) {
    const { coinCode, amount } = item;
    const { fiatValue } = this.props;
    this.setState({
      modalVisible: true,
      selected: {
        ...item,
        fiatAmount: Number(
          ((fiatValue && fiatValue[coinCode]) || 0) * amount
        ).toFixed(2)
      }
    });
  }

  render() {
    const {
      navigation,
      transactions,
      coinCode,
      cryptoIndex,
      displayText,
      address,
      balance,
      displayBalance,
      symbol,
      fiatSymbol,
      fiatBalance
    } = this.props;
    const transactionsData = [
      {
        title: <DoubleLineText primaryText={displayText} />,
        content: transactions
      }
    ];

    const { selected, modalVisible, showAll } = this.state;

    return (
      <Container>
        <NavigationHeaderComponent
          title={`${coinCode} Wallet`}
          //   subTitle={"Edit Profile"}
          back={"Home"}
          navigation={navigation}
        />
        <ImageBackgroundComponent>
          <Content
            style={[Style.content, { flex: 1, backgroundColor: "transparent" }]}
          >
            <ImageBackground
              source={require("../assets/images/cardbg.png")}
              style={{
                width: Layout.window.width - 30,
                margin: 15
              }}
              imageStyle={{
                borderRadius: 10
              }}
              resizeMode={"cover"}
            >
              <TouchableOpacity onPress={this.onSharePress}>
                <View
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    padding: 1
                  }}
                >
                  <CardItem
                    style={{
                      backgroundColor: "transparent"
                    }}
                  >
                    <Left>
                      <IconImageComponent name={coinCode} size={33} />
                    </Left>
                    <Right>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: normalize(24),
                          fontFamily: "ubuntu-bold",
                          color: Colors.noticeText
                        }}
                      >
                        {`${symbol} ${displayBalance || balance}`}
                      </Text>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: normalize(18),
                          fontFamily: "ubuntu",
                          color: Colors.noticeText
                        }}
                      >
                        = $ {fiatBalance}
                      </Text>
                    </Right>
                  </CardItem>
                  <CardItem
                    style={{
                      backgroundColor: "transparent",
                      alignSelf: "center"
                    }}
                  >
                    <View
                      contentContainerStyle={{}}
                      style={{
                        backgroundColor: "transparent",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          borderColor: Colors.noticeText,
                          borderWidth: 5
                        }}
                      >
                        <QRCode
                          size={normalize(120)}
                          color={Colors.backgroundColor}
                          backgroundColor={Colors.noticeText}
                          logoBackgroundColor={Colors.backgroundColor}
                          value={address}
                        />
                      </View>
                      <Label
                        style={{
                          fontFamily: "ubuntu",
                          textAlign: "center",
                          color: Colors.noticeText,
                          marginTop: 10,
                          fontSize: normalize(16)
                        }}
                      >
                        Scan QR code to get your {coinCode} address
                      </Label>
                    </View>
                  </CardItem>
                  <CardItem
                    style={{
                      backgroundColor: "transparent",
                      alignSelf: "center",
                      marginTop: 30
                    }}
                  >
                    <View style={{ maxWidth: "100%" }}>
                      <Label
                        style={{
                          fontFamily: "ubuntu",
                          color: Colors.noticeText
                        }}
                      >
                        Your {coinCode} Address
                      </Label>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.noticeText
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            color: Colors.noticeText,
                            overflow: "hidden",
                            flexGrow: 2,
                            fontFamily: "ubuntu",
                            textAlignVertical: "center",
                            maxWidth: "95%"
                          }}
                          value={address}
                        >
                          {address}
                        </Text>
                        <Icon
                          type="Entypo"
                          name="share"
                          fontSize={25}
                          style={{
                            color: Colors.noticeText
                          }}
                        />
                      </View>
                    </View>
                  </CardItem>
                </View>
              </TouchableOpacity>
            </ImageBackground>
            <ModalComponent
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
              modalVisible={modalVisible}
              selected={selected}
            />
            {transactions && transactions.length > 0 && (
              <TransactionListComponent
                onSelect={this.onSelect.bind(this)}
                style={Style.accordion}
                data={transactionsData}
              />
            )}
            {transactions && transactions.length == 0 && (
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.tintColor,
                    fontSize: normalize(18),
                    fontFamily: "ubuntu-bold",
                    marginTop: 5
                  }}
                >
                  No Previous Transactions
                </Text>
              </TouchableOpacity>
            )}
          </Content>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

export default DetailsScreen;
