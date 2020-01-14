import { Container, Content, Fab, Icon, Text, Toast, View } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Clipboard,
  Linking,
  NativeModules,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFS from "react-native-fs";
import DoubleLineText from "../components/DoubleLineText";
import FileInfoComponent from "../components/FileInfoComponent";
import { FileInfoModalComponent } from "../components/FileInfoModalComponent";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import NavigationHeaderComponent from "../components/NavigationHeader";
import Colors from "../constants/Colors";
import { normalize } from "../utils/screenSize";
import { Confirm } from "../components/Loader";

const FileOpener = NativeModules.FileOpener;

export default class DocumentsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    selected: null,
    refreshing: false,
    files: [],
    modalAction: () => { },
    modalVisible: false,
    showConfirm: false,
    selectedFile: {
      name: "file", type: "raw", uri: "", fileName: "file", fileSize: 0
    }
  };

  constructor() {
    super();
    this._openFilePicker = this._openFilePicker.bind(this);
    this._onSelectFile = this._onSelectFile.bind(this);
    this._onDownloadFile = this._onDownloadFile.bind(this);
    this._onShareFile = this._onShareFile.bind(this);
    this._onDeleteFile = this._onDeleteFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this)
  }

  componentDidMount() {
    this.props.getFiles();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _onSelectFile(file) {
    console.log(file);
    this.setState({ selected: file });
    setTimeout(() => {
      this.setState({ selected: null });
    }, 3000);
  }

  _onDeleteFile() {
    this.setState({ selected: null });
    Toast.show({
      duration: 3000,
      text: "File delete request taken",
      buttonText: "Okay",
      type: "success",
      position: "top"
    });
  }

  _onShareFile() {
    Clipboard.setString(this.state.selected.Location);
    this.setState({ selected: null });
    Toast.show({
      duration: 3000,
      text: "File download URL copied",
      buttonText: "Okay",
      type: "success",
      position: "top"
    });
  }

  _onDownloadFile() {
    const { Location, fileName, type } = this.state.selected;
    this.setState({ selected: null });
    const toFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    Linking.openURL(Location)
      .then(url => {
        if (url) {
          console.log(url);
          Toast.show("Initiated Download through browser.");
        }
      })
      .catch(err => Toast.show(err.message));
  }

  _openFilePicker() {
    if (!this.props.uploading)
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, response) => {
          if (error) {
            console.log(error);
          } else if (response) {
            if (response.fileSize > 20000000) {
              Toast.show({
                type: "danger",
                text: "Maximum file size can be 20mb",
                duration: 3000
              });
            } else {
              // Toast.show({
              //   text: `${response.fileName} has been taken for upload`
              // });
              let { name, type, uri, fileName, fileSize } = response;
              this.setState({ selectedFile: { name, type, uri, fileName, fileSize }, modalAction: this.uploadFile, showConfirm: true })
            }
          }
        }
      );
  }


  uploadFile() {
    this.props.uploadFile(this.state.selectedFile);
  }

  _onRefresh = () => {
    this.setState({ refreshing: false });
    this.props.getFiles();
  };

  render() {
    const { navigation } = this.props;
    const { selected } = this.state;
    const { files } = this.props;

    return (
      <Container>
        <NavigationHeaderComponent
          enabledLoader={false}
          title={"Orichalcum"}
          back="SliderUnlock"
          navigation={navigation}
        />
        <Confirm
          displayText={`Please confirm to upload ${this.state.selectedFile.fileName} ?`}
          visible={this.state.showConfirm}
          confirmAction={() => {
            this.setState({ showConfirm: false });
            this.state.modalAction();
          }}
          cancelAction={() => {
            this.setState({ showConfirm: false });
          }}
        />
        <View
          style={{
            padding: normalize(15),
            backgroundColor: Colors.backgroundColor
          }}
        >
          <DoubleLineText primaryText="Uploaded" secondaryText="Documents" />
        </View>
        <FileInfoModalComponent
          visible={selected}
          cancelAction={() => {
            this.setState({ selected: null });
          }}
          shareAction={this._onShareFile}
          downloadAction={this._onDownloadFile}
          deleteAction={this._onDeleteFile}
        />
        <ImageBackgroundComponent>
          <Content
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "stretch"
            }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh}
          //   />
          // }
          >
            {Boolean(files && files.length > 0) ? (
              <FileInfoComponent onSelect={this._onSelectFile} data={files} />
            ) : (
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
                    Empty
                </Text>
                </TouchableOpacity>
              )}
          </Content>

          <Fab
            active={false}
            direction="up"
            containerStyle={{}}
            style={{
              backgroundColor: Colors.tintColor,
              alignSelf: "flex-end"
            }}
            position="bottomRight"
            onPress={this._openFilePicker}
          >
            {this.props.uploading ? (
              <ActivityIndicator color={Colors.noticeText} size="large" />
            ) : (
                <Icon type="AntDesign" name="clouduploado" />
              )}
          </Fab>
        </ImageBackgroundComponent>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1"
  },
  text: {
    fontSize: normalize(18),
    textAlign: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 60,
    backgroundColor: "#056ecf",
    borderRadius: 5
  },
  buttonText: {
    fontSize: normalize(30),
    color: "#fff"
  }
});
