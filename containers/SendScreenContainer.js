import { connect } from "react-redux";
import { crypto, wallet } from "../actions";
import SendScreen from "../screens/SendScreen";
import {
  selectedCryptoSelector,
  extractCoinValue,
  extractFiatValue
} from "../selectors/CryptoSelector";

const mapStateToProps = (state, ownProps) => {
  const {
    tempDefaults,
    cryptoCurrencies,
    credentials,
    transaction,
    store
  } = state;
  const { cryptoIndex } = tempDefaults;
  const cryptoCurrency = cryptoCurrencies[cryptoIndex];
  const credential = credentials[cryptoCurrency.coinCode]
    ? credentials[cryptoCurrency.coinCode]
    : credentials["ETH"];
  const cryptoCurrenciesKeyIndex = {};
  cryptoCurrencies.forEach((obj, index) => {
    cryptoCurrenciesKeyIndex[obj.coinCode] = index;
  });
  return {
    ...selectedCryptoSelector(state),
    ...ownProps,
    ...tempDefaults,
    ...credential,
    ...cryptoCurrency,
    transaction,
    cryptoCurrencies,
    cryptoCurrenciesKeyIndex,
    ...state.session,
    ...store,
    fiatValue: extractFiatValue(state),
    coinValue: extractCoinValue(state),
    ...state.transaction,
    settings: state.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedCrypto: data => dispatch(crypto.changeSelectedCrypto(data)),
    sendCrypto: data => dispatch(wallet.sendCrypto()),
    signTransaction: data => dispatch(wallet.signTransaction(data)),
    setRecipient: data => dispatch(wallet.setRecipient(data)),
    getCryptoBalance: () => dispatch(wallet.getCryptoBalance),
    setAmountToSend: data => dispatch(wallet.setAmountToSend(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendScreen);
