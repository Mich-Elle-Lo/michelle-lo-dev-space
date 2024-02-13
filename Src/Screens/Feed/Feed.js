import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

export default function FeedScreen() {
  const baseURL = "http://localhost:3000/";
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      console.error("Error getting post:", error);
    }
  };

  useEffect(() => {
    console.log(posts);
    fetchPosts();
  }, []);

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
});
