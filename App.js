import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "./Src/Screens/Login/Login";
import FeedScreen from "./Src/Screens/Feed/Feed";
import BottomTabNav from "./Src/Components/BottomTabNav/BottomTabNav";

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
          name="MainApp"
          component={BottomTabNav}
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
