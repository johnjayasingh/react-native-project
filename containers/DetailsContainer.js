import { connect } from "react-redux";
import { crypto, wallet } from "../actions";
import DetailsScreen from "../screens/DetailsScreen";
import { selectedCryptoSelector, extractFiatValue } from "../selectors/CryptoSelector";

const mapStateToProps = (state, ownProps) => {
  const {
    tempDefaults,
    cryptoCurrencies,
    credentials,
    transaction,
    transactionHistory
  } = state;
  const { cryptoIndex } = tempDefaults;
  const cryptoCurrency = cryptoCurrencies[cryptoIndex];
  const cryptoCredentialkey = Object.keys(credentials)[cryptoIndex];
  const credential = credentials[cryptoCredentialkey];
  const transactions = transactionHistory.filter(
    obj => obj.coinCode == cryptoCurrency.coinCode
  );
  return {
    ...tempDefaults,
    ...credential,
    ...cryptoCurrency,
    transaction,
    fiatValue: extractFiatValue(state),
    cryptoCurrencies,
    transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedCrypto: data => dispatch(crypto.changeSelectedCrypto(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsScreen);
