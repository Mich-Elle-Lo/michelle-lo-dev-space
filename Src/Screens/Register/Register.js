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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevSpaceLogo from "../../Assets/Logo/Logo.png";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
        location,
        bio,
      });
      console.log("Registration successful", response.data);
      Alert.alert("Success", "Registration successful!");
    } catch (error) {
      console.error("Error with Resgistration", error.response.data);
    }
  };
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={DevSpaceLogo} style={styles.logo} />
      <Text style={styles.title}>Register on DEV SPACE</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
      />
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
    paddingTop: 120,
    backgroundColor: "black",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "75%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1c1c1e",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
