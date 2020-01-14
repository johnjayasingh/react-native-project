import React from "react";
// import { Icon } from 'expo';
import { Text, TouchableOpacity } from "react-native";
import { Icon, Button } from "native-base";

import Colors from "../constants/Colors";
import { iconMap, FONT_FAMILY } from "../constants/Icon";
import { normalize } from "../utils/screenSize";

// const Icon = createIconSet(iconMap, FONT_FAMILY, '../assets/fonts/icomoon.ttf');

export default class TabBarIcon extends React.Component {
  render() {
    const { size, style, onPress, name, focused } = this.props;
    return (
      <Text
        onPress={onPress}
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: normalize( size || 25),
          color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          ...style
        }}
      >
        {iconMap[name]}
      </Text>
    );
  }
}
