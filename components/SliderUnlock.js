import { Icon } from "native-base";
import React, { Component } from "react";
import {
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated
} from "react-native";
import { SafeAreaView } from "react-navigation";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";

const CIRCLE_SIZE = normalize(80);
const PLACEHOLDER_EXTRA_HEIGHT_ADJUST = normalize(25);

const CENTER_X = (Layout.window.width - CIRCLE_SIZE) / 2;
const CENTER_Y = (Layout.window.height - CIRCLE_SIZE) / 2;

export default class SliderUnlock extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY({
      x: CENTER_X,
      y: CENTER_Y
    });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.setState({ active: true }),
      onPanResponderMove: (evt, gestureState) => {
        this.setState({ opacity: 0.7 });
        position.setValue({ x: gestureState.moveX, y: CENTER_Y });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.isCrypto(gestureState)) {
          this.props.navigation.navigate("PinUnlock", { navigateTo: "Wallet" });
        } else if (this.isDocument(gestureState)) {
          this.props.navigation.navigate("PinUnlock", {
            navigateTo: "Document"
          });
        }
        this.setState({ opacity: 0.2, active: false });
        position.setValue({
          x: CENTER_X,
          y: CENTER_Y
        });
      }
    });
    this.state = { position, opacity: 0.2, active: false };
  }

  componentDidMount() { }

  isDocument(gesture) {
    return gesture.dx > normalize(CIRCLE_SIZE);
  }

  isCrypto(gesture) {
    return gesture.dx < normalize(CIRCLE_SIZE) / -1;
  }

  render() {
    const { position, opacity, active } = this.state;
    const { left, top } = position.getLayout();
    return (
      <ImageBackgroundComponent>
        <View style={styles.container}>
          <SafeAreaView />
          <Animated.Image
            ref={circle => {
              this.circle = circle;
            }}
            style={[
              position.getLayout(),
              styles.placeholder,
              {
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                opacity: active ? 0.3 : 1
              }
            ]}
            {...this._panResponder.panHandlers}
            source={
              active
                ? require("../assets/images/cardbg.png")
                : require("../assets/lockscreen/swipe.png")
            }
          />

          <View
            style={[
              {
                width: Layout.window.width - normalize(14),
                height:
                  CIRCLE_SIZE + normalize(PLACEHOLDER_EXTRA_HEIGHT_ADJUST),
                backgroundColor: Colors.tintColor,
                opacity: opacity,
                top:
                  Number(JSON.stringify(top)) -
                  CIRCLE_SIZE -
                  normalize(PLACEHOLDER_EXTRA_HEIGHT_ADJUST) / 2,
                alignSelf: "center",
                borderRadius: CIRCLE_SIZE / 2
              }
            ]}
          >
            <View
              style={{
                position: "absolute",
                position: "absolute",
                width: CIRCLE_SIZE * 1.3,
                left: normalize(CIRCLE_SIZE / 5),
                top: normalize(CIRCLE_SIZE / 3)
              }}
            >
              <Icon
                name="wallet"
                type="AntDesign"
                style={[
                  {
                    fontSize: normalize(CIRCLE_SIZE / 2),
                    color: Colors.noticeText,
                    zIndex: 10,
                    alignSelf: "center"
                  }
                ]}
              />
              <Text
                style={{
                  color: Colors.noticeText,
                  fontSize: normalize(16),
                  textAlign: "center",
                  fontFamily: "ubuntu"
                }}
              >
                Wallet
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                width: CIRCLE_SIZE * 1.3,
                right: normalize(CIRCLE_SIZE / 5),
                top: normalize(CIRCLE_SIZE / 3)
              }}
            >
              <Icon
                name="filetext1"
                type="AntDesign"
                style={[
                  {
                    fontSize: normalize(CIRCLE_SIZE / 2),
                    color: Colors.noticeText,
                    zIndex: 10,
                    alignSelf: "center"
                  }
                ]}
              />
              <Text
                style={{
                  color: Colors.noticeText,
                  fontSize: normalize(16),
                  textAlign: "center",
                  fontFamily: "ubuntu"
                }}
              >
                Documents
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: Colors.tintColor,
                fontSize: normalize(15),
                textAlign: "center",
                fontFamily: "ubuntu",
                top:
                  (Number(JSON.stringify(top)) +
                    CIRCLE_SIZE * 2 +
                    PLACEHOLDER_EXTRA_HEIGHT_ADJUST) /
                  2
              }}
            >
              Swipe left or right to choose
            </Text>
          </View>
          <View
            style={{
              top: (Number(JSON.stringify(top)) - CIRCLE_SIZE * 4) / 2,
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                color: Colors.noticeText,
                fontSize: normalize(35),
                textAlign: "center",
                fontFamily: "ubuntu-bold",
                marginBottom: normalize(14)
              }}
            >
              Hello
            </Text>
            <Text
              style={{
                color: Colors.noticeText,
                fontSize: normalize(24),
                textAlign: "center",
                fontFamily: "ubuntu"
              }}
            >
              Welcome to Orichalcum
            </Text>
          </View>
        </View>
      </ImageBackgroundComponent>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    backgroundColor: "red"
  },
  placeholder: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    zIndex: 11
  },
  container: {
    flex: 1,
    paddingTop: 64
  }
});
