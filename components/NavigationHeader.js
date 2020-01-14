import { Icon, Text, Thumbnail } from "native-base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";
import Loader from "./Loader";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.session,
    ...state.profile
  };
};
class NavigationHeaderComponent extends React.Component {

  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    const {
      uri,
      navigation,
      title,
      subTitle,
      onBackPress = () => { },
      onSubtitlePress = () => { },
      back,
      loading = false,
      enabledLoader = true
    } = this.props;
    return (
      <View
        style={{
          backgroundColor: Colors.backgroundColor,
          paddingLeft: normalize(16),
          paddingRight: normalize(16)
        }}
      >
        <SafeAreaView />
        <Loader loading={enabledLoader && loading} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              // backgroundColor: "red",
              height: 50,
              width: "23%",
              justifyContent: "center"
            }}
            onPress={event => {
              onBackPress();
              if (back) navigation.navigate(back);
            }}
          >
            {Boolean(back) && (
              <Icon
                name="arrow-back"
                style={{
                  color: Colors.noticeText
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // backgroundColor: "blue",
              height: 50,
              width: "50%",
              justifyContent: "center"
            }}
          >
            {Boolean(title) && (
              <Text
                style={{
                  color: Colors.noticeText,
                  fontFamily: "ubuntu-medium",
                  fontSize: normalize(20),
                  lineHeight: normalize(20),
                  textAlignVertical: "center",
                  textAlign: "center"
                }}
              >
                {title}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // backgroundColor: "orange",
              height: 50,
              width: "23%",
              justifyContent: "center"
            }}
            onPress={() => {
              onSubtitlePress();
              if (uri) this.props.navigation.navigate("Profile");
            }}
          >
            {Boolean(uri) && (
              <Thumbnail
                style={{ alignSelf: "flex-end" }}
                small
                source={{ uri: uri }}
              />
            )}
            {Boolean(subTitle) && (
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: Colors.noticeText,
                  fontFamily: "ubuntu",
                  fontSize: normalize(15)
                }}
              >
                {subTitle}
              </Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(NavigationHeaderComponent);
