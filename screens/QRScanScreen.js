import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import NavigationHeaderComponent from "../components/NavigationHeader";
import { Container } from "native-base";
import { normalize } from "../utils/screenSize";

export class QRScanScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { setRecipient, navigation } = this.props;
    const title = navigation.getParam("title", "Scan Address");

    return (
      <Container>
        <NavigationHeaderComponent
          title={title}
          back={"Home"}
          navigation={navigation}
        />
        <QRCodeScanner
          showMarker
          markerStyle={{
            borderColor: Colors.noticeText
          }}
          cameraStyle={{
            height: Layout.window.height - normalize(40)
          }}
          onRead={obj => {
            const { data } = obj;
            navigation.navigate("Home", {
              address: data
            });
          }}
          style={{
            backgroundColor: Colors.backgroundColor
          }}
          bottomContent={
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.backgroundColor,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: Colors.noticeText, fontFamily: "ubuntu" }}>
                Scan QR code containing address
              </Text>
            </View>
          }
          topViewStyle={{
            height: 0,
            flex: 0
          }}
          bottomViewStyle={{
            backgroundColor: Colors.backgroundColor
          }}
        />
      </Container>
    );
  }
}

export default QRScanScreen;
