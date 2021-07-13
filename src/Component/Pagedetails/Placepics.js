import React from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
import GridImageView from "react-native-grid-image-viewer";
export default function Placepics({ placedata }) {
  return (
    <View style={styles.container}>
      <GridImageView
        data={[
          placedata.pic1,
          placedata.pic2,
          placedata.pic3,
          placedata.pic4,
          placedata.pic5,
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: h,
    marginTop: 10,
    width: w,
  },
  imgAvtr: {
    width: 80,
    height: 80,
  },
});
