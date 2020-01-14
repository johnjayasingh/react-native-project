import React, { Component } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

import background from "../assets/images/splash.png";
import vault from "../assets/images/vault.png";
export default class ImageBackgroundComponent extends Component {
  render() {
    const { backgroundSize, height } = this.props;
    return (
      <ImageBackground style={styles.image} source={background}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

export class VaultImageBackgroundComponent extends Component {
  render() {
    const { backgroundSize, height } = this.props;
    return (
      <ImageBackground style={styles.image} source={vault}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    backgroundColor: Colors.backgroundColor,
    height: "100%",
    flex: 1
  }
});
