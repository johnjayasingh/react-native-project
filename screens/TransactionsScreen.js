import React from "react";
import { Container, Content, Card, CardItem, Icon } from "native-base";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  RefreshControl
} from "react-native";

import { INITIAL_STATE } from "../constants/State";
import NavigationHeaderComponent from "../components/NavigationHeader";
import DeckSwiperComponent from "../components/DeckSwiperComponent";
import DoubleLineText from "../components/DoubleLineText";
import TransactionListComponent from "../components/TransactionListComponent";
import Layout from "../constants/Layout";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Style from "../constants/Style";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import IconImageComponent from "../components/IconImageComponent";
import ModalComponent from "../components/ModalComponent";
import { normalize } from "../utils/screenSize";
import TransactionComponent from "../components/TransactionComponent";

export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    modalVisible: false,
    selected: {},
    refreshing: false,
    showAll: false,
    qrSession: ""
  };

  componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps;
    const qrSession = navigation.getParam("address", this.state.qrSession);
    if (this.state.qrSession != qrSession) {
      this.setState({ qrSession });
      this.props.qrLogin(qrSession);
    }
  }
  componentWillUnmount() {
    this.setState({ modalVisible: false });
  }

  onCardSelect(index) {}

  onSelect(item) {
    const { coinCode, amount } = item;
    const { fiatValue } = this.props;
    this.setState({
      modalVisible: true,
      selected: {
        ...item,
        fiatAmount: Number(
          ((fiatValue && fiatValue[coinCode]) || 0) * amount
        ).toFixed(2)
      }
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getCryptoBalance();
    this.props.getTransactionHistory();
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2500);
  };

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    const {
      profile,
      cryptoCurrencies,
      transactionHistory,
      changeSelectedCrypto
    } = this.props;
    const { image } = profile;
    const { selected, modalVisible, showAll } = this.state;

    const transactionsData = [
      {
        title: <DoubleLineText />,
        content: showAll ? transactionHistory : transactionHistory.slice(0, 6)
      }
    ];

    const { navigation } = this.props;

    return (
      <Container>
        <NavigationHeaderComponent
          title={"Transactions"}
          uri={image}
          back={"Home"}
          navigation={navigation}
        />
        <ImageBackgroundComponent>
          <Content
            style={[
              Style.content,
              { flex: 1, backgroundColor: "transparent", marginVertical: 10 }
            ]}
          >
            <ModalComponent
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
              modalVisible={modalVisible}
              selected={selected}
            />
            <TransactionComponent
              onSelect={this.onSelect.bind(this)}
              data={transactionHistory}
            />
          </Content>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}
