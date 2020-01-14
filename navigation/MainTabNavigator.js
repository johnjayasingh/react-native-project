import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// Constants
import Colors from "../constants/Colors";

// Components
import {
  SendStack,
  HomeStack,
  ReceiveStack
} from "./StackNavigator";

const tabBarConfiguration = {
  initialRouteName: "HomeStack",
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.noticeText,
    style: {
      height: 65,
      fontWeight: "bold",
      backgroundColor: Colors.tabBarBackgroundColor,
      borderTopColor: Colors.borderTopColor,
      tabBarTextFontSize: 18,
      paddingTop: 10,
      paddingBottom: 12
    }
  }
};

export default createBottomTabNavigator(
  {
    SendStack,
    HomeStack,
    ReceiveStack
  },
  tabBarConfiguration
);
