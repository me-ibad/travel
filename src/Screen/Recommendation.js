import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import {} from "react-native-vector-icons";
import { getToken } from "../globalFunction/getToken";
import { storetoken } from "../utils/helper";

export default function Recommendation({ navigation }) {
  const serverpoint = require("../config");

  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      var obje = await getToken("travelapp");
      setUserData(JSON.parse(obje));
      setUserInterests(JSON.parse(obje).userInterests);
    }
    fetchMyAPI();
  }, []);

  const [userInterests, setUserInterests] = React.useState([]);
  const interestsArray = [
    {
      id: 1,
      name: "Gas Stations",
    },
    {
      id: 2,
      name: "Guest Houses",
    },
    {
      id: 3,
      name: "Hotels",
    },
    {
      id: 4,
      name: "Museums",
    },
    {
      id: 5,
      name: "Parks",
    },
    {
      id: 6,
      name: "Restaurants",
    },
    {
      id: 7,
      name: "Shopping Malls",
    },
    {
      id: 8,
      name: "Shopping Malls",
    },
    {
      id: 9,
      name: "Swimming Pools",
    },
    {
      id: 10,
      name: "Tourist Attraction",
    },
    {
      id: 11,
      name: "Historical Places",
    },
  ];

  const submitUserInterests = async () => {
    console.log(serverpoint.servername + "/manageUserInterests");
    axios
      .post(serverpoint.servername + "/manageUserInterests", {
        id: userData._id,
        userInterests,
      })
      .then((res) => {
        // alert(res.data)
        storetoken("travelapp", res.data);
        navigation.navigate("Home");
      });
  };

  const manageInterests = (id, name) => {
    if (userInterests.find((value) => value.id === id)?.id) {
      return setUserInterests(userInterests.filter((value) => value.id !== id));
    }

    setUserInterests([...userInterests, { id: id, name: name }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {interestsArray.map(({ id, name }) => {
          return (
            <TouchableOpacity
              key={id}
              onPress={() => manageInterests(id, name)}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: userInterests.find((item) => item.id === id)
                    ? "skyblue"
                    : "white",
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.container1}>
                  <Text style={styles.paragraph}>{name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "skyblue",
          width: 200,
          height: 50,
          margin: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
        }}
        onPress={submitUserInterests}
      >
        <Text style={{ color: "white" }}>Submit interests</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 8,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
