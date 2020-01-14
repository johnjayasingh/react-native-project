import { connect } from "react-redux";
import { crypto, wallet, account } from "../actions";
import { selectedCryptoSelector } from "../selectors/CryptoSelector";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    store: state.store,
    mnemonic: state.mnemonic,
    ...state.session,
    cryptoCurrencies: state.cryptoCurrencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(account.loginAccount(data)),
    logout: data => dispatch(account.logoutAccount(data)),
    register: data => dispatch(account.registerAccount(data)),
    restoreWallet: mnemonic => dispatch(wallet.restoreWallet(mnemonic)),
    loginAccountSuccess: data => dispatch(account.loginAccountSuccess(data))
  };
};

export const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export const RegisterScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);

export const AuthenticationScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationScreen);
