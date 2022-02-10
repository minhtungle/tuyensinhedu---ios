import NetInfo from "@react-native-community/netinfo";
import { useHeaderHeight } from "@react-navigation/stack";
import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { tenmienDonVi } from "../../../assets/generalData";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Kehoachtuyensinh = ({ route, navigation }) => {
  const data = route.params;

  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = 0; //CONTAINER_HEIGHT * 0.3
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;
  const [kehoach, setKeHoach] = useState([]);
  useEffect(() => {
    let cap = data.Cap == 5 ? 3 : data.Cap == 4 ? 2 : data.Cap;
    fetch(
      `${tenmienDonVi}/api/TSAPIService/getkehoachbyyear?idquanhuyen&idphuongxa&idtruong&cap=${cap}&type=1`
    )
      .then((res) => res.json())
      .then((responseJson) => {
        const _kehoach = responseJson.Result.results.map(
          (kehoach_item, kehoach_index) => ({
            ...kehoach_item,
            TieuDe:
              kehoach_item.TieuDe == null ? "Không có" : kehoach_item.TieuDe,
            TenFile:
              kehoach_item.TenFile == null ? "Không có" : kehoach_item.TenFile,
          })
        );
        setKeHoach(_kehoach);
      })
      .catch((e) => setKeHoach([]));
  }, [0]);
  const renderKeHoach = ({ item }) => {
    return (
      <View
        style={
          (styles.center,
          {
            width: "100%",
            minHeight: 200,
            paddingHorizontal: 10,
            paddingVertical: 5,
            // borderWidth: 1,
            // backgroundColor: "yellow",
          })
        }
      >
        <View
          style={[
            styles.shadow,
            {
              height: 180,
              width: "100%",
              backgroundColor: "#FEFFE2",
              borderRadius: 20,
              // borderWidth: 1,
            },
          ]}
        >
          <View
            style={{
              height: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {item.TenTruong}
            </Text>
          </View>
          <View
            style={{
              height: "70%",
              justifyContent: "space-around",
              borderTopWidth: 0.5,
              paddingHorizontal: 20,
            }}
          >
            <Text>
              • Mã trường:{" "}
              <Text style={styles.thongtinKeHoach}>{item.MaTruong}</Text>
            </Text>
            <Text>
              • Tiêu đề:{" "}
              <Text style={styles.thongtinKeHoach}> {item.TieuDe} </Text>
            </Text>
            <Text>
              • Tên file:{" "}
              <Text style={styles.thongtinKeHoach}> {item.TenFile} </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: BODY_CONTAINER_HEIGHT * 0.9,
          width: "90%",
          borderRadius: 25,
          backgroundColor: "white",
          ...styles.shadow,
        }}
      >
        <View
          style={{
            height: TAB_HEADER_HEIGHT,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Tổng số kế hoạch:{" "}
            <Text style={{ color: "red" }}>{kehoach.length}</Text>
          </Text>
        </View>
        <View
          style={{
            height: BODY_CONTAINER_HEIGHT * 0.9 - TAB_HEADER_HEIGHT,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
          }}
        >
          <FlatList
            style={{
              width: "100%",

              // borderWidth: 1,
            }}
            data={kehoach}
            renderItem={renderKeHoach}
            keyExtractor={(item) => item.ID.toString()}
            // extraData={selectedId}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ...STYLE,
  thongtinKeHoach: {
    color: "red",
  },
});
export default Kehoachtuyensinh;
