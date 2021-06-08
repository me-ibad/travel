import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";
import { Button } from "native-base";
import { AsyncStorage } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Recommendation({ navigation, route }) {
  const [GasStations, setGasStations] = useState(false);
  const [GuestHouses, setGuestHouses] = useState(false);
  const [HistoricalPlaces, setHistoricalPlaces] = useState(false);
  const [Hotels, setHotels] = useState(false);
  const [Museums, setMuseums] = useState(false);
  const [Parks, setParks] = useState(false);
  const [Restaurants, setRestaurants] = useState(false);
  const [ShoppingMalls, setShoppingMalls] = useState(false);
  const [SwimmingPools, setSwimmingPools] = useState(false);
  const [TouristAttraction, setTouristAttraction] = useState(false);

  /// const [interests, setInterests] = React.useState([]);

  const storetoken = async (key, item) => {
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

  const handleClick = () => {
    let interests = [];
    if (GasStations) {
      interests.push("Gas Stations");
    }
    if (GuestHouses) {
      interests.push("Guest Houses");
    }

    if (Hotels) {
      interests.push("Hotels");
    }

    if (Museums) {
      interests.push("Museums");
    }

    if (Parks) {
      interests.push("Parks");
    }

    if (Restaurants) {
      interests.push("Restaurants");
    }

    if (ShoppingMalls) {
      interests.push("Shopping Malls");
    }

    if (SwimmingPools) {
      interests.push("Swimming Pools");
    }

    if (TouristAttraction) {
      interests.push("Tourist Attraction");
    }

    if (HistoricalPlaces) {
      interests.push("Historical Places");
    }

    console.log(interests);

    storetoken("interests", interests);

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: 20, marginTop: 20 }}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={GasStations}
          onValueChange={setGasStations}
          style={styles.checkbox}
        />
        <Text style={styles.label}>GasStations</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={GuestHouses}
          onValueChange={setGuestHouses}
          style={styles.checkbox}
        />
        <Text style={styles.label}>GuestHouse</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={Hotels}
          onValueChange={setHotels}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Hotels</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={HistoricalPlaces}
          onValueChange={setHistoricalPlaces}
          style={styles.checkbox}
        />
        <Text style={styles.label}>HistoricalPlaces</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={Parks}
          onValueChange={setParks}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Parks</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={Museums}
          onValueChange={setMuseums}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Museums</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={Restaurants}
          onValueChange={setRestaurants}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Restaurants</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={ShoppingMalls}
          onValueChange={setShoppingMalls}
          style={styles.checkbox}
        />
        <Text style={styles.label}>ShoppingMalls</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={SwimmingPools}
          onValueChange={setSwimmingPools}
          style={styles.checkbox}
        />
        <Text style={styles.label}>SwimmingPools</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={TouristAttraction}
          onValueChange={setTouristAttraction}
          style={styles.checkbox}
        />
        <Text style={styles.label}>TouristAttraction</Text>
      </View>

      <Button
        onPress={handleClick}
        style={{ marginLeft: 10, paddingHorizontal: 50 }}
      >
        <Text style={{ color: "white" }}>Update</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
