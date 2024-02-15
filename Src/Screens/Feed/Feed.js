import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import PostCard from "../../Components/PostCard/PostCard";

export default function FeedScreen() {
  const baseURL = "http://localhost:3000/";
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error getting post:", error);
    }
  };

  const triggerRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard item={item} onRefresh={triggerRefresh} />
        )}
        extraData={refresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
