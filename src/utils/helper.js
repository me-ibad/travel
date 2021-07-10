import { AsyncStorage } from "react-native";

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
