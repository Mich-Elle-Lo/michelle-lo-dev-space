import { View, Text, Button } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

export default function WebViewScreen() {
  const route = useRoute();
  const { url } = route.params;

  return (
    <>
      <WebView source={{ uri: url }} />
    </>
  );
}
