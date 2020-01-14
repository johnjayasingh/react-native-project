import React from "react";
import { createStackNavigator } from "react-navigation";
// Components
import TabBarIcon from "../components/TabBarIcon";
import DetailsContainer from "../containers/DetailsContainer";
import DocumentsScreenContainer from "../containers/DocumentsScreenContainer";
// Container
import HomeContainer, { TransactionScreenContainer } from "../containers/HomeContainer";
import ProfileScreenContainer, { ProfileEditScreenContainer, TokensScreenContainer } from "../containers/ProfileScreenContainer";
import QRScanContainer from "../containers/QRScanContainer";
import ReceiveScreenContainer from "../containers/ReceiveScreenContainer";
import SendScreenContainer from "../containers/SendScreenContainer";
import RemoteSessionScreen from "../screens/RemoteSessionScreen";



export const HomeStack = createStackNavigator({
  Home: HomeContainer,
  Profile: ProfileScreenContainer,
  ProfileEdit: ProfileEditScreenContainer,
  Tokens: TokensScreenContainer,
  Details: DetailsContainer,
  QRScan: QRScanContainer,
  AllTransactions: TransactionScreenContainer,
  RemoteSession: RemoteSessionScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"group"} />
  };
};

// HomeStack.navigationOptions = _navigationOption("Home", "group");

export const SendStack = createStackNavigator({
  Home: SendScreenContainer,
  QRScan: QRScanContainer
});

SendStack.navigationOptions = {
  tabBarLabel: "Send",
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"send"} />
};

export const ReceiveStack = createStackNavigator({
  Home: ReceiveScreenContainer
});

ReceiveStack.navigationOptions = {
  tabBarLabel: "Receive",
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"receive"} />
};

export const DocumentStack = createStackNavigator({
  Home: DocumentsScreenContainer
});

DocumentStack.navigationOptions = {
  tabBarLabel: "Documents",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"document"} />
  )
};
