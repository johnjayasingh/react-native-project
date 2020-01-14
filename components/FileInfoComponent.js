import moment from "moment";
import { Body, Card, CardItem, Icon } from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";
import { ScrollView } from "react-native-gesture-handler";
export default class FileInfoComponent extends React.Component {
  render() {
    const { data, onSelect } = this.props;

    return (
      <ScrollView>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
            key={index}
          >
            <Card style={styles.card}>
              <View style={{ padding: 15 }}>
                <Text style={styles.title}>{item && item.fileName}</Text>
                <Text style={styles.info}>
                  {moment(new Date((item && item.uploadedDate) || 0)).format(
                    "DD MMMM YYYY hh:mm:ss"
                  )}
                </Text>
                <Text style={[styles.info]}>{`${((item && item.fileSize) || 0) /
                  1024} Kb -  ${item && item.type}`}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondaryBackgroundColor,
    borderColor: Colors.secondaryBackgroundColor,
    borderRadius: normalize(8)
  },
  title: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.noticeText,
    paddingTop: normalize(5),
    paddingBottom: normalize(5)
  },
  info: {
    fontFamily: "ubuntu",
    paddingBottom: normalize(3),
    fontSize: normalize(15),
    color: Colors.noticeText,
    opacity: 0.8
  }
});
