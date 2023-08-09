/**
 * @format
 */
import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import IntroScreen from "./src/screens/IntroScreen";
import MainNavigation from "./src/Navigation/MainNavigation";
import { name as appName } from "./app.json";
import "react-native-reanimated";
import { LogBox } from "react-native";
import messaging from "@react-native-firebase/messaging";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);
global.__reanimatedWorkletInit = () => {};

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => MainNavigation);
