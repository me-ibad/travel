import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  Text,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

export default function ReviewsProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.viewCard}>
        <Image
          source={{
            uri: "https://image.freepik.com/free-photo/beautiful-scenery-green-valley-near-alp-mountains-austria-cloudy-sky_181624-6979.jpg",
          }}
          style={styles.imgAvtr}
        />

        <View style={styles.viewName}>
          <Text style={styles.textName}>Ibad</Text>
          <Text style={styles.textReview}>lll</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // maxHeight: h,

    width: w,
  },

  imgAvtr: {
    width: 60,
    height: 60,
  },
  viewCard: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
  },
  viewName: {
    width: "50%",
    marginVertical: 1,
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: "grey",
    marginHorizontal: 20,
    marginVertical: 8,
    borderBottomWidth: 0.5,
  },

  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textReview: {
    fontSize: 12,
    color: "grey",
  },
});
