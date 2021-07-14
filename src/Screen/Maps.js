import React, { useState, useEffect } from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  AnimatedRegion,
} from "react-native-maps";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import config from "../config";
import { getCurrentLocation } from "../utils/helper";
import Animated from "react-native-reanimated";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 220;
const CARD_WIDTH = screen.width * 0.8;

export default function Maps({ navigation, route }) {
  const mapRef = React.useRef();
  const markerRef = React.useRef();

  const { placedata = {} } = route.params ?? {};
  var mylat = 0;
  var mylong = 0;
  if (typeof placedata == "undefined") {
  } else {
    mylat = placedata.latitude;
    mylong = placedata.longitude;
  }
  const serverpoint = require("../config");
  const [location, setLocation] = useState(null);

  const [coordinate, setCoordinate] = React.useState(
    new AnimatedRegion({
      latitude: mylat,
      longitude: mylong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  );

  const [lat, setlat] = useState(mylat);
  const [long, setlong] = useState(mylong);
  const [distance, setdistance] = useState("");
  const [time, settime] = useState("");

  const [alllocations, setalllocations] = useState([]);

  const destination = {
    latitude: placedata.latitude,
    longitude: placedata.longitude,
  };
  const GOOGLE_MAPS_APIKEY = config.mapapi;

  useEffect(() => {
    getCurrentLocation(location => {
      animate(location.coords.latitude, location.coords.longitude);
      setlat(location.coords.latitude);
      setlong(location.coords.longitude);
      setCoordinate(
        new AnimatedRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
      );
    });
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const origin = React.useMemo(() => {
    return {
      latitude: lat,
      longitude: long,
    };
  }, [lat, long]);

  const getMylocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setlat(location.coords.latitude);

    setlong(location.coords.longitude);
  };

  console.log("origin", origin);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation(location => {
        animate(location.coords.latitude, location.coords.longitude);
        setlat(location.coords.latitude);
        setlong(location.coords.longitude);
        setCoordinate(
          new AnimatedRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
        );
      });
    }, 6000);
    return () => clearInterval(interval);
  });

  const onCenterToMap = () => {
    mapRef.current.animateToRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  console.log("coordinate", coordinate);

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
        ref={mapRef}
      >
        <Marker.Animated
          coordinate={coordinate}
          image={require("../assets/images/Oval.png")}
          pinColor="green"
          title="Test Title"
          description="This is the test description"
          ref={markerRef}
        ></Marker.Animated>

        <Marker
          coordinate={destination}
          image={require("../assets/images/greenMarker.png")}
          pinColor="green"
          title="Test Title"
          description="This is the test description"
        ></Marker>
        <MapViewDirections
          origin={origin ?? {}}
          destination={destination ?? {}}
          apikey={GOOGLE_MAPS_APIKEY}
          lineCap="round"
          strokeWidth={5}
          strokeColor="blue"
          lineDashPattern={[0]}
          lineJoin="round"
          onReady={result => {
            setdistance(result.distance);
            settime(result.duration);

            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                // right: 30,
                // bottom: 300,
                // left: 30,
                // top: 100,
              },
            });
          }}
        />
      </MapView>
      <TouchableOpacity style={styles.viewCurrent} onPress={onCenterToMap}>
        <FontAwesome name="location-arrow" size={24} color="black" />
      </TouchableOpacity>
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
      <LinearGradient
        // Button Linear Gradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.viewMapbar}
      >
        <View style={styles.viewBarheader}>
          <View style={{ width: "25%" }}>
            <Text style={styles.textBarheader}>Origin</Text>
          </View>

          <View style={{ width: "75%", flexDirection: "row" }}>
            <AntDesign
              style={styles.iconBarheader}
              name="arrowright"
              size={24}
              color="white"
            />
            <Text style={styles.textBarheader}>{placedata.title}</Text>
          </View>
        </View>
        {/* total distance */}
        <View style={styles.viewBarbody}>
          <View style={styles.viewTdistance}>
            <AntDesign name="car" size={20} color="black" />

            <Text style={styles.textTdistance}>{Math.trunc(distance)} Km</Text>
          </View>
          {/* remainng time */}
          <View style={styles.viewTdistance}>
            <Ionicons name="timer" size={20} color="black" />

            <Text style={styles.textTdistance}>{Math.trunc(time)} Min</Text>
          </View>

          {/* remainng distance */}

          <View style={styles.viewTdistance}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={20}
              color="black"
            />

            <Text style={styles.textTdistance}>{Math.trunc(distance)} Km</Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 40,
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
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
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
  viewCurrent: {
    backgroundColor: "white",
    width: 40,
    padding: 8,
    elevation: 5,
    height: 40,
    position: "absolute",
    right: 20,
    bottom: 200,
    borderRadius: 20,
  },
  viewMapbar: {
    position: "absolute",
    padding: 30,
    bottom: 10,
    backgroundColor: "white",
    elevation: 2,
    marginHorizontal: 10,

    borderRadius: 10,
    height: "22%",
    width: "94%",
  },
  viewBarheader: {
    flexDirection: "row",
    marginVertical: 10,
  },
  textBarheader: {
    fontSize: 20,
    // flex: 1,
    // width:"100%",
    color: "white",
    fontWeight: "bold",
  },
  iconBarheader: {
    marginHorizontal: 10,
    marginTop: 3,
  },
  viewBarbody: {
    marginVertical: 10,
    // marginHorizontal: 5,
    flexDirection: "row",
  },
  viewTdistance: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    marginEnd: 6,
  },
  textTdistance: {
    marginHorizontal: 3,
  },
});
