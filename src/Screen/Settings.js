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
const h = Dimensions.get("window").height;
import * as ImagePicker from "expo-image-picker";
import Navbar from "../Component/Navbar/Navbar";

export default function Settings() {
  const [image, setImage] = useState(
    "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar name="Settings" />
      <ScrollView>
        <View style={styles.viewBody}>
          {image && (
            <Image
              source={{
                uri: image,
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
            placeholder="Name"
            //   onChangeText={setname}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Username"
            //   onChangeText={setname}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Old Password"
            secureTextEntry={true}
            //   onChangeText={setname}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="New Password"
            secureTextEntry={true}
            //   onChangeText={setname}
          />
        </View>

        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Confirm Password"
            secureTextEntry={true}
            //   onChangeText={setname}
          />
        </View>

        <TouchableOpacity style={styles.buttonStyl}>
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
