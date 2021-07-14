import { WebView } from "react-native-webview";
import * as React from "react";
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function Chat() {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <WebView
        source={{
          uri: "https://tawk.to/chat/6060a940067c2605c0bd0e45/default",
        }}
        startInLoadingState={true}
        scalesPageToFit={true}
        style={{
          width: deviceWidth,
          height: deviceHeight,
        }}
      />
    </View>
  );
}
