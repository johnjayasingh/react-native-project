import LottieView from "lottie-react-native";
import { Container, Content } from "native-base";
import React from "react";
import { RefreshControl, Text, TouchableOpacity } from "react-native";
import DeckSwiperComponent from "../components/DeckSwiperComponent";
import DoubleLineText from "../components/DoubleLineText";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import ModalComponent from "../components/ModalComponent";
import NavigationHeaderComponent from "../components/NavigationHeader";
import TransactionListComponent from "../components/TransactionListComponent";
import Colors from "../constants/Colors";
import Style from "../constants/Style";
import { normalize } from "../utils/screenSize";
import Loader from "../components/Loader";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    modalVisible: false,
    refreshing: false,
    selected: {},
    loading: true,
    showAll: false,
    qrSession: ""
  };

  componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps;
    this.setState(nextProps);

    const qrSession = navigation.getParam("address", this.state.qrSession);
    if (this.state.qrSession != qrSession) {
      this.setState({ qrSession });
      this.props.qrLogin(qrSession);
    }
  }
  componentWillUnmount() {
    this.setState({ modalVisible: false });
  }

  onCardSelect(index) { }

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
    this.setState({ refreshing: false });
    this.props.getCryptoBalance();
    this.props.getTransactionHistory();
  };

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    const { profile, changeSelectedCrypto } = this.props;
    const { image } = profile;
    const { selected, modalVisible, showAll } = this.state;
    const { cryptoCurrencies = [], transactionHistory = [] } = this.props;

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
          title={"Orichalcum"}
          back="SliderUnlock"
          uri={image}
          navigation={navigation}
        />
        <ImageBackgroundComponent>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={[Style.content, { flex: 1, backgroundColor: "transparent" }]}
          >
            {cryptoCurrencies.length !== 0 && (
              <DeckSwiperComponent
                onCardPress={index => {
                  navigation.navigate("Details");
                  changeSelectedCrypto(index);
                }}
                data={cryptoCurrencies}
              />
            )}
            <ModalComponent
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
              modalVisible={modalVisible}
              selected={selected}
            />

            {transactionHistory && transactionHistory.length > 0 && (
              <TransactionListComponent
                onSelect={this.onSelect.bind(this)}
                style={Style.accordion}
                data={transactionsData}
              />
            )}
            {transactionHistory && transactionHistory.length > 6 && !showAll && (
              <TouchableOpacity style={{ flex: 1 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.tintColor,
                    fontSize: normalize(16),
                    fontFamily: "ubuntu-bold",
                    padding: 35.
                  }}
                  onPress={() => {
                    navigation.navigate("AllTransactions");
                  }}
                >
                  View All Transactions
                </Text>
              </TouchableOpacity>
            )}
            {transactionHistory &&
              transactionHistory.length == 0 &&
              cryptoCurrencies.length != 0 && (
                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.tintColor,
                      fontSize: normalize(16),
                      fontFamily: "ubuntu-bold",
                      marginTop: 5
                    }}
                  >
                    No Previous Transactions
                  </Text>
                </TouchableOpacity>
              )}
          </Content>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}
