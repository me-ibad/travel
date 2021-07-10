import React, { useState, useEffect } from "react";
import MapViewDirections from "react-native-maps-directions";

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  View,
  Dimensions,
  StatusBar,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Iconui from "@expo/vector-icons/MaterialCommunityIcons";
import { Rating, AirbnbRating } from "react-native-ratings";
import * as Location from "expo-location";
import config from "../config";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

export default function Maps({ navigation, route }) {
  const { placedata } = route.params ?? {};
  var mylat = 0;
  var mylong = 0;
  if (typeof placedata == "undefined") {
  } else {
    mylat = placedata.latitude;
    mylong = placedata.longitude;
  }
  const serverpoint = require("../config");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [lat, setlat] = useState(mylat);
  const [long, setlong] = useState(mylong);

  const [alllocations, setalllocations] = useState([]);

  const origin = { latitude: lat, longitude: long };
  const destination = {
    latitude: placedata.latitude,
    longitude: placedata.longitude,
  };
  const GOOGLE_MAPS_APIKEY = config.mapapi;
  //const GOOGLE_MAPS_APIKEY = "";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // const response = await fetch(serverpoint + "/api/getLocations", {
      //   method: "post",
      //   headers: {
      //     "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      //   },
      //   body: `lat=${location.coords.latitude}&long=${location.coords.longitude}`,
      // });
      // const json = await response.json();

      // setalllocations(json);
      // console.warn(json);
      // setLocation(location);
      // setlat(json[0].latitude);
      // setlong(json[0].longitude);
      setlat(location.coords.latitude);

      setlong(location.coords.longitude);
    })();
  }, []);

  // const liveLongAndLat=React.useMemo(()=>{
  //   let location = await Location.getCurrentPositionAsync({});
  //   return {
  //     latitude:location.coords.latitude,
  //     longitude:location.coords.longitude
  //   }
  // },[])

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const getMapRegion = () => ({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={getMapRegion()}
      >
        <Marker coordinate={origin ?? {}} />
        <Marker coordinate={destination ?? {}} />
        <MapViewDirections
          origin={origin ?? {}}
          destination={destination ?? {}}
          apikey={GOOGLE_MAPS_APIKEY}
          lineCap="round"
          strokeWidth={5}
          strokeColor="blue"
          lineDashPattern={[0]}
        />
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          onFocus={() => navigation.navigate("Search")}
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Icon name="ios-search" size={20} />
      </View>

      {/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        <TouchableOpacity style={styles.chipsItem}>
          <FontAwesome name="hotel" size={24} color="black" />
          <Text> Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chipsItem}>
          <AntDesign name="rest" size={24} color="black" />
          <Text> Restaurants</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chipsItem}>
          <FontAwesome5 name="place-of-worship" size={24} color="black" />
          <Text> Historical</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={500}
        style={styles.chipsScrollView1}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../assets/images/beach.png")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                Kalar Khar Lake
              </Text>
            </View>
            <Iconui name="map-marker" size={25} color="#ff5c83" />
          </View>
          <Rating size={2} imageSize={16} startingValue={4.3} />
        </View>

        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../assets/images/beach.png")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                Honza Vally
              </Text>
            </View>
            <Iconui name="map-marker" size={25} color="#5facdb" />
          </View>

          <Rating size={2} imageSize={16} startingValue={3.3} />
        </View>

        <View
          style={{
            backgroundColor: "#FEFEFE",
            height: 200,
            width: 190,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <Image
            source={require("../assets/images/beach.png")}
            style={{ width: 180, borderRadius: 10, height: 130 }}
          />
          <View
            style={{
              flexDirection: "row",
              width: 150,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#a2a2db",
                }}
              >
                Lorem impsum dolor sit amet, consectetuer adipscing elit,
              </Text>
            </View>
            <Iconui name="map-marker" size={25} color="#bb32fe" />
          </View>
        </View>
      </ScrollView> */}
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },

  chipsScrollView1: {
    position: "absolute",
    top: Platform.OS === "ios" ? 400 : 450,
    paddingHorizontal: 10,
  },

  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
