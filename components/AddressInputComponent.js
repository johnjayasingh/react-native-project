import React, { Component } from "react";
import { Content, Item, Input, Label, View } from "native-base";
import TabBarIcon from "./TabBarIcon";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export default class AddressInputComponent extends Component {
  onScanPress() {
    this.props.navigation.navigate("QRScan", {
      title: "Scan Receiver Address"
    });
  }

  render() {
    const { value } = this.props;
    const { onAddressChange } = this.props;
    return (
      <View style={{ margin: normalize(14) }}>
        <Item stackedLabel>
          <Label>Enter Receiving Address</Label>

          <Input
            autoCapitalize="none"
            numberOfLines={1}
            style={{
              color: Colors.noticeText,
              paddingRight: normalize(60),
              overflow: "hidden",
              fontSize: normalize(16)
            }}
            multiline
            onChangeText={onAddressChange}
            value={value}
            textContentType="name"
            textBreakStrategy="highQuality"
          />

          <TabBarIcon
            onPress={this.onScanPress.bind(this)}
            style={{
              position: "absolute",
              right: 5,
              bottom: 15,
              color: Colors.noticeText
            }}
            size={35}
            name="qr-code"
          />
        </Item>
      </View>
    );
  }
}
