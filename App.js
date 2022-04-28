import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenOne from "./components/ScreenOne";
import ScreenTwo from "./components/ScreenTwo";
import URLProivider from "./components/context/URLcontext";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <URLProivider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ScreenOne}
            options={{
              title: "Photo gallery",
              headerStyle: { backgroundColor: "papayawhip" },
            }}
          />
          <Stack.Screen
            name="Full size"
            component={ScreenTwo}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </URLProivider>
  );
}
