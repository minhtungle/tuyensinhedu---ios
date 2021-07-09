import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import NetInfo from "@react-native-community/netinfo";
import { useHeaderHeight } from "@react-navigation/stack";

export default function Dangkytuyensinh({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Đăng ký tuyển sinh",
    });
  });
  const [status, setStatus] = useState(0);
  const image = [
    require("./img/c0.jpg"),
    require("./img/c1.png"),
    require("./img/c2.jpg"),
    require("./img/c3.png"),
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getkythi")
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: index + 1,
            TenKyThi: item.TenKyThi,
            TrangThai: item.TrangThai_HienThi,
            DoiTuongTuyenSinh: item.DoiTuongTuyenSinh,
            IDKyThi: item.ID,
          };
          arrData.push(obj);
        });
        //console.log(arrData[0]);
        setData(arrData);
        setStatus(1);
      })
      .catch((error) => {
        setStatus(-1);
        setData([]);
      });
  }, []);
  const Load_View = () => {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  };
  const Success_View = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.block}>
          {data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.85}
              key={index}
              onPress={() => {
                item.TrangThai === 3
                  ? navigation.navigate("Trang đăng ký", {
                      DoiTuongTuyenSinh: item.DoiTuongTuyenSinh,
                      IDKyThi: item.IDKyThi,
                    })
                  : null;
              }}
            >
              <View style={styles.box}>
                <Image
                  source={
                    item.DoiTuongTuyenSinh == 0
                      ? image[0]
                      : item.DoiTuongTuyenSinh == 1
                      ? image[1]
                      : item.DoiTuongTuyenSinh == 2
                      ? image[2]
                      : image[3]
                  }
                  style={styles.image}
                  resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {item.TenKyThi}
                </Text>
                {item.TrangThai === 0 ? (
                  <View
                    style={[
                      styles.trangthai,
                      {
                        backgroundColor: "#e1701a",
                      },
                    ]}
                  >
                    <Text style={styles.trangthai_text}>
                      Chưa có lịch trình
                    </Text>
                  </View>
                ) : item.TrangThai === 1 ? (
                  <View
                    style={[
                      styles.trangthai,
                      {
                        backgroundColor: "#51c4d3",
                      },
                    ]}
                  >
                    <Text style={styles.trangthai_text}>
                      Chưa đến thời gian
                    </Text>
                  </View>
                ) : item.TrangThai === 2 ? (
                  <View
                    style={[
                      styles.trangthai,
                      {
                        backgroundColor: "#ce1212",
                      },
                    ]}
                  >
                    <Text style={styles.trangthai_text}>Quá hạn</Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  };
  const Error_View = () => {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <ImageBackground
          source={require("./img/error.png")}
          style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
          blurRadius={2}
        >
          <Text
            style={{
              color: "white",
              fontSize: 42,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#000000a0",
            }}
          >
            Sự cố kết nôi
          </Text>
        </ImageBackground>
      </SafeAreaView>
    );
  };
  //#region Kiểm tra kết nối mạng
  const [connected, setConnected] = useState(false);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected);
    });
  });
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

  return status === 0 ? (
    <Load_View />
  ) : status === 1 ? (
    <Success_View />
  ) : (
    <Error_View />
  );
  // return <Error_View />;
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEEBFE",
  },
  block: {
    width: "100%",
    alignItems: "center",
    marginBottom: "10%",
  },
  box: {
    padding: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#FFFF",
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    marginLeft: 3,
    borderRadius: 75,
    borderWidth: 1.5,
    borderColor: "#d1d9d9",
    minWidth: 50,
    minHeight: 50,
    maxWidth: 50,
    maxHeight: 50,
  },
  text: {
    flexShrink: 1,
    paddingLeft: 20,
    alignItems: "stretch",
    flexGrow: 1,
    fontSize: 20,
  },
  button: {
    marginRight: "0%",
    maxWidth: "30%",
    borderRadius: 25,
    textShadowColor: "#bbbbbb",

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  trangthai: {
    position: "absolute",
    opacity: 0.8,
    top: -14,
    left: -14,
    paddingHorizontal: 2,
  },
  trangthai_text: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
