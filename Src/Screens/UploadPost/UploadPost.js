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
  ActionSheetIOS,
} from "react-native";
import { Video } from "expo-av";
import { Camera } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UploadPost({ navigation }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState({ uri: null, type: null });

  const [hasPermission, setHasPermission] = useState(null);

  const mobileServer = "http://10.0.0.108:3000";

  // useEffect(() => {
  //   (async () => {
  //     const { status: cameraStatus } =
  //       await Camera.requestCameraPermissionsAsync();
  //     const { status: libraryStatus } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (cameraStatus !== "granted" || libraryStatus !== "granted") {
  //       alert(
  //         "Sorry, we need camera and library permissions to make this work!"
  //       );
  //       return;
  //     }
  //     if (Platform.OS === "ios") {
  //       ActionSheetIOS.showActionSheetWithOptions(
  //         {
  //           options: ["Cancel", "Take Photo or Video", "Choose from Library"],
  //           cancelButtonIndex: 0,
  //         },
  //         (buttonIndex) => {
  //           if (buttonIndex === 1) {
  //             openCamera();
  //           } else if (buttonIndex === 2) {
  //             pickImage();
  //           }
  //         }
  //       );
  //     } else {
  //       openCamera();
  //     }
  //   })();
  // }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    console.log(result);
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const { uri, mimeType } = result.assets[0];
      const type = mimeType.split("/")[0];
      setMedia({ uri, type });
    }
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

  const handlePost = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!media.uri || caption.trim() === "") {
      Alert.alert(
        "Missing Fields",
        "Please select an image/video and enter a caption."
      );
      return;
    }

    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("caption", caption);

    const fileName = media.uri.split("/").pop();
    const fileType = media.type === "video" ? "video/quicktime" : "image/jpeg";
    const fileToUpload = {
      uri: media.uri,
      name: fileName,
      type: fileType,
    };

    formData.append("photo", fileToUpload);

    try {
      const response = await axios({
        method: "post",
        url: `${mobileServer}/posts`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Alert.alert("Success", "Post uploaded successfully!");
        navigation.goBack();
      } else {
        Alert.alert(
          "Upload Failed",
          response.data.message || "Failed to upload post."
        );
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "An error occurred, please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {media.uri &&
        (media.type === "image" ? (
          <Image source={{ uri: media.uri }} style={styles.image} />
        ) : (
          <Video
            source={{ uri: media.uri }}
            style={styles.video}
            resizeMode="contain"
            shouldPlay
            useNativeControls
          />
        ))}
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        placeholderTextColor="#888"
        value={caption}
        onChangeText={setCaption}
      />
      <Button
        title="Pick an image/video from camera roll"
        onPress={pickImage}
      />

      <TouchableOpacity onPress={handlePost} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
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
    width: "100%",
    height: 400,
    marginBottom: 8,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 10,
  },
  video: {
    width: "100%",
    height: 400,
    marginBottom: 8,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 10,
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
});
