import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import DevSpaceLogo from "../../Assets/Logo/Logo.png";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username, "Password:", password);
  };

  return (
    <View style={styles.container}>
      <Image source={DevSpaceLogo} style={styles.logo} />
      <Text style={styles.title}>DEV SPACE</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          /* ADD LOGIC */
        }}
      >
        <Text style={styles.signUpText}>
          Don't have an account? Create one here
        </Text>
      </Pressable>
    </View>
  );
};

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

export default LoginScreen;
