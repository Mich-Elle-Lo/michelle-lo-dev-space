import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(`http://localhost:3000/users/1`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.detailText}>Loading profile...</Text>
      </View>
    );
  }

  const onEditPress = () => {
    Alert.alert("Edit Pressed", "Coming soon, patience!");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                userProfile?.profile_photo ||
                "https://placekitten.com/g/200/200",
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>
            {userProfile?.username || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Email: {userProfile?.email || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Location: {userProfile?.location || "Loading..."}
          </Text>
          <Text style={styles.detailText}>
            Bio: {userProfile?.bio || "Loading..."}
          </Text>
          <Pressable onPress={onEditPress} style={styles.editButton}>
            <MaterialCommunityIcons
              name="account-edit"
              color="white"
              size={20}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212", // Dark background
  },
  cardContainer: {
    backgroundColor: "#1E1E1E",
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
    alignItems: "center",
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
  editButton: {
    marginTop: 20,
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 10,
  },
});
