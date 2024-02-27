import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevSpaceLogo from "../../Assets/Logo/Logo.png";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState({ uri: null, type: null });

  const handleRegister = async () => {
    const mobileServer = "http://10.0.0.108:3000";
    const baseURL = "http://localhost:3000/";
    if (password !== confirmPassword) {
      Alert.alert("Opps!", "Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("bio", bio);

    if (media.uri) {
      const fileType = media.uri.split(".").pop();
      const fileName = `avatar.${fileType}`;
      formData.append("avatar", {
        uri: media.uri,
        name: fileName,
        type: media.type + "/" + fileType,
      });
    }

    try {
      const response = await axios({
        method: "post",
        url: `${mobileServer}/register`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Registration successful", response.data);
      Alert.alert("Success", "Registration successful!");
      navigation.goBack;
    } catch (error) {
      console.error("Error with Resgistration", error.response.data);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMedia({
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType.split("/")[0],
      });
    }
  };

  return (
    <View style={styles.container}>
      {media.uri ? (
        <Image source={{ uri: media.uri }} style={styles.logo} />
      ) : (
        <Image source={DevSpaceLogo} style={styles.logo} />
      )}
      <Text style={styles.title}>Register on DEV SPACE</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        placeholderTextColor="#888"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        placeholderTextColor="#888"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
      />
      <Button title="Upload a selfie 🤳🏼" onPress={pickImage} />
      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Pressable onPress={handleCancel} style={styles.button}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "black",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 15,
  },
  input: {
    color: "#D8D9DA",
    width: "75%",
    height: 50,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1c1c1e",
    padding: 15,
    borderRadius: 30,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
