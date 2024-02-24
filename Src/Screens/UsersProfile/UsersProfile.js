import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function UsersProfile({ route }) {
  const { profileUserId } = route.params;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const baseURL = "http://localhost:3000/";
  const mobileServer = "http://10.0.0.108:3000";
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData(profileUserId);
  }, [profileUserId]);

  const fetchUserData = async (userId) => {
    try {
      const userResponse = await axios.get(`${mobileServer}/users/${userId}`);
      setUser(userResponse.data);

      const postsResponse = await axios.get(
        `${mobileServer}/users/${userId}/posts`
      );
      setPosts(postsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <ActivityIndicator />;
  }

  const onSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -100) {
      navigation.navigate("MainApp");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onSwipe}>
        <SafeAreaView style={styles.safeArea}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.container}>
                <Image
                  source={{ uri: user.profile_photo }}
                  style={styles.profilePhoto}
                />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
                <Text style={styles.bio}>{user.location}</Text>
              </View>
            }
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                {item.is_video ? (
                  <Video
                    source={{ uri: item.photo }}
                    style={styles.postImage}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping
                    useNativeControls
                  />
                ) : (
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.postImage}
                  />
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
              </View>
            )}
          />
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: "#121212",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  username: {
    marginTop: 20,
    fontSize: 24,
    color: "#FFFFFF",
  },
  bio: {
    marginTop: 10,
    color: "#E0E0E0",
  },
  loadingText: {
    color: "#FFFFFF",
  },
  postContainer: {
    // backgroundColor: "#1c1c1e",
    // borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    // marginHorizontal: 16,
    // borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#343536",
    opacity: 0.9,
    paddingBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 400,
    marginBottom: 8,
  },
  postCaption: {
    color: "white",
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  commentText: {
    color: "white",
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  postsList: {
    width: "100%",
  },
});
