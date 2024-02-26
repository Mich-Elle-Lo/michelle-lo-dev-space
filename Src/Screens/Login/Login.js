import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import DevSpaceLogo from "../../Assets/Logo/Logo.png";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const mobileServer = "http://10.0.0.108:3000";
  const localServer = "http://localhost:3000";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${mobileServer}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", json.token);
        await AsyncStorage.setItem("userId", json.userId.toString());
        console.log(json.userId.toString());
        console.log(password);
        navigation.navigate("MainApp");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Oh no!", "Wrong Username or Password!");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image source={DevSpaceLogo} style={styles.logo} />
      <Text style={styles.title}>DEV SPACE</Text>
      <TextInput
        placeholder="Username or Email"
        placeholderTextColor="#888"
        value={identifier}
        onChangeText={setIdentifier}
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
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={handleRegister}>
        <Text style={styles.signUpText}>
          Don't have an account? Create one here
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "black",
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 24,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 48,
  },
  input: {
    width: "75%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  signUpText: {
    color: "white",
    marginTop: 20,
  },
});
