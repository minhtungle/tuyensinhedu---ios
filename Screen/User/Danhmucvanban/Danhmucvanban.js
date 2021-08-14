import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from "react-native";

import { Picker, Spinner } from "native-base";
import DataWithSearchBar from "./DataWithSearchBar";
import NetInfo from "@react-native-community/netinfo";
import { useHeaderHeight } from "@react-navigation/stack";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { Ionicons } from "@expo/vector-icons";

function Danhmucvanban({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Danh mục văn bản",
    });
  });

  //#region Kiểm tra kết nối mạng
  const [connected, setConnected] = useState(true);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const interval = setInterval(
      () =>
        NetInfo.fetch().then((state) => {
          setConnected(state.isConnected);
        }),
      3000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!connected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DEEBFE",
          paddingBottom: headerHeight,
        }}
      >
        <Spinner color="tomato" />
        <Text>Vui lòng kiểm tra kết nối mạng</Text>
      </View>
    );
  }
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.block}>
        <DataWithSearchBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#eff8ff",
    backgroundColor: "#DEEBFE",
  },
  block: {
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
    width: "100%",
  },
  button: {
    marginLeft: "10%",
    marginBottom: "5%",
    alignSelf: "center",
    borderRadius: 25,
    textShadowColor: "black",
    backgroundColor: "#008577",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
export default Danhmucvanban;
