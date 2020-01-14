import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Container, Button, Content, Picker } from "native-base";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import IconImageComponent from "../components/IconImageComponent";
import { Card, CardItem, Icon } from "native-base";
import Style from "../constants/Style";
import { normalize } from "../utils/screenSize";

export default class CoinDisplayComponent extends Component {
  state = {
    modalVisible: false
  };

  render() {
    const {
      onChangeCoin,
      coinCode,
      displayText,
      cryptoCurrencies,
      displayBalance
    } = this.props;
    const { modalVisible } = this.state;

    const deviceWidth = Layout.window.width;
    const deviceHeight = Layout.window.height;
    return (
      <CardItem
        style={[
          Style.cardItem,
          {
            justifyContent: "space-between",
            alignItems: "stretch"
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 0,
            justifyContent: "space-between"
          }}
        >
          <IconImageComponent name={coinCode} size={20} />
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: normalize(17),
                fontFamily: "ubuntu",
                color: Colors.noticeText,
                textAlignVertical: "center"
              }}
            >
              {displayText || "---"}{"\n"}
              {`${displayBalance}`}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                lineHeight: normalize(17),
                color: Colors.tintColor,
                lineHeight: normalize(17),
                fontSize: normalize(15),
                textAlignVertical: "center"
              }}
            >
              Change Coin
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          // isVisible={true}
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          onBackButtonPress={() => {
            this.setState({ modalVisible: false });
          }}
          onBackdropPress={() => {
            this.setState({ modalVisible: false });
          }}
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card
            transparent
            style={{
              backgroundColor: Colors.modalBackground,
              width: Layout.window.width - normalize(40),
              borderRadius: 15,
              borderColor: "transparent"
            }}
          >
            {cryptoCurrencies.map((obj, index) => {
              return (
                <TouchableOpacity
                  key={`key${index}`}
                  onPress={() => {
                    onChangeCoin(index);
                    this.setState({ modalVisible: false });
                  }}
                >
                  <CardItem style={{ backgroundColor: "transparent" }}>
                    <Text style={{ color: Colors.noticeText }}>
                      {obj.displayText}
                      {"    "}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        color: Colors.failedColor
                      }}
                    >{`${obj.symbol} ${obj.displayBalance ||
                      obj.balance}`}</Text>
                    <Text
                      style={{
                        textAlign: "right",
                        color: Colors.successColor
                      }}
                    >
                      = {`${obj.fiatSymbol} ${obj.fiatBalance}`}
                    </Text>
                  </CardItem>
                </TouchableOpacity>
              );
            })}
          </Card>
        </Modal>
      </CardItem>
    );
  }
}
