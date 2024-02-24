import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const mobileServer = "http://10.0.0.108:3000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${mobileServer}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UsersProfile", { profileUserId: item.id })
      }
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.profile_photo }}
          style={{ width: 75, height: 75, borderRadius: 50 }}
        />
        <Text style={styles.avatarText}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  avatarText: {
    marginTop: 5,
    color: "white",
  },
});
