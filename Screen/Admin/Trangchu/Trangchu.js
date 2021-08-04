import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useHeaderHeight } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Trangchu({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      headerTitle: () => (
        <MaterialCommunityIcons name={"home"} size={30} color={"white"} />
      ),
      headerRight: () => <Button title="+1" color="#fff" />,
    });
  });

  // const { Tinh } = route.params;
  const Tinh = "Vĩnh Phúc";
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
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: "#61b15a",
            fontSize: 100,
            letterSpacing: -15,
          }}
        />
        <Text>Vui lòng kiểm tra kết nối mạng</Text>
      </View>
    );
  }
  //#endregion

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "100%",
          // backgroundColor: "#7AB4A5",
        }}
      >
        {/*Head*/}
        <View
          style={{
            width: "100%",
            height: "30%",
            borderBottomWidth: 1,
          }}
        ></View>
        {/*Body*/}
        <View
          style={{
            width: "100%",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screenNavigation: {
    width: 50,
  },
  scrollContainer: {
    height: 300,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Trangchu;
