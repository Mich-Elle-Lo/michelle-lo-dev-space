import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEV SPACE - CHAT</Text>
      <Text style={styles.title}>COMING SOON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 20,
    color: "#FFF6E0",
  },
});
