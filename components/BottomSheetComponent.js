import { Content } from "native-base";
import React, { Component } from "react";
import { Modal, View } from "react-native";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export default class BottomSheetComponent extends Component {
  render() {
    return (
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: Colors.secondaryBackgroundColor
          }}
        >
          <Content
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: Colors.backgroundColor
            }}
          >
            {this.props.children}
          </Content>
        </View>
      </Modal>
    );
  }
}
