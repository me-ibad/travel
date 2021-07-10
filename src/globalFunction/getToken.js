import { AsyncStorage } from "react-native";

export const getToken = async (key) => {
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

export const getTokenIntrests = async (key) => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);

    if (item != null) {
      return item;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error.message);
  }
  return;
};

export const removetoken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (exception) {
    return false;
  }
};
