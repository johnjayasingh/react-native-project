import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors.js";
import Layout from "../constants/Layout.js";
import { normalize } from "../utils/screenSize.js";
import { Button, Text } from "native-base";

export class Loader extends Component {
  render() {
    const { loading, color } = this.props;
    return (
      <Modal
        transparent={true}
        animationType={"none"}
        visible={loading}
        onRequestClose={() => {
          console.log("close modal");
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <LottieView
              ref={checkAnimation => {
                this.checkAnimation = checkAnimation;
              }}
              source={require("../assets/lottie/crazy_loading.json")}
              loop
              autoPlay
              style={{
                width: 100,
                alignSelf: "center"
              }}
              autoSize={true}
              duration={1000}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export class Confirm extends Component {
  render() {
    const { visible, displayText = "Are you sure about making this changes ?", confirmAction, cancelAction } = this.props;
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={cancelAction}
        onDismiss={cancelAction}
      >
        <View style={confirmstyles.modalBackground}>
          <View style={confirmstyles.activityIndicatorWrapper}>
            <Text
              style={{
                fontFamily: "ubuntu",
                fontSize: normalize(17),
                color: Colors.noticeText,
                margin: normalize(16)
              }}
            >
              {displayText}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Button
                transparent
                onPress={confirmAction}
                style={{
                  backgroundColor: Colors.secondaryBackgroundColor,
                  borderRadius: 8,
                  margin: normalize(16)
                }}
              >
                <Text
                  style={{
                    fontFamily: "ubuntu-bold",
                    fontSize: normalize(16),
                    color: Colors.failedColor,
                    textAlign: "center"
                  }}
                >
                  Confirm
                </Text>
              </Button>
              <Button
                transparent
                onPress={cancelAction}
                style={{
                  backgroundColor: Colors.secondaryBackgroundColor,
                  borderRadius: 8,
                  margin: normalize(16)
                }}
              >
                <Text
                  style={{
                    fontFamily: "ubuntu-bold",
                    fontSize: normalize(16),
                    color: Colors.successColor,
                    textAlign: "center"
                  }}
                >
                  Cancel
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#20206020"
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.modalBackground,
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(35),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

const confirmstyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#20206020",
    justifyContent: "center",
    alignItems: "center"
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.modalBackground,
    borderRadius: normalize(10),
    margin: normalize(10),
    height: normalize(140),
    justifyContent: "center",
    alignItems: "center"
  }
});
