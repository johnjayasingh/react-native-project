import React, { Component } from "react";
import Video from "react-native-video";
import { VaultImageBackgroundComponent } from "../components/ImageBackgroundComponent";
import { SKIP_LOGIN_LOADING } from "../constants/API";
import { StatusBar, AsyncStorage } from "react-native";

export default class IntroPlayComponent extends Component {
  state = {
    navigate: "PinUnlock"
  };
  constructor() {
    super();
    this.navigateNext = this.navigateNext.bind(this);
  }

  async componentDidMount() {
    if (SKIP_LOGIN_LOADING) {
      this.props.navigation.navigate("SliderUnlock");
    }
    let pin = await AsyncStorage.getItem("pin");
    if (pin) {
      this.setState({ navigate: "SliderUnlock" });
    }
  }

  navigateNext() {
    this.props.navigation.navigate(this.state.navigate, {
      navigateTo: "SliderUnlock"
    });
  }

  render() {
    return (
      <VaultImageBackgroundComponent>
        <StatusBar hidden />
        <Video
          onError={this.navigateNext}
          onVideoError={this.navigateNext}
          onEnd={this.navigateNext}
          source={require("../assets/images/vault-animate.mp4")} // Can be a URL or a local file.
          fullscreen={true}
          playInBackground={true}
          resizeMode="cover"
          ref={ref => {
            this.player = ref;
          }} // Store reference
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          posterResizeMode="stretch"
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
        />
      </VaultImageBackgroundComponent>
    );
  }
}
