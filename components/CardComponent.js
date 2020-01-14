import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import {
  Body,
  Container,
  Thumbnail,
  Card,
  Content,
  Left,
  Grid,
  Row,
  Col,
  CardItem,
  Icon,
  Right
} from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import IconImageComponent from "./IconImageComponent";
import { normalize } from "../utils/screenSize";

export default class CardComponent extends Component {
  render() {
    const { data, onCardPress } = this.props;
    const {
      coinCode,
      index,
      displayText,
      balance,
      displayBalance,
      symbol,
      fiatSymbol,
      fiatBalance
    } = data;

    return (
      <ImageBackground
        source={require("../assets/images/cardbg.png")}
        style={{
          width: "100%"
        }}
        imageStyle={{
          borderRadius: 8
        }}
        resizeMode={"cover"}
      >
        <TouchableOpacity
          onPress={() => {
            onCardPress(index);
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent"
            }}
          >
            <CardItem
              style={{
                backgroundColor: "transparent"
              }}
            >
              <Left>
                <IconImageComponent name={coinCode} size={30} />
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
                  {coinCode}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: normalize(18),
                    fontFamily: "ubuntu",
                    color: Colors.noticeText
                  }}
                >
                  {displayText}
                </Text>
              </Right>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: "transparent",
                alignSelf: "flex-end"
              }}
            >
              <Left>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: normalize(14),
                    opacity: 0.9,
                    fontFamily: "ubuntu",
                    color: Colors.noticeText
                  }}
                >
                  Your {coinCode} Balance
                </Text>
              </Left>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: "transparent",
                alignSelf: "flex-end",
                marginTop: normalize(-15)
              }}
            >
              <Left>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: normalize(24),
                    fontFamily: "ubuntu-bold",
                    color: Colors.noticeText
                  }}
                >
                  {`${symbol} ${displayBalance || balance}`}
                </Text>
              </Left>
              <Right>
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
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
