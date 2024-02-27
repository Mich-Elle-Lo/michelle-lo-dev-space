import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PostCard = memo(({ item, onRefresh }) => {
  const [localComment, setLocalComment] = useState("");
  const [placeholderWarning, setPlaceholderWarning] = useState(false);

  const baseURL = "http://localhost:3000/";
  const mobileServer = "http://10.0.0.108:3000";

  const postComment = async () => {
    const postId = item.id;

    try {
      if (!localComment.trim()) {
        setPlaceholderWarning(true);
        return;
      }
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.post(
        `${mobileServer}/posts/${postId}/comments`,
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

  const isVideo = item.photo.endsWith(".mp4") || item.photo.endsWith(".mov");

  return (
    <View style={styles.postContainer}>
      <View style={styles.userHeader}>
        <Image
          source={{ uri: item.profile_photo }}
          style={styles.profilePhoto}
        />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      {isVideo ? (
        <Video
          source={{ uri: item.photo }}
          style={styles.postImage}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          useNativeControls
        />
      ) : (
        <Image source={{ uri: item.photo }} style={styles.postImage} />
      )}
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
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.commentButton}>
          <MaterialCommunityIcons name="heart" color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={postComment} style={styles.commentButton}>
          <MaterialCommunityIcons name="send" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  postContainer: {
    overflow: "hidden",
    marginVertical: 8,
    borderTopWidth: 1,
    borderColor: "#D8D9DA",
    opacity: 0.9,
    paddingBottom: 12,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 15,
  },
  profilePhoto: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "#D8D9DA",
    fontWeight: "bold",
    fontSize: 20,
    padding: 8,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DA",
  },
  postImage: {
    width: "100%",
    height: 400,
    marginBottom: 8,
  },
  postCaption: {
    color: "#D8D9DA",
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  commentsContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#343536",
    padding: 8,
    paddingTop: 4,
  },
  commentText: {
    color: "#D8D9DA",
    fontSize: 14,
    marginTop: 4,
  },
  commentInput: {
    color: "#D8D9DA",
    marginTop: 8,
    borderRadius: 5,
    padding: 6,
    paddingHorizontal: 15,
  },
  commentButton: {
    padding: 8,
    alignSelf: "flex-end",
    marginRight: 16,
  },
  actionsContainer: {
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostCard;
