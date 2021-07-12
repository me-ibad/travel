import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
const w = Dimensions.get("window").width;
import axios from "axios";
const h = Dimensions.get("window").height;
import { getToken } from "../globalFunction/getToken";
import * as ImagePicker from "expo-image-picker";
import Navbar from "../Component/Navbar/Navbar";

import { storetoken } from "../utils/helper";
export default function Settings() {
  const serverpoint = require("../config");
  const [profileImage, setprofileImage] = useState(
    "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
  );

  const [fname, setfname] = useState("");
  const [id, setid] = useState("");
  const [lname, setlname] = useState("");
  const [userName, setuserName] = useState("");
  // const [oldPass, setoldPass] = useState("");
  // const [newPass, setnewPass] = useState("");
  // const [cPass, setcPass] = useState("");

  // const [oldPassInput, setoldPassInput] = useState("");

  async function getLocalData() {
    var obje = await getToken("travelapp");
    let data = JSON.parse(obje);
    setid(data._id);
    setfname(data.fname);
    setprofileImage(data.img);
    setuserName(data.email);
    setlname(data.lname);
  }

  useEffect(() => {
    getLocalData();
  }, []);

  const updateProfile = async () => {
    var obje = await getToken("travelapp");
    let data = JSON.parse(obje);

    data.fname = fname;
    data.lname = lname;
    data.img = profileImage;
    data.email = userName;

    storetoken("travelapp", data);
    axios
      .post(serverpoint.servername + "/usersemail/updateProfile", {
        _id: id,
        fname: fname,
        lname: lname,
        img: profileImage,
        email: userName,
      })
      .then(res => {
        alert(res.data);
      });
  };
  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setprofileImage("data:image/png;base64," + result.base64);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar name="Settings" />
      <ScrollView>
        <View style={styles.viewBody}>
          {profileImage && (
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.imgAvtr}
            />
          )}

          <TouchableOpacity
            onPress={pickImage}
            style={(styles.buttonStyl, styles.buttonUpload)}
          >
            <Text style={styles.buttonTest}>Upload</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="First Name"
            value={fname}
            onChangeText={setfname}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Last Name"
            value={lname}
            onChangeText={setlname}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Username"
            value={userName}
            onChangeText={setuserName}
          />
        </View>
        {/* 
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Old Password"
            secureTextEntry={true}
            onChangeText={setoldPassInput}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={setnewPass}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={setcPass}
          />
        </View> */}

        <TouchableOpacity style={styles.buttonStyl} onPress={updateProfile}>
          <Text style={styles.buttonTest}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: h,
    // minHeight: MIN_HEIGHT,
    width: w,
  },
  viewBody: {
    // marginHorizontal: 10,
    marginVertical: 20,
    padding: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  imgAvtr: {
    width: 70,
    borderRadius: 20,
    height: 70,
  },
  viewInput: {
    marginTop: 30,
  },
  textInput: {
    paddingHorizontal: 10,
    marginHorizontal: 29,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  buttonStyl: {
    width: 200,
    backgroundColor: "#0d47a1",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
    marginHorizontal: 20,
  },
  buttonTest: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
  buttonUpload: {
    backgroundColor: "red",
    width: 100,
    marginTop: 10,
    elevation: 2,
    padding: 5,
    borderRadius: 10,
  },
});
