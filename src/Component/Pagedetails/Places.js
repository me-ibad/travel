import React from "react";
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

const MIN_HEIGHT = 400;
import COLORS from "../../assets/colors/colors";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Places(props) {
  async function switchToLocation(item) {
    console.log(item.reviewplaces);
    props.navigation.navigate("Details", {
      placedata: item.reviewplaces[0],
      from: "database",
    });
  }

  return (
    <View style={styles.container}>
      {props.hasOwnProperty("reviewPlaces") == true ? (
        <>
          {props.reviewPlaces.map((s, i) => (
            <>
              <View style={styles.viewCard}>
                <Image
                  source={{
                    uri:
                      s.reviewplaces[0].pic1 == ""
                        ? "https://www.panpuri.com/asset/images/product/noimg.jpg"
                        : s.reviewplaces[0].pic1,
                  }}
                  style={styles.imgAvtr}
                />
                <TouchableOpacity onPress={() => switchToLocation(s)}>
                  <View style={styles.viewName}>
                    <Text style={styles.testName}>
                      {s.reviewplaces[0].title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <FontAwesome5 name="route" color={COLORS.dark} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.divider} />
            </>
          ))}
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: h,
    minHeight: MIN_HEIGHT,
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
    width: "500%",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: "gray",
    marginHorizontal: 20,
    marginVertical: 8,
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    height: 50,
    width: 50,
    position: "absolute",
    marginVertical: 20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  testName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
