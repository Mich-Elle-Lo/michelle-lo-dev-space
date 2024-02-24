import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileEditModal from "../../Components/ProfileEdit/ProfileEdit";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const mobileServer = "http://10.0.0.108:3000";

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");
  //       if (userId) {
  //         const response = await axios.get(`${mobileServer}/users/${userId}`);
  //         setUserProfile(response.data);
  //       } else {
  //         console.error("User ID not found in AsyncStorage");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile", error);
  //     }
  //   };
  //   fetchUserProfile();
  // }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userResponse = await axios.get(`${mobileServer}/users/${userId}`);
      setUserProfile(userResponse.data);

      const postsResponse = await axios.get(
        `${mobileServer}/users/${userId}/posts`
      );
      setPosts(postsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  // if (!user) {
  //   return <ActivityIndicator />;
  // }

  const onSaveChanges = async (profileData) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!userProfile) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <Image
                source={{ uri: userProfile.profile_photo }}
                style={styles.profilePhoto}
              />
              <Text style={styles.username}>{userProfile.username}</Text>
              <Text style={styles.bio}>{userProfile.bio}</Text>
              <Text style={styles.bio}>{userProfile.location}</Text>
              <Text style={styles.bio}>{userProfile.email}</Text>
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
            </View>
          )}
        />

        {/* <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userProfile.profile_photo }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>
            {userProfile.username || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Email: {userProfile.email || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Location: {userProfile.location || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Bio: {userProfile.bio || "Loading..."}
          </Text>
        </View> */}
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => setIsModalVisible(true)}
            style={styles.editButton}
          >
            <MaterialCommunityIcons
              name="account-edit"
              color="white"
              size={20}
            />
          </Pressable>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" color="white" size={20} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        </View>
        {/* </View> */}
        {isModalVisible && (
          <ProfileEditModal
            userProfile={userProfile}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={onSaveChanges}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  cardContainer: {
    // backgroundColor: "#1E1E1E",
    width: "80%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  infoContainer: {
    alignItems: "start",
    width: "100%",
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    marginTop: 10,
    color: "#E0E0E0",
  },
  detailText: {
    color: "lightgrey",
    marginBottom: 5,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#3A3A3C",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
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
