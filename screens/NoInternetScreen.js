import { Content, Text } from "native-base";
import React, { Component } from "react";
import { StatusBar, NetInfo } from "react-native";
import ImageBackgroundComponent from "../components/ImageBackgroundComponent";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { normalize } from "../utils/screenSize";

export default class NoInternetScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
    }

    componentDidMount() {
        setInterval(async () => {
            const networkData = await NetInfo.getConnectionInfo();
            if (networkData.type != 'none') {
                this.props.navigation.navigate('Loading')
            }
        }, 1000)

    }

    render() {
        const message = this.props.navigation.getParam("message", "NO INTERNET CONNECTIVITY DETECTED");
        return (
            <ImageBackgroundComponent>
                <StatusBar backgroundColor={Colors.backgroundColor} />

                <Content
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "stretch"
                    }}
                >
                    <StatusBar backgroundColor={Colors.backgroundColor} />

                    <Text
                        style={{
                            color: Colors.noticeText,
                            fontFamily: "ubuntu",
                            alignSelf: "center",
                            textAlign: "center",
                            color: Colors.failedColor,
                            paddingTop: 50,
                            width: Layout.window.width - normalize(100)
                        }}
                    >{message}{"\n"} Please restart the app and try again.
                    </Text>

                </Content>
            </ImageBackgroundComponent>
        );
    }
}
