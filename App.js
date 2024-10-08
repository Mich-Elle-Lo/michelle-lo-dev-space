import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import LoginScreen from "./Src/Screens/Login/Login";
import BottomTabNav from "./Src/Components/BottomTabNav/BottomTabNav";
import RegisterScreen from "./Src/Screens/Register/Register";
import NewsScreen from "./Src/Screens/News/News";
import UsersProfile from "./Src/Screens/UsersProfile/UsersProfile";
import WebViewScreen from "./Src/Screens/WebView/WebViewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="UsersProfile"
          component={UsersProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{ title: "News" }}
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
