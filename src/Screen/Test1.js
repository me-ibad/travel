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
import { Spinner } from "native-base";
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

  const [isloading, setisloading] = useState(false);

  const serverpoint = require("../config");
  React.useEffect(() => {
    ///   getData();
  }, []);
  async function getData() {
    setisloading(true);
    var finalUrl = "http://" + serverPoint;
  ///  alert(finalUrl);

    // axios.post(finalUrl + "/getResult", {}).then(res => {
    //   setdata(res.data);
    



    setdata("       Actual Cost (USD)  Predicted Cost (USD)
    6070             25744.0              25608.52
    32600            32484.0              32518.63
    8846             31594.0              31551.15
    1483             33367.0              33485.23
    4219             31727.0              31483.11
    7289             24794.0              24782.54
    12994            29612.0              29351.54
    9026             23874.0              23870.13
    23516            30691.0              30924.37
    32732            33930.0              33920.68
    23403            23975.0              23961.78
    8466             30225.0              30051.87
    9153             25833.0              25836.57
    32468            32850.0              32881.87
    10927            31195.0              31121.57
    23520            24083.0              24146.09
    14421            32202.0              32654.62
    457              26475.0              26547.37
    25914            35685.0              35906.79
    30391            30864.0              30774.92")
      setisloading(false);
   /// });
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#05445E" />
      <Text>{""}</Text>
      <Text>{""}</Text>
      <Text style={styles.datatext}>{"Enter your Server Adress here"}</Text>

      <TextInput
        style={styles.inputstyl}
        placeholder="Server Address like(192.168.1.101)"
        onChangeText={setserverPoint}
      />

      <View style={styles.viewbuttons}>
        <TouchableOpacity style={styles.buttonsign} onPress={() => getData()}>
          <Text style={styles.textsign}>Fetch Data From Model</Text>
        </TouchableOpacity>
        {isloading == true ? <Spinner color="blue" /> : null}
      </View>
      {data != "" ? (
        <View style={styles.dataview}>
          <Text style={styles.datatext}>{data}</Text>
        </View>
      ) : null}

      <Text>{""}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05445E",
    padding: 20,
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
  dataview: {
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    color: "white",
  },
  datatext: {
    color: "white",
  },
});
