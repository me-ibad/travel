import React, { useState, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Profile from "../Screen/Profile";
import Chat, { Maps } from "../Screen/Maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon2 from "@expo/vector-icons/Entypo";
import { Home } from "../Screen/Home";
import Signin from "../Screen/Signin";
import Signup from "../Screen/Signup";
import Test from "../Screen/Test";

import Test1 from "../Screen/Test1";

import Details from "../Screen/Details";
import Searchpage from "../Screen/Searchpage";
import { AsyncStorage } from "react-native";
import Detailsmore from "../Component/Pagedetails/Detailsmore";
import Reviews from "../Component/Pagedetails/Reviews";
import Recommendation from "../Screen/Recommendation";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#694fad" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <Icon2 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4CCDFB",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Test} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const AppNavigator = () => {
  const [myid, setmyid] = useState("");

  const [start, setstart] = useState(false);
  const gettoken = async key => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);

      if (item != null) {
        setmyid(retrievedItem);

        setstart(true);

        return retrievedItem;
      } else {
        setmyid("");
        ////alert(myid);
        setstart(true);
        return "";
      }
    } catch (error) {
      console.log(error.message);
    }

    return;
  };

  useEffect(() => {
    gettoken("travelapp");
  }, []);

  if (!start) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Test1" component={Test1} /> */}
        {myid == "" ? (
          <>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Test" component={Test} />
            <Tab.Screen name="Maps" component={Maps} />

            <Stack.Screen name="Recommendation" component={Recommendation} />
            <Stack.Screen name="Search" component={Searchpage} />
            <Stack.Screen name="Details" component={Details} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Recommendation" component={Recommendation} />
            <Stack.Screen name="Search" component={Searchpage} />

            <Tab.Screen name="Maps" component={Maps} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Test" component={Test} />

            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Details" component={Details} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
