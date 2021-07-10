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
export default function Placepics() {
  return (
    <View style={styles.container}>
      <GridImageView
        data={[
          "https://img.freepik.com/free-photo/beautiful-wooden-pathway-going-breathtaking-colorful-trees-forest_181624-5840.jpg?size=338&ext=jpg",
          "https://img.freepik.com/free-photo/green-park_1417-1591.jpg?size=338&ext=jpg",
          "https://image.freepik.com/free-photo/beautiful-scenery-canyon-landscape-capitole-reef-national-park_181624-35016.jpg",
          "https://image.freepik.com/free-photo/view-new-york-city-manhattan-midtown-dusk-with-skyscrapers-illuminated-east-river_268835-791.jpg",
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
