import React, { useLayoutEffect } from "react";
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  View,
  Body,
  Text,
} from "native-base";
import { StyleSheet } from "react-native";
import ComboBox from "./ComboBox";

function Tracuuketquatuyensinh({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tra cứu kết quả tuyển sinh",
    });
  });
  return <ComboBox />;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEEBFE",
  },
});
export default Tracuuketquatuyensinh;
