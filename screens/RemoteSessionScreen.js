import React, { Component } from "react";
import Style from "../constants/Style";
import { Container, Content, Text } from "native-base";
import { View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export default class RemoteSessionScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    completed: false,
    session: ""
  };

  componentDidMount() {
    const session = this.props.navigation.getParam(
      "session",
      this.state.session
    );
    this.setState({ session });
  }

  render() {
    return (
      <Container
        style={[Style.container, { backgroundColor: Colors.noticeText }]}
      >
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center"
          }}
          style={[Style.content, { backgroundColor: Colors.backgroundColor }]}
        >
          <TouchableOpacity>
            <LottieView
              ref={checkAnimation => {
                this.checkAnimation = checkAnimation;
              }}
              source={require("../assets/lottie/check_animation.json")}
              onAnimationFinish={() => {
                this.setState({ completed: true });
              }}
              loop={false}
              autoPlay
              style={{
                width: normalize(100),
                alignSelf: "center",
                marginTop: -normalize(40)
              }}
              autoSize={true}
              duration={2500}
            />
            {this.state.completed && (
              <Text
                style={{
                  color: Colors.noticeText,
                  fontFamily: "ubuntu-medium",
                  fontSize: normalize(20),
                  width: 250,
                  textAlign: "center"
                }}
              >
                Connected to {this.state.session}
              </Text>
            )}
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
