import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Picker, Spinner } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

function Trangchu({ route, navigation }) {
  const data = route.params;
  // console.log(data);
  const headerHeight = useHeaderHeight();
  const TAB_NAVIGATION_HEIGHT = 80;
  const CONTAINER_HEIGHT = SCREEN_HEIGHT - headerHeight;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.4;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;
  // Tạo chiều cao cho từng screenCard
  let heighthPerScreen = 0;
  heighthPerScreen = ((BODY_CONTAINER_HEIGHT - 2 * 5 * 3) * 0.95) / 3; // (SCREEN_WIDTH - 2 * margin * rowElement) / rowElement
  if (data.DoiTuong != 1) {
    // const bottomHeight = useBottomTabBarHeight();
    // bottomHeight = 80;
    CONTAINER_HEIGHT = SCREEN_HEIGHT - headerHeight - TAB_NAVIGATION_HEIGHT;
    TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.4;
    BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;
    heighthPerScreen = ((BODY_CONTAINER_HEIGHT - 2 * 5 * 3) * 0.95) / 3; // (SCREEN_WIDTH - 2 * margin * rowElement) / rowElement
  }

  //#region Hieu ung spin logo
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  //#endregion
  const screenCard = [
    {
      page: "Kỳ tuyển sinh",
      title: "Kỳ tuyển sinh",
      icon: "calendar-month",
      doituong: 3, // cho PGD
    },
    {
      page: "Kế hoạch tuyển sinh",
      title: "Kế hoạch tuyển sinh",
      icon: "bulletin-board",
      doituong: 2, // cho tất cả
    },
    {
      page: "Kỳ thi",
      title: "Kỳ thi",
      icon: "calculator-variant",
      doituong: 4, // cho SGD
    },
    {
      page: "Hồ sơ",
      title: "Hồ sơ",
      icon: "folder-open",
      doituong: 2,
    },
    {
      page: "Tài khoản",
      title: "Tài khoản",
      icon: "account-cog",
      doituong: 2,
    },
  ];
  //#region Kiểm tra kết nối mạng
  const [connected, setConnected] = useState(true);
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
          // display: "none", // Nhớ đổi lại
          // paddingBottom: headerHeight,
        }}
      >
        <Spinner color="tomato" />
        <Text>Vui lòng kiểm tra kết nối mạng</Text>
      </View>
    );
  }
  //#endregion
  //#region Function
  const Chon_LoaiQuanLy = (page, doituong) => {
    // console.log(data.DoiTuong, doituong);
    if (data.DoiTuong != 4 && doituong == 4) {
      alert("Chức năng này chỉ phục vụ cấp SỞ GD&ĐT");
    } else if (data.DoiTuong != 3 && doituong == 3) {
      alert("Chức năng này chỉ phục vụ cấp Phòng GD&ĐT");
    } else {
      navigation.navigate(page, { ...data });
    }
  };
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
        {/*Top*/}
        <View
          style={[
            styles.top_container,
            {
              height: TOP_CONTAINER_HEIGHT,
            },
          ]}
        >
          <Animated.Image
            style={{
              height: SCREEN_WIDTH * 0.3,
              width: SCREEN_WIDTH * 0.3,
              transform: [{ rotate: spin }],
            }}
            source={require("../../../assets/logo.png")}
          />
          <Text
            style={{
              width: "90%",
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {(() => {
              let welcome_mess = "";
              let doituong = data.DoiTuong;
              let tendonvi = "";
              if (doituong == 1) {
                welcome_mess =
                  "Chào mừng đến với hệ thống tuyển sinh trực tuyến";
              } else if (doituong == 2) {
                let truong = JSON.parse(data.Truong);
                tendonvi = truong.Ten;
                welcome_mess = `Xin chào ! \n ${tendonvi}`;
              } else if (doituong == 3) {
                let pgd = JSON.parse(data.Truong);
                tendonvi = pgd.Ten;
                welcome_mess = `Xin chào ! \n ${tendonvi}`;
              } else if (doituong == 4) {
                let sgd = JSON.parse(data.Truong);
                tendonvi = sgd.Ten;
                welcome_mess = `Xin chào ! \n ${tendonvi}`;
              }
              return welcome_mess;
            })()}
          </Text>
        </View>
        {/*Body*/}
        <View
          style={[
            styles.body_container,
            {
              height: BODY_CONTAINER_HEIGHT,
            },
          ]}
        >
          {screenCard.map((sc_item, sc_index) => (
            <TouchableOpacity
              key={sc_index.toString()}
              style={[
                styles.screenCard,
                { ...styles.shadow, height: heighthPerScreen },
              ]}
              onPress={() => Chon_LoaiQuanLy(sc_item.page, sc_item.doituong)}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                  // borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name={sc_item.icon}
                  size={50}
                  color={"#0965B0"}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                  // borderWidth: 1,
                }}
              >
                <Text style={styles.screenText}>{sc_item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
const marginScreen = 5;
const sumScreenPerRow = 2;
const widthPerScreen =
  (SCREEN_WIDTH - 2 * marginScreen * sumScreenPerRow) / sumScreenPerRow;

const styles = StyleSheet.create({
  top_container: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // borderWidth: 1,
  },
  body_container: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  screenCard: {
    width: widthPerScreen,
    // height: "30%",
    margin: marginScreen,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: 20,
    // borderWidth: 1,
  },
  screenText: {
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
export default Trangchu;
