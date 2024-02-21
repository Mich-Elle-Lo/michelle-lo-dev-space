import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UploadPost({ navigation }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const mobileServer = "http://10.0.0.108:3000";

  // const { status } = Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  // if (status !== "granted") {
  //   alert("Sorry, we need camera roll permissions to make this work!");
  //   return;
  // }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!image || caption.trim() === "") {
      alert("Please select an image and enter a caption.");
    }
    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("caption", caption);
    formData.append("photo", {
      uri: Platform.OS === "android" ? image : image.replace("file://", ""),
      type: "image/jpeg",
      name: "upload.jpg",
    });
    try {
      const response = await axios.post(`${mobileServer}/posts`, formData);
      if (response.success) {
        Alert.alert("Success", "Thank you for posting!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to upload post");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred, please try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        placeholderTextColor="#888"
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={handlePost} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  placeholder: {
    position: "absolute",
    left: 10,
    top: 10,
    color: "#888",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 10,
  },
});
