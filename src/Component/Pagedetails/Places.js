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
export default function Places() {
  return (
    <View style={styles.container}>
      <View style={styles.viewCard}>
        <Image
          source={{
            uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
          }}
          style={styles.imgAvtr}
        />

        <View style={styles.viewName}>
          <Text style={styles.testName}>Name</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <FontAwesome5 name="route" color={COLORS.dark} size={25} />
          </TouchableOpacity>
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
