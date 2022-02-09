import { MaterialCommunityIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/stack";
import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

function Trangchu({ route, navigation }) {
  const data = route.params;
  const headerHeight = useHeaderHeight();
  const TAB_NAVIGATION_HEIGHT = 80;
  let CONTAINER_HEIGHT = SCREEN_HEIGHT - headerHeight;
  let TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.4;
  let BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;

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
      page: "Danh mục văn bản",
      title: "Danh mục văn bản",
      icon: "book-open",
    },
    {
      page: "Thông tin tuyển sinh",
      title: "Thông tin tuyển sinh",
      icon: "account-tie-voice",
    },
    {
      page: "Đăng ký tuyển sinh",
      title: "Đăng ký tuyển sinh",
      icon: "pencil-box-multiple",
    },
    {
      page: "Tra cứu kết quả tuyển sinh",
      title: "Tra cứu kết quả",
      icon: "layers-search",
    },
    {
      page: "Hướng dẫn đăng ký trực tuyến",
      title: "Hướng dẫn đăng ký",
      icon: "teach",
    },
    {
      page: "Lịch trình tuyển sinh",
      title: "Lịch trình tuyển sinh",
      icon: "clock",
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
              width: "95%",
              fontSize: 26,
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
              onPress={() => navigation.navigate(sc_item.page, { ...data })}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                  // borderWidth: 1,
                }}
              >
                {/* <Image style={styles.screenText} source={sc_item.img} /> */}
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
    textAlign: "center",
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
