import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { mapapi } from "../config";
import axios from "axios";
export default function Home({ navigation }) {
  async function getDataFromApi(data) {
    ////  console.log(data);
    console.log("------------formed data");

    let place = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
        data.place_id +
        "&key=" +
        mapapi
    );

    console.log("------------formed data");

    var title = "";

    var lat = place.data.result.geometry.location.lat;
    var long = place.data.result.geometry.location.lng;
    var pic1 = "";

    if (data.hasOwnProperty("name")) {
      title = data.name;

      ///pic1 = "https://www.panpuri.com/asset/images/product/noimg.jpg";
    } else {
      title = data.description;

      /// pic1 = "https://www.panpuri.com/asset/images/product/noimg.jpg";
    }

    var placeobject = {
      _id: "60684ccf45f6d0451cf1rc88",
      title: title,
      latitude: lat,
      longitude: long,
      no: 2424,
      pic1: "https://www.panpuri.com/asset/images/product/noimg.jpg",
      alldata: data,
    };
    console.log(placeobject);
    navigation.navigate("Details", { placedata: placeobject, from: "search" });
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: "AIzaSyAhwDsbb1ky0UUyUXm-YlCDsD7diI83g9U",
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => getDataFromApi(data)}
        onFail={error => console.error(error)}
        // this in only required for use on the web. See https://git.io/JflFv more for details.
        currentLocation={true}
        currentLocationLabel="Current location"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
});
