import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function FeedScreen() {
  const baseURL = "http://localhost:3000/";
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error getting post:", error);
    }
  };

  const postComment = async (postId, comment) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:3000/posts/${postId}/comments",
        {
          user_id: userId,
          comment,
        }
      );
      setComment("");
      setRefresh(true);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.id?.toString() ?? "default-key"}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Image source={{ uri: item.photo }} style={styles.postImage} />
            <Text style={styles.postCaption}>{item.caption}</Text>
            <View style={styles.commentsContainer}>
              {item.comments &&
                item.comments.map((comment) => (
                  <Text key={comment.id} style={styles.commentText}>
                    {comment.commenter}: {comment.comment}
                  </Text>
                ))}
              {/* Comment Input */}
              <TextInput
                style={styles.commentInput}
                onChangeText={setComment}
                value={comment}
                placeholder="Write a comment..."
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                onPress={() => postComment(item.id)}
                style={styles.commentButton}
              >
                <MaterialCommunityIcons name="send" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postCaption: {
    color: "white",
    padding: 8,
    fontSize: 16,
  },
  commentsContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  commentText: {
    color: "grey",
    fontSize: 14,
    marginTop: 4,
  },
  commentInput: {
    color: "white",
    marginTop: 8,
  },
  commentButton: {
    padding: 8,
    alignItems: "center",
  },
});
