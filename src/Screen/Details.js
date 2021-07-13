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
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialIcons";
import COLORS from "../assets/colors/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Detailsmore from "../Component/Pagedetails/Detailsmore";
const serverpoint = require("../config");
import Reviews from "../Component/Pagedetails/Reviews";
import Placepics from "../Component/Pagedetails/Placepics";
import { FontAwesome5 } from "@expo/vector-icons";

import { getToken } from "../globalFunction/getToken";
import { switchToMap } from "../utils/helper";
import navigationService from "../globalFunction/NavigationService";
var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
const BANNER_H = 270;
const TOPNAVI_H = 50;
const Tab = createMaterialTopTabNavigator();

export default function Details({ navigation, route }) {
  const { placedata } = route.params;
  const [avvgRating, setavvgRating] = React.useState("");
  const scrollA = useRef(new Animated.Value(0)).current;

  const ReviewsComp = () => <Reviews placeid={placedata} />;
  const DetailsmoreComp = () => <Detailsmore placeid={placedata} />;

  function checkReviews() {
    axios
      .post(serverpoint.servername + "/fetchReviews", {
        latitude: placedata.latitude,
        longitude: placedata.longitude,
      })
      .then((res) => {
        console.log("response", res.data);
        // alert(res.data)
        setavvgRating(res.data[0]?.averagerating);
      });
  }
  useEffect(() => {
    checkReviews();
  }, []);

  async function likeIt() {
    var userdata = await getToken("travelapp");
    axios.post(serverpoint.servername + "/postLikedplaces", {
      uploderid: JSON.parse(userdata)._id,
      latitude: placedata.latitude,
      longitude: placedata.longitude,
    });
  }
  async function switchToMap() {
    var userdata = await getToken("travelapp");

    axios.post(serverpoint.servername + "/postVisitedplaces", {
      uploderid: JSON.parse(userdata)._id,
      latitude: placedata.latitude,
      longitude: placedata.longitude,
    });
    navigation.navigate("Maps", { placedata: placedata });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="black" />
      <Animated.ScrollView
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
              <View style={style.viewRatings}>
                <Icon name="star" size={25} color={COLORS.yellow} />
                <Text style={style.textRatings}>
                  {avvgRating?.toString().substring(0, 3)}
                </Text>
              </View>
            </View>
          </AnimatedImage>
        </View>
        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <TouchableOpacity onPress={() => likeIt(navigation, placedata)}>
              {/* <FontAwesome5 name="gratipay" color={COLORS.dark} size={30} /> */}
              <FontAwesome5 name="gratipay" color="red" size={30} />
            </TouchableOpacity>
          </View>

          <View style={style.viewTitle}>
            <Icon name="place" size={28} color={COLORS.primary} />
            <Text style={style.textTitle}>{placedata.title}</Text>
          </View>

          <TouchableOpacity
            style={style.bookNowBtn}
            onPress={() => switchToMap(navigation, placedata)}
          >
            <FontAwesome5 name="route" color={COLORS.white} size={15} />
            <Text style={style.textDirecrtion}>Direction</Text>
          </TouchableOpacity>
        </View>
        <Tab.Navigator>
          <Tab.Screen name="Details" component={DetailsmoreComp} />
          <Tab.Screen name="Reviews" component={ReviewsComp} />
          <Tab.Screen name="Pictures">
            {(props) => <Placepics {...props} placedata={placedata} />}
          </Tab.Screen>
        </Tab.Navigator>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    elevation: 2,
    marginTop: 10,
    width: 150,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
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
  iconContainer1: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -100,
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
    paddingVertical: 10,
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
  viewRatings: {
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    padding: 5,
    borderRadius: 10,
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

  viewTitle: {
    flexDirection: "row",
    marginTop: 10,
    flex: 0.8,
  },

  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  textTitle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  textDirecrtion: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "bold",
  },
  textRatings: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },

  banner: (scrollA) => ({
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
