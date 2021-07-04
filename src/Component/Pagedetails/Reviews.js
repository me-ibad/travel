import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.mainview}>
      <View style={styles.comment}>
        {/* <List>
          {allComments.map((s, i) => (
            <>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: s.users.img,
                    }}
                  />
                </Left>
                <Body>
                  <Text style={styles.commentname}>{s.users.fname}</Text>
                  <Text note>{s.comment}</Text>
                </Body>
              </ListItem>
            </>
          ))}
        </List> */}
      </View>

      <View style={styles.rating}>
        <AirbnbRating
          count={5}
          size={30}
          selectedColor="#f1c40f"
          showRating
          onFinishRating={ratingCompleted}
        />
        {/* <Text>{avvgRating}</Text> */}
      </View>
      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="comment"
        onChangeText={setpostComment}
      />

      <TouchableOpacity style={styles.textinput} onPress={() => passComment()}>
        <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  rating: {
    flexDirection: "row",
    marginTop: 15,
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
});
