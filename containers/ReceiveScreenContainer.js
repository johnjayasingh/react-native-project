import { connect } from "react-redux";
import { crypto, wallet } from "../actions";
import ReceiveScreen from "../screens/ReceiveScreen";
import { selectedCryptoSelector } from "../selectors/CryptoSelector";

const mapStateToProps = (state, ownProps) => {
  return {
    ...selectedCryptoSelector(state),
    cryptoCurrencies: state.cryptoCurrencies
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
)(ReceiveScreen);
