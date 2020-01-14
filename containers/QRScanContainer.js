import { connect } from "react-redux";
import { wallet } from "../actions";
import QRScanScreen from "../screens/QRScanScreen";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmountToSend: data => dispatch(wallet.setAmountToSend(data)),
    setRecipient: data => dispatch(wallet.setRecipient(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRScanScreen);
