import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

//* hàm chuyển đổi ngày tháng
const date = require("s-date");
export default function Trangdangky({ route, navigation }) {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eff8ff",
      }}
    ></SafeAreaView>
  );
}
const styles = StyleSheet.create({
  //? Phân cấp View : container > block = title > box > field(...element)
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#DEEBFE",
  },
  block: {
    backgroundColor: "#DEEBFE",
    width: "100%",
  },
  title: {
    width: "100%",

    borderRadius: 15,
    // left: "10%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 5,
    marginBottom: 10,
  },
  box: {
    // borderColor: "red",
    // borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  field: {
    borderColor: "white",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 5,
    marginBottom: "1%",
  },
  textInput: {
    fontSize: 18,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    flexGrow: 1,
  },
  //? Dropdown
  dropDownStyle: {
    backgroundColor: "#e8e8e8",
    borderColor: "#222831",
    borderWidth: 1,
  },
  labelStyle: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    textShadowColor: "#bbbbbb",

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
