import { connect } from "react-redux";
import { crypto, wallet, account } from "../actions";
import { selectedCryptoSelector } from "../selectors/CryptoSelector";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoadingScreen from "../screens/LoadingScreen";

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadApplication: data => dispatch(account.loadApplication),
    };
};

export const LoadingScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);
