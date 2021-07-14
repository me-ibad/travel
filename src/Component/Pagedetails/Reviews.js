import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  Text,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

import colors from "../../assets/colors/colors";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { Rating, AirbnbRating } from "react-native-ratings";
import { getToken } from "./../../globalFunction/getToken";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
const serverpoint = require("./../../config");

export default function Reviews(props) {
  const [avvgRating, setavvgRating] = React.useState("");
  const [postComment, setpostComment] = React.useState("");
  const [allComments, setallComments] = React.useState([]);
  async function passComment() {
    var userdata = await getToken("travelapp");

    axios
      .post(serverpoint.servername + "/postComments", {
        uploderid: JSON.parse(userdata)._id,
        latitude: props.placeid.latitude,
        longitude: props.placeid.longitude,
        comment: postComment,
      })
      .then(res => {
        setpostComment("");
        // alert(res.data)
        fetchComments();
      });
  }

  async function fetchComments() {
    axios
      .post(serverpoint.servername + "/fetchComments", {
        latitude: props.placeid.latitude,
        longitude: props.placeid.longitude,
      })
      .then(res => {
        console.log(res.data);

        setallComments(res.data);
      });
  }
  async function ratingCompleted(rating) {
    var userdata = await getToken("travelapp");
    // (JSON.parse(userdata)._id);

    axios.post(serverpoint.servername + "/postReview", {
      uploderid: JSON.parse(userdata)._id,
      latitude: props.placeid.latitude,
      longitude: props.placeid.longitude,
      rating: rating,
    });
  }
  useEffect(() => {
    ///  checkReviews();
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      {allComments.map((s, i) => (
        <>
          <View style={styles.viewCard}>
            <Image
              source={{
                uri: s.users.img,
              }}
              style={styles.imgAvtr}
            />

            <View style={styles.viewName}>
              <Text style={styles.textName}>{s.users.fname}</Text>
              <Text style={{ color: "grey" }}>{s.comment}</Text>
            </View>
          </View>
        </>
      ))}

      <View style={styles.divider} />

      <View style={styles.rating}>
        <AirbnbRating
          count={5}
          size={30}
          selectedColor="#f1c40f"
          showRating
          onFinishRating={ratingCompleted}
        />
        <Text>{avvgRating}</Text>
      </View>
      <View style={styles.viewReview}>
        <TextInput
          style={styles.inputReview}
          placeholder="comment"
          value={postComment}
          onChangeText={setpostComment}
        />

        <TouchableOpacity
          style={styles.textinput}
          onPress={() => passComment()}
        >
          <Text style={styles.textReview}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

    width: w,
  },

  mainview: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  rating: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  comment: {
    marginTop: 15,
  },
  commentname: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textinput: {
    width: 100,
    backgroundColor: "#0d47a1",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
  },

  imgAvtr: {
    width: 60,
    height: 60,
  },
  viewCard: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
  },
  viewName: {
    width: "50%",
    marginVertical: 1,
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: "grey",
    marginHorizontal: 20,
    marginVertical: 8,
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    right: 20,
    marginTop: 5,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textReview: {
    fontSize: 12,
    color: "grey",
  },
  viewReview: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputReview: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  textReview: { textAlign: "center", color: colors.white, fontSize: 16 },
});
