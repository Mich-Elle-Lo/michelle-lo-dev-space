import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  const onSaveChanges = async (profileData) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
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
      <View style={styles.cardContainer}>
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
        </View>
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
      </View>
      {isModalVisible && (
        <ProfileEditModal
          userProfile={userProfile}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={onSaveChanges}
        />
      )}
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
    backgroundColor: "#1E1E1E",
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
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
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
});
