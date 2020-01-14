import DocumentsScreen from "../containers/DocumentsScreenContainer";
import { createSwitchNavigator } from "react-navigation";

export default createSwitchNavigator({
  // AuthLoading: AuthLoadingContainer,
  Home: DocumentsScreen
});
