import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { useFetching } from "./hooks/useFetching";
import PhotoService from "../API/PhotoAPI";
import { useURL } from "./context/URLcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import MyModal from "./Modal";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ScreenOne({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const response = await PhotoService.getAll(page);
    setData([...data, ...response.data]);
    setPage(page + 1);
  });
  const { setUrl } = useURL();
  useEffect(() => {
    fetchPosts(page);
  }, []);
  function getData() {
    fetchPosts(page + 1);
    console.log(page);
  }
  function modalVisibility(data) {
    setModalVisible(data);
  }
  useEffect(() => {
    if (error) {
      setModalVisible(true);
    }
  }, [error]);

  const renderItemComponent = (el) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setUrl(el.urls?.full);
          navigation.navigate("Full size");
        }}
        style={{ width: 400 }}
      >
        <ImageBackground
          source={{
            uri: el.urls?.small,
          }}
          style={styles.imgItem}
          resizeMode="cover"
        >
          <Text style={styles.textItem}>
            {el.description
              ? `${el.description}\n(author:${el.user.username})`
              : `Picture \n(author:${el.user.username})`}
          </Text>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {data.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={(el) => renderItemComponent(el.item)}
          keyExtractor={(el, index) => index.toString()}
          onEndReached={getData}
        />
      ) : (
        <View></View>
      )}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{
            backgroundColor: "rgba(0,0,0,1)",
            height: data.length === 0 ? windowHeight : 50,
          }}
          color="rgb(29,161,242)"
        />
      ) : (
        <View style={{ backgroundColor: "rgba(0,0,0,0)" }}></View>
      )}
      <MyModal
        visible={modalVisible}
        modalVisability={modalVisibility}
        error={error}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    height: windowHeight,
  },
  textItem: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  imgItem: {
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "flex-start",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
