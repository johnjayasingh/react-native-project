import React, { Component } from "react";
import { Image, View } from "react-native";

import bitcoinimg from "../assets/images/bitcoin.png";
import ethereumimg from "../assets/images/ethereum.png";
import ethereumclassicimg from "../assets/images/etc.png";

import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

const bitcoin = ["BCH", "BTC"];
const ETC = "ETC"

export default class IconImageComponent extends Component {
  render() {
    const { name = "home", size = normalize(30), style } = this.props;
    const position = size;
    return (
      <View
        style={{
          borderRadius: size,
          backgroundColor: Colors.noticeText,
          margin: 14,
          padding: size / 2,
          width: size * 2,
          height: size * 2,
          ...style
        }}
      >
        <Image
          source={bitcoin.includes(name) ? bitcoinimg : name === ETC ? ethereumclassicimg : ethereumimg}
          style={{
            width: bitcoin.includes(name) ? position : position * 3,
            height: bitcoin.includes(name) ? position : position * 3,
            marginLeft: bitcoin.includes(name) ? 0 : position / -1,
            marginTop: bitcoin.includes(name) ? 0 : position / -1
          }}
        />
      </View>
    );
  }
}
