import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import PostCard from "../../Components/PostCard/PostCard";

export default function FeedScreen() {
  const baseURL = "http://localhost:3000/";

  const [refresh, setRefresh] = useState(false);

  const mobileServer = "http://10.0.0.108:3000";
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${mobileServer}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
    setRefreshing(false);
  }, [mobileServer]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = () => {
    fetchPosts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard item={item} onRefresh={onRefresh} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
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
