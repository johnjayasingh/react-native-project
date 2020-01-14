import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon, Item, Label, Input } from "native-base";
import Layout from "../constants/Layout";
import Style from "../constants/Style";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";

export class PasswordInputComponent extends Component {
  state = {
    secureTextEntry: true,
    text: ""
  };
  
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value != this.state.text) {
      this.setState({ text: value });
    }
  }
  render() {
    const { style, onChangeText } = this.props;
    const { secureTextEntry, text } = this.state;

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
            type="SimpleLineIcons"
            name="lock"
          />
        </View>
        <View style={{ width: Layout.window.width - 100 }}>
          <Item floatingLabel>
            <Label style={Style.formLabel}>Password</Label>
            <Input
              style={[Style.formInput]}
              onChangeText={text => {
                this.setState({ text });
                onChangeText(text);
              }}
              value={text}
              secureTextEntry={secureTextEntry}
            />
            <Icon
              onPress={() => {
                this.setState({ secureTextEntry: !secureTextEntry });
              }}
              type="MaterialIcons"
              style={{
                color: Colors.inputLabel
              }}
              color={Colors.inputLabel}
              name={secureTextEntry ? "visibility" : "visibility-off"}
            />
          </Item>
        </View>
      </View>
    );
  }
}

export default PasswordInputComponent;
