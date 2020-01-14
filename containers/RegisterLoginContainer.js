import { connect } from "react-redux";
import { account, wallet } from "../actions";
import PinUnlock from "../components/PinUnlock";
import SliderUnlock from "../components/SliderUnlock";

const mapStateToProps = (state, ownProps) => {
  return {
    mnemonic: state.mnemonic,
    profile: state.profile,
    store: state.store,
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

export const PinUnlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinUnlock);

export const SliderUnlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderUnlock);
