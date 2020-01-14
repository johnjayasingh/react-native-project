import React from "react";
import { View } from "react-native";
import { Accordion } from "native-base";
import Colors from "../constants/Colors";
import TransactionComponent from "./TransactionComponent";

export default class TransactionListComponent extends React.Component {
  render() {
    const { data, style, onSelect } = this.props;
    return (
      <Accordion
        icon="ios-arrow-up"
        expandedIcon="ios-arrow-down"
        iconStyle={{ color: Colors.tintColor }}
        expandedIconStyle={{ color: Colors.tintColor }}
        style={{
          borderColor: "none",
          backgroundColor: Colors.backgroundColor,
          ...style
        }}
        headerStyle={{
          backgroundColor: Colors.backgroundColor
        }}
        contentStyle={{
          backgroundColor: Colors.backgroundColor
        }}
        iconStyle={{
          color: Colors.tintColor
        }}
        renderContent={data => (
          <View
            style={{
              backgroundColor: Colors.backgroundColor
            }}
          >
            <TransactionComponent onSelect={onSelect} data={data.content} />
          </View>
        )}
        dataArray={data}
        expanded={0}
      />
    );
  }
}
