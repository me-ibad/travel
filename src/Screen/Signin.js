import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { useScreens } from "react-native-screens";

import { getToken } from "../globalFunction/getToken";
import { storetoken } from "../utils/helper";

//  import * as Animatable from 'react-native-animatable';

export default function Signin({ navigation }) {
  const serverpoint = require("../config");

  const [username, setusername] = useState("");
  const [usernameerror, setusernameerror] = useState("");
  const [pass, setpass] = useState("");
  const [passerror, setpasserror] = useState("");
  const validusername = () => {
    if (!username != "") {
      return false;
    }

    return true;
  };
  const validpass = () => {
    if (!pass != "" || pass.length < 5) {
      return false;
    }

    return true;
  };

  async function facebooklogIn() {
    let interests = await getToken("interests");
    try {
      await Facebook.initializeAsync("1667224953462264");
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        /// Alert.alert('Logged in!', `Hi ${(await response.json())}!`);
        const finalresponse = await response.json();
        console.log(finalresponse);
        axios
          .post(serverpoint.servername + "/social/signupfacebook", {
            fid: finalresponse.id,
            name: finalresponse.name,
          })
          .then((res) => {
            // alert(res.data)
            // console.log(res.data)
            storetoken("travelapp", res.data);
            console.log("res.data", res.data);

            if (!res.data.userInterests.length) {
              navigation.navigate("Recommendation");
            } else {
              navigation.navigate("Home");
            }
          });
        ////  alert(final.id)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function googlelogin() {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId:
        "1058542661103-stjukh4vl9m06be8m6m7l0g8ihsv9gch.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(serverpoint.servername + "/social/signupgoogle");
      axios
        .post(serverpoint.servername + "/social/signupgoogle", {
          email: user.email,
          name: user.name,
          gid: user.id,
          img: user.photoUrl,
        })
        .then((res) => {
          storetoken("travelapp", res.data);
          console.log("res.data in google sign in", res.data);

          if (!res.data.userInterests.length) {
            navigation.navigate("Recommendation");
          } else {
            navigation.navigate("Home");
          }
        });
    }
  }

  async function logininnow() {
    let interests = await getToken("interests");
    // var obje=await gettoken("travelapp");
    // alert(JSON.parse(obje).fname)

    if (validusername()) {
      setusernameerror("");
    } else {
      setusernameerror("Please enter Username (at least have 5 digit)");
    }

    if (validpass()) {
      setpasserror("");
    } else {
      setpasserror("Please enter valid Pass(at least have 5 digit)");
    }

    if (validpass() && validusername()) {
      axios
        .post(serverpoint.servername + "/usersemail/signinemail", {
          email: username,
          pass: pass,
        })
        .then((res) => {
          if (res.data != "fail") {
            storetoken("travelapp", res.data[0]);
            console.log(res.data[0]);
            if (!res.data[0].userInterests.length) {
              navigation.navigate("Recommendation");
            } else {
              navigation.navigate("Home");
            }
          } else {
            alert("user not exist");
          }
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <Image
        style={styles.logoimg}
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
      />

      <Text style={styles.textheader}>Welcome Back! </Text>
      <Text style={styles.textsubheader}>Sign in to continue</Text>

      <TextInput
        style={styles.inputstyl}
        placeholder="Username"
        placeholderTextColor="black"
        onChangeText={setusername}
      />
      <Text style={{ color: "red" }}>{usernameerror}</Text>
      <TextInput
        style={styles.inputstyl}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={setpass}
      />

      <Text style={{ color: "red" }}>{passerror}</Text>

      <View style={styles.viewbuttons}>
        <TouchableOpacity
          style={styles.buttonsign}
          onPress={() => logininnow()}
        >
          <Text style={styles.textsign}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={{ marginTop: 20 }}>skip</Text>
        </TouchableOpacity>
        <View style={styles.viewscoialbtn}>
          <TouchableOpacity onPress={facebooklogIn}>
            <View style={styles.viewfacebook}>
              <Text style={styles.socialtext}>f</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={googlelogin}>
            <View style={styles.viewgoogle}>
              <Text style={styles.socialtext}>G</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", marginVertical: 50, marginTop: 15 }}
        >
          <Text style={{ color: "black" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontWeight: "bold" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  logoimg: {
    width: "100%",
    height: 200,
  },
  textheader: {
    fontSize: 25,
    color: "black",
    marginTop: 10,
  },
  textsubheader: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  inputstyl: {
    marginTop: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  viewbuttons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonsign: {
    width: 200,
    backgroundColor: "#0d47a1",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
  },
  textsign: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
  viewscoialbtn: {
    flexDirection: "row",
    marginTop: 20,
  },
  viewfacebook: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#3f51b5",
    alignItems: "center",
    justifyContent: "center",
  },
  socialtext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  viewgoogle: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#f44336",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
