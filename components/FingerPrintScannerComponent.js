import React, { Component } from "react";
import posed, { Transition } from "react-native-pose";
import Colors from "../constants/Colors";
import { Icon, Button, Text } from "native-base";
import { normalize } from "../utils/screenSize";

const Box = posed.View({
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
});

export class FingerPrintScannerComponent extends Component {
  state = {
    pressed: false
  };
  render() {
    const { pressed } = this.state;
    const { isVisible, scanFinger, success, error, message } = this.props;
    let iconColor = Colors.buttonReceiveColor;
    if (pressed && (success || error)) {
      iconColor = success ? Colors.successColor : Colors.failedColor;
    }

    return (
      <Transition>
        {isVisible && (
          <Box key="a">
            <Button
              onPress={() => {
                this.setState({ pressed: true });
                scanFinger();
              }}
              transparent
              large
              full
            >
              <Icon
                type="MaterialIcons"
                style={{ color: iconColor, fontSize: normalize(100) }}
                name="fingerprint"
              />
            </Button>
          </Box>
        )}
        {(message || error) && (
          <Box key="b">
            <Text style={{ color: iconColor, fontSize: normalize(18), marginTop: 25 }}>
              {message || error}
            </Text>
          </Box>
        )}
      </Transition>
    );
  }
}

export default FingerPrintScannerComponent;
