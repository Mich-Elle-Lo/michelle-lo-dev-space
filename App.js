import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import LoginScreen from "./Src/Screens/Login/Login";
import FeedScreen from "./Src/Screens/Feed/Feed";
import BottomTabNav from "./Src/Components/BottomTabNav/BottomTabNav";
import RegisterScreen from "./Src/Screens/Register/Register";
import NewsScreen from "./Src/Screens/News/News";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="MainApp"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    paddingTop: 5,
    color: "black",
    fontSize: 40,
  },
  img: {
    height: 400,
    width: 400,
  },
});
