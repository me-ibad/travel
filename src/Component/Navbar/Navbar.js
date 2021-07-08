import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// import Entypo from '"@expo/vector-icons/Entypo';
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
export default function Navbar(props) {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("city");
  return (
    <View style={styles.headerview}>
      <View style={{ width: "10%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" color="black" size={30} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{props.name}</Text>
      </View>
      {/* <View style={{width: '10%'}}>
        <Entypo name="magnifying-glass" color={colors.primary} size={30} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerview: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    height: "8%",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
  },
  text: {
    color: "black",
    // fontWeight: 'bold',
    fontSize: 20,
  },
});
