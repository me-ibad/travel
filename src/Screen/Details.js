import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
  ScrollView,
  View,
  Text,
  Touchable,
} from "react-native";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialIcons";
import COLORS from "../assets/colors/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "./Profile";
import Signin from "./Signin";
import Detailsmore from "../Component/Pagedetails/Detailsmore";
const serverpoint = require("../config");
import Reviews from "../Component/Pagedetails/Reviews";
import Placepics from "../Component/Pagedetails/Placepics";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removetoken } from "../globalFunction/getToken";

import { Maps } from "../Screen/Maps";
var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
const BANNER_H = 270;
const TOPNAVI_H = 50;
const Tab = createMaterialTopTabNavigator();

export default function Details({ navigation, route }) {
  const { placedata } = route.params;
  console.log(placedata);
  const [avvgRating, setavvgRating] = React.useState("");
  const scrollA = useRef(new Animated.Value(0)).current;
  const YourComponent = () => <Reviews placeid={placedata} />;

  async function checkReviews() {
    axios
      .post(serverpoint.servername + "/fetchReviews", {
        latitude: placedata.latitude,
        longitude: placedata.longitude,
      })
      .then(res => {
        // alert(res.data)
        setavvgRating(res.data[0].averagerating);
      });
  }
  useEffect(() => {
    checkReviews();
  }, []);

  function switchToMap() {
    let checklat = placedata.latitude.toString();

    let lastWord = checklat.substring(checklat.length - 3, checklat.length);

    if (lastWord == "lat") {
      alert("no location");
    } else {
      navigation.navigate("Maps", { placedata: placedata });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="black" />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={style.bannerContainer}>
          <AnimatedImage
            style={style.banner(scrollA)}
            source={{
              uri: placedata.pic1,
            }}
          >
            <View style={style.header}>
              <Icon
                name="arrow-back"
                size={28}
                color={COLORS.black}
                onPress={() => navigation.navigate("Home")}
              />
              <Icon name="more-vert" size={28} color={COLORS.black} />
            </View>
            <View style={style.imageDetails}>
              <Text
                style={{
                  width: "70%",
                  fontSize: 30,
                  fontWeight: "bold",
                  color: COLORS.white,
                  marginBottom: 20,
                }}
              ></Text>
              <View style={{ flexDirection: "row" }}>
                <Icon name="star" size={30} color={COLORS.yellow} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {avvgRating.toString().substring(0, 3)}
                </Text>
              </View>
            </View>
          </AnimatedImage>
        </View>
        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <TouchableOpacity onPress={() => switchToMap()}>
              <FontAwesome5 name="route" color={COLORS.dark} size={30} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10, flux: 0.8 }}>
            <Icon name="place" size={28} color={COLORS.primary} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              {placedata.title}
            </Text>
          </View>

          {/* <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
            About the trip
          </Text> */}
        </View>
        <Tab.Navigator>
          <Tab.Screen
            name="Details"
            component={() => <Detailsmore placeid={placedata} />}
          />
          <Tab.Screen name="Reviews" component={YourComponent} />
          {/* component={Reviews}
          /> */}
          {/* <Tab.Screen name="Pictures" component={Placepics} /> */}
        </Tab.Navigator>
        {/* <View style={style.footer}>
  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
    <Text
      style={{
        fontSize: 18,o
        fontWeight: 'bold',
        color: COLORS.white,
      }}>
      $100
    </Text>
    <Text
      style={{
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.grey,
        marginLeft: 2,
      }}>
      /PER DAY
    </Text>
  </View>
  <View style={style.bookNowBtn}>
    <Text
      style={{color: COLORS.primary, fontSize: 16, fontWeight: 'bold'}}>
      Book Now
    </Text>
  </View>
</View> */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: scrollA => ({
    height: BANNER_H,
    // flex: 0.5,
    width: "100%",
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});
