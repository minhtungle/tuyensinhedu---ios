import React, { useLayoutEffect, useState, useEffect } from "react";
import { Spinner } from "native-base";
import { StyleSheet, View, Text } from "react-native";
import ComboBox from "./ComboBox";
import NetInfo from "@react-native-community/netinfo";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useHeaderHeight } from "@react-navigation/stack";

function Tracuuketquatuyensinh({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tra cứu kết quả tuyển sinh",
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
