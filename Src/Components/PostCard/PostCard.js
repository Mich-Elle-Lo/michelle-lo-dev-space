import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function PostCard({ item, onRefresh }) {
  const [localComment, setLocalComment] = useState("");
  const [placeholderWarning, setPlaceholderWarning] = useState(false);

  const postComment = async () => {
    const postId = item.id;

    try {
      if (!localComment.trim()) {
        setPlaceholderWarning(true);
        return;
      }
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.post(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          user_id: userId,
          comment: localComment.trim(),
        }
      );
      console.log("user id is:", userId);
      setLocalComment("");
      onRefresh();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Image source={{ uri: item.photo }} style={styles.postImage} />
      <Text style={styles.postCaption}>{item.caption}</Text>

      <View style={styles.commentsContainer}>
        {item.comments &&
          item.comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              {comment.commenter}: {comment.comment}
            </Text>
          ))}
      </View>
      <TextInput
        style={styles.commentInput}
        onChangeText={(text) => {
          setLocalComment(text);
          if (placeholderWarning) setPlaceholderWarning(false);
        }}
        value={localComment}
        placeholder={
          placeholderWarning
            ? "You gotta enter a comment!"
            : "Write a comment..."
        }
        placeholderTextColor="grey"
      />
      <TouchableOpacity onPress={postComment} style={styles.commentButton}>
        <MaterialCommunityIcons name="send" color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#343536",
    opacity: 0.9,
    paddingBottom: 12,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#343536",
  },
  postImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
  postCaption: {
    color: "white",
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  commentsContainer: {
    // paddingVertical: 4,
    // paddingHorizontal: 8,
    backgroundColor: "#2c2c2e",
    borderRadius: 5,
    padding: 8,
    paddingTop: 4,
  },
  commentText: {
    color: "#bbbbbb",
    fontSize: 14,
    marginTop: 4,

    // marginBottom: 4,
  },
  commentInput: {
    color: "white",
    marginTop: 8,
    backgroundColor: "#2c2c2e",
    borderRadius: 5,
    padding: 6,
    paddingHorizontal: 15,
  },
  commentButton: {
    padding: 8,
    alignSelf: "flex-end",
    marginRight: 16,
  },
});
