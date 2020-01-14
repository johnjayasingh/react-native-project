import { CheckBox, Form, Icon, Input, Item, Label } from "native-base";
import React, { Component } from "react";
import { Text } from "react-native";
import Colors from "../constants/Colors";
import Style from "../constants/Style";
import { normalize } from "../utils/screenSize";

export class LoginComponent extends Component {
  render() {
    const {
      isLogin,
      onChange,
      onBlur,
      emailInvalid,
      passwordInvalid,
      email,
      mnemonic,
      enableEmail,
      storeAvailable,
      mnemonicAvailable,
      secureTextEntry,
      password
    } = this.props;

    return (
      <Form>
        <Text
          style={{
            fontFamily: "ubuntu-bold",
            color: Colors.tintColor,
            textAlign: "left",
            fontSize: normalize(24)
          }}
        >
          {isLogin ? "Login" : "Register"}
        </Text>
        <Item floatingLabel error={emailInvalid}>
          <Icon
            style={{
              color: Colors.inputLabel,
              fontSize: normalize(24)
            }}
            type="Octicons"
            name="logo-github"
          />
          <Label style={[Style.formLabel}>
            Email
          </Label>
          <Input
            // disabled={isLogin}
            style={[Style.formInput]}
            onChangeText={email => {
              email = email.toLowerCase();
              onChange({ email });
            }}
            autoCapitalize="none"
            autoFocus={!enableEmail}
            onBlur={onBlur}
            value={email}
          />
          <Icon
            onPress={() => {
              onChange({ secureTextEntry: !secureTextEntry });
            }}
            type="MaterialIcons"
            style={{
              color: Colors.inputLabel
            }}
            color={Colors.inputLabel}
            name={secureTextEntry ? "visibility" : "visibility-off"}
          />
        </Item>
        <Item floatingLabel error={passwordInvalid}>
          <Icon
            style={{
              color: Colors.inputLabel,
              fontSize: normalize(24)
            }}
            type="SimpleLineIcons"
            name="lock"
          />
          <Label style={[Style.formLabel]}>Password</Label>
          <Input
            style={[Style.formInput]}
            onChangeText={password => {
              onChange({ password });
            }}
            autoCapitalize="none"
            onBlur={onBlur}
            value={password}
            autoFocus={isLogin}
            secureTextEntry={secureTextEntry}
          />
          <Icon
            onPress={() => {
              onChange({ secureTextEntry: !secureTextEntry });
            }}
            type="MaterialIcons"
            style={{
              color: Colors.inputLabel
            }}
            color={Colors.inputLabel}
            name={secureTextEntry ? "visibility" : "visibility-off"}
          />
        </Item>
        {!isLogin && (
          <Item
            style={{
              marginTop: 10,
              borderColor: "transparent"
            }}
          >
            <CheckBox
              color={Colors.tintColor}
              checked={mnemonicAvailable}
              onPress={() => {
                onChange({ mnemonicAvailable: !mnemonicAvailable });
              }}
            />
            <Text
              style={{
                color: Colors.textTintColor,
                marginLeft: normalize(15)
              }}
            >
              I have an Mnemonic Seed
            </Text>
          </Item>
        )}
      </Form>
    );
  }
}

export default LoginComponent;
