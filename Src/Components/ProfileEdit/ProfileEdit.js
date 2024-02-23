import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileEditModal({
  userProfile,
  isVisible,
  onClose,
  onSave,
}) {
  const [username, setUsername] = useState(userProfile.username);
  const [email, setEmail] = useState(userProfile.email);
  const [location, setLocation] = useState(userProfile.location);
  const [bio, setBio] = useState(userProfile.bio);

  const mobileServer = "http://10.0.0.108:3000";

  const handleSave = async (profileData) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      await axios.patch(`${mobileServer}/users/${userId}`, profileData);
      onClose();
      onSave(profileData);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || "");
      setEmail(userProfile.email || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
    }
  }, [userProfile]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="E-mail"
            />
            <TextInput
              style={styles.input}
              onChangeText={setLocation}
              value={location}
              placeholder="Location"
            />
            <TextInput
              style={styles.input}
              onChangeText={setBio}
              value={bio}
              placeholder="Bio"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSave({ username, email, location, bio })}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#474749",
  },
  input: {
    width: "100%",
    backgroundColor: "#3A3A3C",
    color: "white",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#636366",
  },
  button: {
    backgroundColor: "#3A3A3C",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
