import React from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Text,
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
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const Tab = createMaterialTopTabNavigator();
export default function Profile() {
  return (
    <ImageHeaderScrollView
      maxHeight={200}
      minHeight={100}
      headerImage={{
        uri: "https://image.freepik.com/free-photo/beautiful-scenery-green-valley-near-alp-mountains-austria-cloudy-sky_181624-6979.jpg",
      }}
      renderForeground={() => (
        <View
          style={{
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => console.log("tap!!")}>
            <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={{ height: 1000 }}>
        <TriggeringView onHide={() => console.log("text hidden")}>
          <Text>Scroll Me!</Text>
        </TriggeringView>
      </View>
    </ImageHeaderScrollView>

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
    //   <View style={styles.viewBody}>
    //     <View style={styles.viewTabs}>
    //       <Tab.Navigator>
    //         <Tab.Screen name="Places" component={Favourite} />
    //         <Tab.Screen name="Reviews" component={Favourite} />
    //         <Tab.Screen name="New" component={Favourite} />
    //       </Tab.Navigator>
    //     </View>
    //   </View>
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
    color: COLORS.black,
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
    marginVertical: 10,
    marginHorizontal: 15,
  },
});
