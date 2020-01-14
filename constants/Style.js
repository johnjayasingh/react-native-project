import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { normalize } from "../utils/screenSize";
import Layout from "./Layout";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-between",
    alignContent: "center"
  },
  content: {
    backgroundColor: Colors.backgroundColor
    // shadowRadius:""
  },
  accordion: {},
  send: {},
  formItem: { justifyContent: "space-evenly", backgroundColor: "transparent" },
  formIcon: {},
  formLabel: {
    fontFamily: "ubuntu",
    width: "45%",
    color: Colors.inputLabel,
    fontSize: normalize(15),
    paddingLeft: normalize(10),
    paddingBottom: normalize(20)
  },
  formInput: {
    fontFamily: "ubuntu",
    fontSize: normalize(17),
    color: Colors.inputLabel
  },
  borderBottom: {
    borderColor: Colors.inputLabel,
    borderBottomWidth: 1
  },
  form: {
    marginLeft: 14,
    marginRight: 20
  },
  cardItem: {
    borderColor: "transparent",
    backgroundColor: Colors.backgroundColor
  },
  centerAlignedText: {
    fontFamily: "ubuntu",
    textAlign: "center",
    fontSize: normalize(16),
    color: Colors.noticeText
  }
});

export const EditProfile = StyleSheet.create({
  cardItem: {
    borderColor: "transparent",
    backgroundColor: Colors.backgroundColor,
    alignContent: "center",
    marginLeft: normalize(8),
    marginRight: normalize(8),
    // paddingTop: normalize(20),
    // paddingBottom: normalize(20),
    borderTopColor: Colors.borderColor1,
    borderTopWidth: 1,
    minHeight: normalize(40)
  },
  formInput: {
    minWidth: Layout.window.width - normalize(100),
    fontFamily: "ubuntu",
    fontSize: normalize(16),
    color: Colors.noticeText,
    borderBottomColor: "transparent",
    borderBottomWidth: normalize(0.3),
    height: normalize(40),
    paddingLeft: normalize(3)
  },
  formLabel: {
    fontFamily: "ubuntu",
    color: Colors.inputLabel,
    fontSize: normalize(15),
    marginLeft: normalize(7),
    marginBottom: normalize(-5)
  }
});

export const Profile = StyleSheet.create({
  formInput: {
    minWidth: Layout.window.width - normalize(100),
    fontFamily: "ubuntu",
    height: normalize(23),
    fontSize: normalize(16),
    color: Colors.noticeText,
    borderBottomColor: "transparent",
    borderBottomWidth: normalize(0.3),
    height: normalize(40)
  },
  topBarFormInput: {
    fontFamily: "ubuntu",
    fontSize: normalize(14),
    minWidth: Layout.window.width - normalize(100),
    height: normalize(35),
    borderBottomColor: Colors.successColor,
    borderBottomWidth: normalize(0.3),
    color: Colors.tintColor
  },
  formLabel: {
    fontFamily: "ubuntu",
    color: Colors.inputLabel,
    fontSize: normalize(15),
    marginLeft: normalize(7),
    marginBottom: normalize(-5)
  },
  textarea: {
    minWidth: Layout.window.width - normalize(100),
    fontFamily: "ubuntu",
    height: normalize(30),
    fontSize: normalize(16),
    color: Colors.noticeText,
    height: normalize(60),
    width: normalize(200),
    borderColor: "transparent",
    paddingLeft: normalize(3)
  },
  cardItem: {
    borderColor: "transparent",
    backgroundColor: Colors.backgroundColor,
    alignContent: "center",
    marginLeft: normalize(8),
    marginRight: normalize(8),
    // paddingTop: normalize(20),
    // paddingBottom: normalize(20),
    borderTopColor: Colors.borderColor1,
    borderTopWidth: 1,
    minHeight: normalize(60)
  },
  icon: {
    color: Colors.tintColor,
    fontSize: normalize(24),
    alignSelf: "center"
  },
  label: {
    fontFamily: "ubuntu-bold",
    color: Colors.noticeText,
    fontSize: normalize(16),
    marginBottom: normalize(4)
  },
  text: {
    fontFamily: "ubuntu",
    fontSize: normalize(16),
    color: Colors.inputLabel,
    textAlign: "left",
    overflow: "hidden",
    height: normalize(25)
  }
});

export const Tokens = StyleSheet.create({
  formInput: {
    minWidth: Layout.window.width - normalize(100),
    fontFamily: "ubuntu",
    fontSize: normalize(15),
    color: Colors.tintColor,
    borderBottomColor: Colors.successColor,
    borderBottomWidth: normalize(0.3)
  },
  topBarFormInput: {
    fontFamily: "ubuntu",
    fontSize: normalize(14),
    color: Colors.tintColor
  },
  card: {
    minHeight: normalize(600)
  },
  cardItem: {
    borderColor: "transparent",
    backgroundColor: Colors.backgroundColor,
    alignContent: "center",
    marginLeft: normalize(8),
    marginRight: normalize(8),
    // paddingTop: normalize(20),
    // paddingBottom: normalize(20),
    borderBottomColor: Colors.borderColor1,
    borderBottomWidth: 1,
    minHeight: normalize(60),
    flex: 1,
    justifyContent: "space-between"
  },
  icon: {
    color: Colors.tintColor,
    fontSize: normalize(24),
    alignSelf: "center"
  },
  label: {
    fontFamily: "ubuntu-bold",
    color: Colors.noticeText,
    fontSize: normalize(14)
  },
  text: {
    fontFamily: "ubuntu",
    fontSize: normalize(14),
    color: Colors.labelColorToken,
    textAlign: "left",
    overflow: "hidden"
  },
  cover: {
    backgroundColor: Colors.borderColor1
  },
  sheet: {
    position: "absolute",
    top: Layout.window.height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center"
  }
});
