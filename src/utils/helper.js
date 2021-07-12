import { AsyncStorage } from "react-native";
import * as Location from "expo-location";

export function switchToMap(navigation, placedata) {
  let checklat = placedata.latitude.toString();

  let lastWord = checklat.substring(checklat.length - 3, checklat.length);

  if (lastWord == "lat") {
    alert("no location");
  } else {
    navigation.navigate("Maps", { placedata: placedata });
  }
}

export const storetoken = async (key, item) => {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    console.log("Added in local host");
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCurrentLocation = async (callback) => {
  let location = {};
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Please allow access to Loaction services");
    return;
  }
  try {
    var location1 = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      (newLocation) => {
        console.log("callback is called");

        callback(newLocation);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
