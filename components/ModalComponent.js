import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Card, CardItem, Icon } from "native-base";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import IconImageComponent from "./IconImageComponent";
import moment from "moment";
import { normalize } from "../utils/screenSize";

export class ModalComponent extends Component {
  render() {
    const { selected, modalVisible, onClose } = this.props;
    const {
      coinCode,
      displayText,
      address,
      sender,
      receiver,
      transactedOn,
      fiatSymbol,
      fiatAmount,
      amount,
      value,
      isToken
    } = selected;

    const deviceWidth = Layout.window.width;
    const deviceHeight = Layout.window.height;
    return (
      <Modal
        // isVisible={true}
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card
          style={{
            backgroundColor: Colors.modalBackground,
            width: Layout.window.width - normalize(40),
            borderRadius: 15
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignSelf: "flex-end",
              marginRight: normalize(15)
            }}
          >
            <Icon
              name="close"
              style={{ fontSize: normalize(40), color: Colors.inputLabel }}
            />
          </TouchableOpacity>
          <CardItem
            style={{
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                marginTop: normalize(-15)
              }}
            >
              <IconImageComponent size={22} name={coinCode} />
            </View>
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {
                    color: Colors.failedColor
                  }
                ]}
              >
                From {sender}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.address,
                  {
                    color: Colors.successColor
                  }
                ]}
              >
                To {receiver}
              </Text>
              <Text style={styles.date}>
                On {moment(transactedOn).format("DD MMMM YYYY HH:mm")}
              </Text>
            </View>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: "transparent",
              justifyContent: "space-between",
              margin: normalize(15)
            }}
          >
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text style={styles.amountTitle}>Quantity</Text>
              <Text style={styles.amount}>
                {isToken ? value : amount}
                {coinCode}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text style={styles.amountTitle}>Amount</Text>
              <Text style={styles.amount}>
                {"$ "}{fiatAmount}
              </Text>
            </View>
          </CardItem>
          {/* <CardItem
            style={{
              backgroundColor: "transparent",
              marginLeft: normalize(15)
            }}
          >
            <View
              style={{
                marginTop: normalize(2),
                marginRight: normalize(5)
              }}
            >
              <Icon
                name="checkcircleo"
                style={{
                  color: status(selected.coinCode),
                  fontSize: normalize(30)
                }}
                type="AntDesign"
              />
            </View>
            <View
              style={{
                alignSelf: "flex-start"
              }}
            >
              <Text style={styles.statusTitle}>Status</Text>
              <Text style={styles.status}>{selected.status}</Text>
            </View>
          </CardItem> */}
        </Card>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: normalize(15),
    marginLeft: normalize(-20),
    marginTop: normalize(10),
    position: "absolute"
  },
  address: {
    fontFamily: "ubuntu",
    fontSize: normalize(15),
    overflow: "hidden",
    maxWidth: Layout.window.width - normalize(160),
    color: Colors.noticeText
  },
  date: {
    fontFamily: "ubuntu",
    fontSize: normalize(14),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.noticeText
  },
  amountTitle: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.inputLabel
  },
  amount: {
    fontFamily: "ubuntu-bold",
    fontSize: normalize(15),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.successColor
  },
  status: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.noticeText
  },
  statusTitle: {
    fontFamily: "ubuntu-bold",
    fontSize: normalize(15),
    opacity: 0.8,
    marginTop: normalize(3),
    color: Colors.inputLabel
  }
});

export default ModalComponent;
