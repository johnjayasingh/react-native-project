import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Container,
  DeckSwiper,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Accordion,
  Thumbnail,
  Content,
  Card,
  Grid,
  Row,
  Col,
  CardItem
} from "native-base";

import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";
export default class DoubleLineText extends React.Component {
  render() {
    const {
      primaryText = "Recent",
      secondaryText = "Transactions"
    } = this.props;
    return (
      <Text style={{ backgroundColor: Colors.backgroundColor }}>
        <Text
          style={{
            color: Colors.tintColor,
            fontSize: normalize(20),
            fontFamily: "ubuntu",
            backgroundColor: Colors.backgroundColor
          }}
        >
          {primaryText}
          {"\n"}
        </Text>
        <Text
          style={{
            color: Colors.tintColor,
            fontSize: normalize(20),
            fontFamily: "ubuntu-bold",
            backgroundColor: Colors.backgroundColor
          }}
        >
          {secondaryText}
        </Text>
      </Text>
    );
  }
}
