import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Image } from "@rneui/themed";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function FullScreenImg({ url }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: url }}
        containerStyle={styles.fullScreenImg}
        PlaceholderContent={
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color="rgb(29,161,242)"
          />
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, height: "100%" },
  fullScreenImg: {
    aspectRatio: 1,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  indicator: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#000",
  },
});
