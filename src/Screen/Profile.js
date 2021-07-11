import React, { useRef, useEffect } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  Text,
  Platform,
  Button,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../assets/colors/colors";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialIcons";
import Reviews from "../Component/Pagedetails/Reviews";
import Detailsmore from "../Component/Pagedetails/Detailsmore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import Favourite from "../Component/ProfilePage/Favourite";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Places from "../Component/Pagedetails/Places";

import ReviewsProfile from "../Component/ProfilePage/ReviewsProfile";
import { getToken } from "../globalFunction/getToken";
import { set } from "react-native-reanimated";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 250;
const Tab = createMaterialTopTabNavigator();

export default function Profile({ navigation, route }) {
  const [userData, setuserData] = React.useState("");
  const [reviewPlaces, setreviewPlaces] = React.useState([]);
  const [favPlaces, setfavPlaces] = React.useState([]);
  const [vistedPlaces, setvistedPlaces] = React.useState([]);

  const navTitleView = useRef(null);
  const serverpoint = require("../config");
  async function fetchReviewsPlaces(id) {
    axios
      .post(serverpoint.servername + "/fetchUserReview", {
        userId: id,
      })
      .then(res => {
        setreviewPlaces(res.data);
      });
  }
  async function fetchFavPlaces(id) {
    axios
      .post(serverpoint.servername + "/fetchUserFavplaces", {
        userId: id,
      })
      .then(res => {
        setfavPlaces(res.data);
      });
  }
  async function fetchVistedPlaces(id) {
    axios
      .post(serverpoint.servername + "/fetchUserVistedplaces", {
        userId: id,
      })
      .then(res => {
        setvistedPlaces(res.data);
      });
  }

  const ReviewComp = () => (
    <Places reviewPlaces={reviewPlaces} navigation={navigation} />
  );

  const FavComp = () => (
    <Places reviewPlaces={favPlaces} navigation={navigation} />
  );
  const VisitComp = () => (
    <Places reviewPlaces={vistedPlaces} navigation={navigation} />
  );
  async function fetchUserData() {
    var obje = await getToken("travelapp");
    let data = JSON.parse(obje);
    fetchReviewsPlaces(data._id);
    fetchFavPlaces(data._id);
    fetchVistedPlaces(data._id);
    setuserData(data);
  }

  useEffect(() => {
    fetchUserData();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        headerImage={{
          uri: "https://image.freepik.com/free-photo/beautiful-scenery-green-valley-near-alp-mountains-austria-cloudy-sky_181624-6979.jpg",
        }}
        renderForeground={() => (
          <View>
            <View style={styles.navTitleView}>
              <View style={{ width: "10%" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={24} color={Colors.white} />
                </TouchableOpacity>
              </View>

              <View style={{ width: "80%" }}></View>

              <View style={{ width: "20%" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings")}
                >
                  <Icon name="settings" size={24} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewForeground}>
              <View style={styles.viewName}>
                {userData != "" ? (
                  <>
                    <Image
                      source={{
                        uri: userData.img,
                      }}
                      style={styles.imgAvtr}
                    />
                  </>
                ) : null}

                <Text style={styles.textName}>
                  {userData != "" ? <>{userData.fname}</> : null}
                </Text>
              </View>
            </View>
          </View>
        )}
        renderFixedForeground={() => (
          <Animated.View style={styles.navTitleView} ref={navTitleView}>
            {/* <Text style={styles.navTitle}>New</Text> */}
          </Animated.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          // onHide={() => navTitleView.current.fadeInUp(200)}
          // onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View style={styles.viewTabs}>
            <Tab.Navigator>
              <Tab.Screen name="Places" component={VisitComp} />
              <Tab.Screen name="Favourite" component={FavComp} />
              <Tab.Screen name="Reviews" component={ReviewComp} />
            </Tab.Navigator>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: h,
    width: w,
  },
  imageBack: {
    height: 0.4 * h,
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 0,
    alignItems: "center",
  },
  viewName: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 0.1 * h,
  },
  imgAvtr: {
    width: 70,
    borderRadius: 20,
    height: 70,
  },
  textName: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 20,
  },
  viewBody: {
    backgroundColor: "#FFF",
    marginTop: -50,
    borderRadius: 15,
    // flex: 1,
    // alignItems: "center",
  },
  viewTabs: {
    marginVertical: 5,
    backgroundColor: "black",
    // marginHorizontal: 15,
  },
  viewForeground: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  navTitleView: {
    height: MIN_HEIGHT,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    marginHorizontal: 10,
    opacity: 1,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  section: {
    // padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
});
