import React, { Component } from "react";
import { Container, Content, Card, CardItem } from "native-base";
import { View } from "react-native";
import NavigationHeaderComponent from "../components/NavigationHeader";
import { INITIAL_STATE } from "../constants/State";

import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Style from "../constants/Style";
import ReceiveComponent from "../components/ReceiveComponent";
import { normalize } from "../utils/screenSize";

export class ReceiveScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation, displayText } = this.props;

    return (
      <Container>
        <NavigationHeaderComponent
          title={`Receive ${displayText || "---"}`}
          back={"HomeStack"}
          navigation={navigation}
        />

        <ImageBackgroundComponent>
          <Content
            style={[
              Style.content,
              {
                backgroundColor: "transparent",
                flexDirection: "column-reverse"
              }
            ]}
          >
            <Card
              style={[
                Style.cardItem,
                {
                  minHeight: normalize(300)
                }
              ]}
            >
              <ReceiveComponent {...this.props} />
            </Card>
          </Content>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

export default ReceiveScreen;
