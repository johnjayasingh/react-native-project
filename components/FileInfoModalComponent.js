import { Button, Icon, Text } from "native-base";
import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors.js";
import { normalize } from "../utils/screenSize.js";

export class FileInfoModalComponent extends Component {
  render() {
    const {
      visible,
      shareAction,
      cancelAction,
      deleteAction,
      downloadAction
    } = this.props;
    // if (this.props.visible) {
    //   console.log(this.props);
    // }
    return (
      <Modal transparent={true} animationType="fade" visible={Boolean(visible)}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Button
              transparent
              onPress={() => {
                shareAction();
              }}
            >
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Icon
                  type="Entypo"
                  name="share"
                  fontSize={25}
                  style={{
                    color: Colors.tintColor
                  }}
                />
                <Text
                  style={{
                    color: Colors.tintColor
                  }}
                >
                  Share
                </Text>
              </View>
            </Button>
            <Button
              transparent
              onPress={() => {
                downloadAction();
              }}
            >
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Icon
                  type="Ionicons"
                  name="md-open"
                  fontSize={25}
                  style={{
                    color: Colors.tintColor
                  }}
                />
                <Text
                  style={{
                    color: Colors.tintColor
                  }}
                >
                  Open
                </Text>
              </View>
            </Button>
            {/* <Button
              transparent
              onPress={() => {
                deleteAction();
              }}
            >
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Icon
                  type="AntDesign"
                  name="delete"
                  fontSize={25}
                  style={{
                    color: Colors.tintColor
                  }}
                />
                <Text
                  style={{
                    color: Colors.tintColor
                  }}
                >
                  Delete
                </Text>
              </View>
            </Button> */}
          </View>
        </View>
      </Modal>
    );
  }
}

{
  /* <TouchableNativeFeedback
              style={{
                alignItems: "center"
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="checkbox-multiple-marked-outline"
                fontSize={25}
                style={{
                  color: Colors.tintColor
                }}
              />
              <Text
                style={{
                  color: Colors.tintColor
                }}
              >
                Select All
              </Text>
            </TouchableNativeFeedback> */
}
``;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.noticeText,
    borderRadius: 6,
    minHeight: 25,
    padding: 8,
    width: "95%",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: normalize(90),
    opacity: 0.9
  }
});
