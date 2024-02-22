import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";

export default function NewsScreen() {
  const baseURL = "http://localhost:3000/";
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const onSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 100) {
      navigation.navigate("MainApp");
    }
  };

  const fetchNews = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get("https://dev.to/api/articles");
      setNews(response.data);
    } catch (error) {
      console.error("Error getting news:", error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    fetchNews();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onSwipe}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={news}
            keyExtractor={(item) => item?.id?.toString() ?? "default-key"}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.username}>{item.title}</Text>
                <Image
                  source={{ uri: item.social_image }}
                  style={styles.postImage}
                />
                <Text style={styles.postCaption}>{item.description}</Text>
                {/* <View style={styles.commentsContainer}>
              {item.comments &&
                item.comments.map((comment) => (
                  <Text key={comment.id} style={styles.commentText}>
                    {comment.commenter}: {comment.comment}
                  </Text>
                ))}
            </View> */}
              </View>
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
});
