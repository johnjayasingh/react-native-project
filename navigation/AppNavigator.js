import { createAppContainer, createSwitchNavigator } from "react-navigation";
import PinUnlock from "../components/PinUnlock";
import AuthenticationNavigator from "./AuthenticationNavigator";
import MainTabNavigator from "./MainTabNavigator";
import IntroPlayComponent from "../components/IntroPlayComponent";
import LoadingScreen from "../screens/LoadingScreen";
import WalletNavigator from "./WalletNavigator";
import DocumentNavigator from "./DocumentNavigator";
import {
  SliderUnlockContainer,
  PinUnlockContainer
} from "../containers/RegisterLoginContainer";
import NoInternetScreen from "../screens/NoInternetScreen";
import { LoadingScreenContainer } from "../containers/LoadingScreenContainer";

export default createAppContainer(
  createSwitchNavigator({
    // AuthLoading: AuthLoadingContainer,
    LoadingScreen: LoadingScreenContainer,
    PlayIntro: IntroPlayComponent,
    PinUnlock: PinUnlockContainer,
    SliderUnlock: SliderUnlockContainer,
    NoInternet: NoInternetScreen,
    Auth: AuthenticationNavigator,
    Wallet: WalletNavigator,
    Document: DocumentNavigator,
    Main: MainTabNavigator
  })
);
