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
  const [data, setdata] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a euismod lectus. Integer in varius mi. Etiam vel urna placerat, auctor ipsum eget, dignissim justo. Maecenas ultrices vitae purus sed rutrum. Mauris lobortis nisi vel quam rhoncus sagittis. Maecenas laoreet sollicitudin molestie. Nullam ligula erat, varius id elementum quis, imperdiet faucibus sem. Vivamus porta justo quis mi suscipit feugiat. Proin porta ipsum quis urna tempus pretium. Nam hendrerit sem vitae aliquam iaculis. Proin aliquet vestibulum hendrerit.Curabitur placerat semper purus, quis porta enim tincidunt tempus. Aliquam facilisis ante a dolor pharetra maximus. Integer eget nisl sit amet magna dapibus porttitor. Vestibulum condimentum mauris augue, quis aliquet nulla iaculis eu. Proin laoreet sem ac quam porttitor, quis pharetra lorem accumsan. Proin volutpat, mauris sed rhoncus ornare, dolor lectus faucibus ante, a cursus nulla tellus a dui. In et nisi mattis, interdum ipsum ut, venenatis magna. Aliquam vehicula tellus sit amet lacinia maximus. Sed eleifend augue in nisi vulputate porttitor. Fusce at gravida eros. Aenean rhoncus ex sit amet porttitor posuere. Nam tellus lacus, commodo et diam a, varius pulvinar est. Vivamus vehicula elementum dapibus. Sed congue, leo et vestibulum dignissim, nunc urna pulvinar massa, sed lacinia purus leo quis sapien. Pellentesque ligula nulla, tempor at ex id, mollis euismod tortor. Sed in nibh vitae sapien auctor interdum id sed lorem. In mauris sapien, fermentum a aliquet at, condimentum vitae erat. Phasellus sit amet justo mauris. Maecenas aliquam, dolor et fringilla rhoncus, ex metus efficitur nisi, non mattis est augue consectetur nulla. Morbi vulputate mi justo. Mauris tristique quam non erat blandit tincidunt. Nam egestas dapibus ex, vitae venenatis arcu cursus nec. Sed condimentum semper porttitor. Morbi porta viverra maximus. Fusce lacinia lectus nec aliquet elementum. Nulla facilisi. Donec elementum leo quis porta aliquet. In sit amet volutpat lacus, eget posuere nibh. Nunc dignissim vehicula nunc. Morbi elit lorem, luctus et odio interdum, interdum pharetra massa. Nulla quis velit volutpat, vestibulum arcu ut, condimentum nulla. Morbi bibendum accumsan pellentesque. Vestibulum blandit dolor non nisl posuere egestas. Phasellus volutpat mi ac felis consectetur varius. Quisque non tempus ex. Aenean interdum porta metus a rhoncus. Sed eu iaculis leo. Suspendisse malesuada suscipit nibh vitae varius. In porta risus et arcu ultrices gravida. Phasellus sit amet lorem nulla Morbi imperdiet ex at est dapibus, eget egestas leo pulvinar. Nulla venenatis molestie sollicitudin. Aliquam quis nisl a tortor blandit volutpat. Phasellus vitae nibh ligula. Quisque interdum sem eget magna ullamcorper congue. Phasellus pulvinar velit non orci feugiat, in porttitor turpis viverra. Pellentesque sagittis feugiat justo sed placerat. Mauris et mollis nibh. Nulla sollicitudin vel mauris et rutrum. Praesent malesuada quam eu est ultrices imperdiet. Nam eros purus, sollicitudin eu dui non, mollis gravida nibh. Morbi et pulvinar mi. Donec aliquet sem libero, ac dictum lectus lacinia vel. Mauris mollis nulla ut semper congue. Phasellus porttitor pretium accumsan."
  );
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
        <Spinner color="blue" />
      </View>
      <View style={styles.dataview}>
        <Text style={styles.datatext}>{data}</Text>
      </View>
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
