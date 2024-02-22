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
} from "react-native";
import PostCard from "../../Components/PostCard/PostCard";

export default function FeedScreen() {
  const navigation = useNavigation();
  const baseURL = "http://localhost:3000/";

  const [refresh, setRefresh] = useState(false);

  const mobileServer = "http://10.0.0.108:3000";
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -100) {
      navigation.navigate("NewsScreen");
    }
  };

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onSwipe}>
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
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
