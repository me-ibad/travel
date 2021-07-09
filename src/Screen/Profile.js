import React, { useRef } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  Text,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../assets/colors/colors";
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
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 250;
const Tab = createMaterialTopTabNavigator();

export default function Profile({ navigation }) {
  const navTitleView = useRef(null);

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
          <View style={styles.viewForeground}>
            <View style={styles.viewName}>
              <Image
                source={{
                  uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                }}
                style={styles.imgAvtr}
              />
              <Text style={styles.textName}>Alexio Morales</Text>
            </View>
          </View>
        )}
        renderFixedForeground={() => (
          <Animated.View style={styles.navTitleView} ref={navTitleView}>
            {/* <Text style={styles.navTitle}>New</Text> */}
            <View style={{ width: "10%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>

            <View style={{ width: "80%" }}>
              <Text></Text>
            </View>

            <View style={{ width: "10%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="settings" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
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
              <Tab.Screen name="Places" component={Places} />
              <Tab.Screen name="Favourite" component={Places} />
              <Tab.Screen name="Reviews" component={Reviews} />
            </Tab.Navigator>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </View>

    // <ScrollView style={styles.container}>
    //   <ImageBackground
    //     source={{
    //       uri: "https://image.freepik.com/free-photo/beautiful-scenery-green-valley-near-alp-mountains-austria-cloudy-sky_181624-6979.jpg",
    //     }}
    //     style={styles.imageBack}
    //   >
    //     <View style={styles.viewHeader}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Icon name="arrow-back" size={24} color="black" />
    //       </TouchableOpacity>
    //     </View>
    //     <View style={styles.viewName}>
    //       <Image
    //         source={{
    //           uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    //         }}
    //         style={styles.imgAvtr}
    //       />
    //       <Text style={styles.textName}>Alexio Morales</Text>
    //     </View>
    //   </ImageBackground>
    //
    // </ScrollView>
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
    height: 220,
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
