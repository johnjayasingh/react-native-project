import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon, Item, Label, Input } from "native-base";
import Layout from "../constants/Layout";
import Style from "../constants/Style";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export class EmailInputComponent extends Component {
  state = {
    text: ""
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value != this.state.text) {
      this.setState({ text: value });
    }
  }
  render() {
    const { style, onChangeText, isLogin } = this.props;
    const { text } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          ...style
        }}
      >
        <View style={{ width: 50 }}>
          <Icon
            style={{
              color: Colors.inputLabel,
              fontSize: normalize(24),
              marginTop: 20
            }}
            type="Octicons"
            name="logo-github"
          />
        </View>
        <View style={{ width: Layout.window.width - 100 }}>
          <Item floatingLabel>
            <Label style={Style.formLabel}>Email</Label>
            <Input
              autoCapitalize="none"
              disabled={isLogin}
              style={[Style.formInput]}
              onChangeText={text => {
                text = text.toLowerCase();
                this.setState({ text });
                onChangeText(text);
              }}
              value={text}
            />
          </Item>
        </View>
      </View>
    );
  }
}

export default EmailInputComponent;
