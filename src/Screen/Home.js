import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
} from "react-native";
import { AsyncStorage } from "react-native";
import * as Location from "expo-location";
import colors from "../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import activitiesData from "../assets/data/activitiesData";
import discoverCategoriesData from "../assets/data/discoverCategoriesData";
import learnMoreData from "../assets/data/learnMoreData";
import discoverData from "../assets/data/discoverData";
import { SafeAreaView } from "react-native-safe-area-context";
import profile from "../assets/images/person.png";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialIcons";
import { getToken } from "../globalFunction/getToken";
import { removetoken } from "../globalFunction/getToken";
Feather.loadFont();
Entypo.loadFont();

export function Home({ navigation }) {
  const [fname, setfname] = useState("");

  const [nearByLocation, setNearByLocation] = useState([]);

  const [discoverLocation, setDiscoverLocation] = useState([]);

  const serverpoint = require("../config");

  async function getlocationbymodel() {
    var obje = await getToken("travelapp");
    const userData = JSON.parse(obje);

    let location = await Location.getCurrentPositionAsync({});

    axios
      .post(serverpoint.servername + "/getLocations", {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        interests: userData.userInterests.map((value) => value.name),
      })
      .then((res) => {
        // alert(res.data)
        ////  console.log(res.data);
        ////alert(res.data);
        setNearByLocation(res.data);
      });
  }

  async function getDiscoverLocation() {
    var obje = await getToken("travelapp");
    const userData = JSON.parse(obje);
    let location = await Location.getCurrentPositionAsync({});

    axios
      .post(serverpoint.servername + "/getDiscoverLocation", {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        interests: userData.userInterests.map((value) => value.name),
      })
      .then((res) => {
        // alert(res.data)
        ////   console.log(res.data);
        ////alert(res.data);
        setDiscoverLocation(res.data);
      });
  }
  const gettoken = async (key) => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);

      if (item != null) {
        return retrievedItem;
      } else {
        return "";
      }
    } catch (error) {
      console.log(error.message);
    }
    return;
  };

  const logOut = async () => {
    removetoken("travelapp");
    navigation.navigate("Signin");
  };

  const changeIntrests = async () => {
    removetoken("interests");
    navigation.navigate("Recommendation");
  };

  const fetchuserdata = async () => {
    var obje = await gettoken("travelapp");
    setfname(JSON.parse(obje).fname);
  };

  React.useEffect(() => {
    fetchuserdata();
    getlocationbymodel();
    getDiscoverLocation();
  }, []);

  const categoryIcons = [
    <Icon name="flight" size={25} color={colors.primary} />,
    <Icon name="beach-access" size={25} color={colors.primary} />,
    <Icon name="near-me" size={25} color={colors.primary} />,
    <Icon name="place" size={25} color={colors.primary} />,
  ];
  const ListCategories = () => {
    return (
      <View style={styles.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={styles.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const renderDiscoverItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", { placedata: item, from: "database" })
        }
      >
        <ImageBackground
          source={{ uri: item.pic1 }}
          style={[
            styles.discoverItem,
            { marginLeft: item.id === "discover-1" ? 20 : 0 },
          ]}
          imageStyle={styles.discoverItemImage}
        >
          <Text style={styles.discoverItemTitle}>{item.title}</Text>
          <View style={styles.discoverItemLocationWrapper}>
            <Entypo name="location-pin" size={18} color={colors.white} />
            <Text style={styles.discoverItemLocationText}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderActivityItem = ({ item }) => {
    return (
      <View
        style={[
          styles.activityItemWrapper,
          {
            marginLeft: item.id === "activities-1" ? 20 : 0,
          },
        ]}
      >
        <Image source={item.image} style={styles.activityItemImage} />
        <Text style={styles.activityItemText}>{item.title}</Text>
      </View>
    );
  };

  const renderLearnMoreItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { placedata: item })}
      >
        <ImageBackground
          source={{ uri: item.pic1 }}
          style={[
            styles.learnMoreItem,
            {
              marginLeft: item._id === "learnMore-1" ? 20 : 0,
            },
          ]}
          imageStyle={styles.learnMoreItemImage}
        >
          <Text style={styles.learnMoreItemText}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#4CCDFB" />
        <ScrollView>
          <View
            style={{
              backgroundColor: "#4CCDFB",
              height: 150,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={() => logOut()}>
              <Feather
                name="log-out"
                size={32}
                color={colors.white}
                style={{
                  marginTop: 30,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                width: "100%",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: "#FFF",
                    fontWeight: "bold",
                  }}
                >
                  Hi {fname}
                </Text>
              </View>
              <View style={{ width: "50%", alignItems: "flex-end" }}>
                <Image
                  source={{
                    uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                  }}
                  style={{ height: 60, width: 60, borderRadius: 60 }}
                />
              </View>
            </View>
          </View>

          <SafeAreaView>
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Search place"
                onFocus={() => navigation.navigate("Search")}
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  width: 260,
                }}
              />
            </View>

            {/* <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:10,
                 
               }}>
                   <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}
                   />
                    <Image
                    // source={require('../images/3.png')}
                    style={{height:20,width:20}}
                   /> 
               </View> 
          
          
          {/* <View style={styles.menuWrapper}>
            <Feather
              name="menu"
              size={32}
              color={colors.black}
              style={styles.menuIcon}
            />
            <Image source={profile} style={styles.profileImage} />
          </View>
          
          */}
          </SafeAreaView>

          {/* Discover */}
          <View style={styles.discoverWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.discoverTitle}>Discover</Text>
              <TouchableOpacity onPress={() => changeIntrests()}>
                <Feather
                  name="filter"
                  size={20}
                  color={colors.dark}
                  style={{
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.discoverCategoriesWrapper}>
              {/* <Text
                style={[styles.discoverCategoryText, { color: colors.orange }]}
              >
                All
              </Text>
              <Text style={styles.discoverCategoryText}>Destinations</Text>
              <Text style={styles.discoverCategoryText}>Cities</Text>
              <Text style={styles.discoverCategoryText}>Experiences</Text> */}
            </View>
            <View style={styles.discoverItemsWrapper}>
              <FlatList
                data={discoverLocation}
                renderItem={renderDiscoverItem}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Activities */}
          <View style={styles.activitiesWrapper}>
            <Text style={styles.activitiesTitle}>Category</Text>

            <ListCategories />
          </View>

          {/* Learn More */}
          <View style={styles.learnMoreWrapper}>
            <Text style={styles.learnMoreTitle}>Near by</Text>
            <View style={styles.learnMoreItemsWrapper}>
              <FlatList
                data={nearByLocation}
                renderItem={renderLearnMoreItem}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
  },
  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  discoverWrapper: {
    marginVertical: 10,
    marginTop: 10,
  },
  discoverTitle: {
    marginHorizontal: 20,
    color: "black",

    fontSize: 32,
  },
  discoverCategoriesWrapper: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 20,
  },
  discoverCategoryText: {
    marginRight: 30,

    fontSize: 16,
    color: colors.gray,
  },
  discoverItemsWrapper: {
    paddingVertical: 20,
    marginLeft: 20,
  },
  discoverItem: {
    width: 170,
    height: 250,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
    marginLeft: 10,
  },
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    fontSize: 18,
    color: colors.white,
  },
  discoverItemLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  discoverItemLocationText: {
    marginLeft: 5,

    fontSize: 14,
    color: colors.white,
  },
  activitiesWrapper: {
    marginTop: 10,
  },
  activitiesTitle: {
    marginHorizontal: 20,

    fontSize: 24,
    color: colors.black,
  },
  activitiesItemsWrapper: {
    paddingVertical: 20,
  },
  activityItemWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
  },
  activityItemImage: {
    width: 36,
  },
  activityItemText: {
    marginTop: 5,

    fontSize: 14,
    color: colors.gray,
  },
  learnMoreWrapper: {
    marginTop: 10,
  },
  learnMoreTitle: {
    marginHorizontal: 20,

    fontSize: 24,
    color: colors.black,
  },
  learnMoreItemsWrapper: {
    paddingVertical: 20,
    marginLeft: 20,
  },
  learnMoreItem: {
    width: 170,
    height: 180,
    justifyContent: "flex-end",
    marginRight: 20,
  },
  learnMoreItemImage: {
    borderRadius: 20,
  },
  learnMoreItemText: {
    fontSize: 18,
    color: colors.white,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  inputContainer: {
    paddingHorizontal: 20,

    height: 60,
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 10,
    // position: 'absolute',
    marginLeft: 20,
    top: -20,
    flexDirection: "row",

    alignItems: "center",
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
