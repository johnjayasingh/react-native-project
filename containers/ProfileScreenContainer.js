import { connect } from "react-redux";
import { crypto, wallet } from "../actions";
import ProfileScreen from "../screens/ProfileScreen";
import { loginAccount, uploadImage, logoutAccount } from "../actions/account";
import TokensScreen from "../screens/TokensScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.profile,
    profile: state.profile,
    ...state.session,
    store: state.store,
    mnemonic: state.mnemonic
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(loginAccount(data)),
    logout: data => dispatch(logoutAccount(data)),
    uploadImage: data => dispatch(uploadImage(data)),
    saveChanges: data => dispatch(wallet.saveChanges(data)),
    saveCryptoTemplateChanges: data =>
      dispatch(wallet.saveCryptoTemplateChanges(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);

export const ProfileEditScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditScreen);

export const TokensScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TokensScreen);
