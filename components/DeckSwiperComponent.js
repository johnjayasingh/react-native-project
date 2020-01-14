import React from "react";
import Colors from "../constants/Colors";
import CardComponent from "./CardComponent";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";

export default class DeckSwiperComponent extends React.Component {
  _renderItem({ item, index }) {
    return (
      <CardComponent
        onCardPress={this.props.onCardPress}
        data={{ ...item, index }}
      />
    );
  }

  render() {
    const { data } = this.props;
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={data}
        loop={false}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width - 75}
        containerCustomStyle={{
          marginTop: 25,
          marginBottom: 25
        }}
        itemHeight={normalize(165)}
      />
    );
  }
}
