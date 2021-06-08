import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Fontisto from "@expo/vector-icons/Fontisto";
import { Rating, AirbnbRating } from "react-native-ratings";
import { mapDarkStyle, mapStandardStyle } from "../Component/mapData";
import axios from "axios";
import { useTheme } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.5;
const SPACING_FOR_CARD_INSET = width * 0.1 - 20;

export default function Test1({ navigation, route }) {
  const [data, setdata] = useState("");
  const [serverPoint, setserverPoint] = useState("");
  const serverpoint = require("../config");
  React.useEffect(() => {
    ///   getData();
  }, []);
  async function getData() {
    var finalUrl = "http://" + serverPoint;

    axios.post(finalUrl + "/getResult", {}).then(res => {
      setdata(res.data);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text>{""}</Text>
      <Text>{""}</Text>
      <Text>{"Enter your Server Adress here"}</Text>

      <TextInput
        style={styles.inputstyl}
        placeholder="Server Address like(192.168.1.101)"
        onChangeText={setserverPoint}
      />

      <View style={styles.viewbuttons}>
        <TouchableOpacity style={styles.buttonsign} onPress={() => getData()}>
          <Text style={styles.textsign}>Fetch Data From Model</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <Text>{data}</Text>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 50,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  logoimg: {
    width: "100%",
    height: 200,
  },
  textheader: {
    fontSize: 25,
    color: "black",
    marginTop: 10,
  },
  textsubheader: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  inputstyl: {
    marginTop: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  viewbuttons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  buttonsign: {
    width: 200,
    backgroundColor: "#0d47a1",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
  },
  textsign: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
  viewscoialbtn: {
    flexDirection: "row",
    marginTop: 20,
  },
  viewfacebook: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#3f51b5",
    alignItems: "center",
    justifyContent: "center",
  },
  socialtext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  viewgoogle: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#f44336",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
