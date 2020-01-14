import { connect } from "react-redux";
import { crypto, wallet, account } from "../actions";
import {
  selectedCryptoSelector,
  extractFiatValue
} from "../selectors/CryptoSelector";
import HomeScreen from "../screens/HomeScreen";
import TransactionScreen from "../screens/TransactionsScreen";

const mapStateToProps = (state, ownProps) => {
  return {
    ...selectedCryptoSelector(state),
    ...state.session,
    fiatValue: extractFiatValue(state),
    profile: state.profile,
    cryptoCurrencies: state.cryptoCurrencies,
    transactionHistory: state.transactionHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedCrypto: data => dispatch(crypto.changeSelectedCrypto(data)),
    qrLogin: data => dispatch(account.qrLogin(data)),
    qrLogout: data => dispatch(account.qrLogout(data)),
    qrTransaction: data => dispatch(account.qrTransaction(data)),
    changeSelectedCrypto: data => dispatch(crypto.changeSelectedCrypto(data)),
    changeSelectedCrypto: data => dispatch(crypto.changeSelectedCrypto(data)),
    getCryptoBalance: () => dispatch(wallet.getCryptoBalance),
    getTransactionHistory: () => dispatch(wallet.getTransactionHistory)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

export const TransactionScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionScreen);
