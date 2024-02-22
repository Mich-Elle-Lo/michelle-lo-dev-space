import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FeedScreen from "../../Screens/Feed/Feed";
import ProfileScreen from "../../Screens/Profile/profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewsScreen from "../../Screens/News/News";
import ChatScreen from "../../Screens/Chat/Chat";
import CareerScreen from "../../Screens/Career/Career";
import UploadPost from "../../Screens/UploadPost/UploadPost";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      inactiveColor="white"
      barStyle={{ backgroundColor: "black" }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-woman-profile"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Careers"
        component={CareerScreen}
        options={{
          tabBarLabel: "Careers",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="laptop" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="UploadPost"
        component={UploadPost}
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wechat" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              color={color}
              size={26}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
