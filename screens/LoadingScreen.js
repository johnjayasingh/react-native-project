import { Content } from "native-base";
import React, { Component } from "react";
import { View, Image } from "react-native";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";

export class LoadingScreen extends Component {
  componentDidMount() {
    this.props.loadApplication()
  }

  render() {
    return (
      <ImageBackgroundComponent>
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../assets/images/group.png")}
              style={{
                width: Layout.window.width - normalize(200),
                height: normalize(200)
              }}
              imageStyle={{
                borderRadius: 10
              }}
              resizeMode={"contain"}
            />
          </View>
        </Content>
      </ImageBackgroundComponent>
    );
  }
}

export default LoadingScreen;
