import React, { useEffect, useState, useCallback } from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  View,
} from "react-native";
import PostCard from "../../Components/PostCard/PostCard";
import UserList from "../../Components/UserList/UserList";

export default function FeedScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const baseURL = "http://localhost:3000/";
  const mobileServer = "http://10.0.0.108:3000";

  const onSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -100) {
      navigation.navigate("NewsScreen");
    }
  };

  const fetchPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${mobileServer}/posts?page=${page}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
    setRefreshing(false);
  }, [mobileServer, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onRefresh = () => {
    setPage(1);
    setPosts([]);
    fetchPosts();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onSwipe}>
        <SafeAreaView style={styles.container}>
          <FlatList
            ListHeaderComponent={<UserList />}
            data={posts}
            keyExtractor={(item, index) => index.toString()}
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
});
