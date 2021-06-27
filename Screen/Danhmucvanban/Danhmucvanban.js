import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import DataWithSearchBar from "./DataWithSearchBar";

function Danhmucvanban({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Danh mục văn bản",
    });
  });
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
