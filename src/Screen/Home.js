import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
  StatusBar,
} from "react-native";
import { AsyncStorage } from "react-native";
import colors from "../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialIcons";
import { getToken } from "../globalFunction/getToken";
import { removetoken } from "../globalFunction/getToken";
import { getCurrentLocation } from "../utils/helper";
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

    getCurrentLocation(async location => {
      let res = await axios.post(serverpoint.servername + "/getLocations", {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        interests: userData.userInterests.map(value => value.name),
      });

      setNearByLocation(res.data);
    });
  }

  async function getDiscoverLocation() {
    var obje = await getToken("travelapp");
    const userData = JSON.parse(obje);

    getCurrentLocation(async location => {
      let res = await axios.post(
        serverpoint.servername + "/getDiscoverLocation",
        {
          lat: location.coords.latitude,
          long: location.coords.longitude,
          interests: userData.userInterests.map(value => value.name),
        }
      );

      setDiscoverLocation(res.data);
    });
  }
  const gettoken = async key => {
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
          <View style={styles.viewCardfooter}>
            {/* <Text style={styles.discoverItemTitle}>{item.title}</Text> */}
            <View style={styles.discoverItemLocationWrapper}>
              <Entypo name="location-pin" size={18} color={colors.white} />
              <Text style={styles.discoverItemLocationText}>{item.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
        <StatusBar barStyle="dark-content" backgroundColor={colors.secondary} />
        <ScrollView>
          <View style={styles.viewHeader}>
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

            <View style={styles.viewHeadername}>
              <View style={{ width: "50%" }}>
                <Text style={styles.textHeadername}>Hi {fname}</Text>
              </View>
              <View style={{ width: "50%", alignItems: "flex-end" }}>
                <Image
                  source={{
                    uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                  }}
                  style={styles.imgHeadername}
                />
              </View>
            </View>
          </View>

          <SafeAreaView>
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                style={styles.inputSearch}
                placeholder="Search place"
                onFocus={() => navigation.navigate("Search")}
              />
            </View>
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

            <View style={styles.discoverItemsWrapper}>
              <FlatList
                data={discoverLocation}
                renderItem={renderDiscoverItem}
                keyExtractor={item => item._id}
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
                keyExtractor={item => item._id}
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
  viewHeader: {
    backgroundColor: colors.secondary,
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },

  viewHeadername: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textHeadername: { fontSize: 28, color: colors.white, fontWeight: "bold" },
  imgHeadername: { height: 60, width: 60, borderRadius: 60 },
  input: { fontWeight: "bold", fontSize: 18, width: 260 },
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
  viewCardfooter: {
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    padding: 5,
    borderRadius: 10,
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
    fontWeight: "bold",
    color: colors.white,
  },
  discoverItemLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  discoverItemLocationText: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    padding: 5,
    borderRadius: 10,
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
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
