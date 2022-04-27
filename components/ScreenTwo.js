import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Text } from "@rneui/themed";
import { Image } from "react-native-elements";
import { useURL } from "./context/URLcontext";
import Spinner from "react-native-loading-spinner-overlay";
import FullScreenImg from "./FullScreenImg";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ScreenTwo() {
  const { url } = useURL();

  return (
    <View style={styles.container}>
      <FullScreenImg url={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: windowHeight,
    flexDirection: "column",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
