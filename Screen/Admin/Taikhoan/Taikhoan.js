import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Picker, Spinner } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Taikhoan = ({ route, navigation }) => {
  const data = route.params;

  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.3;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;
  const [thongtin, setThongTin] = useState({
    UserInfo: {
      TenDangNhap: "",
      MatKhau: "",
      MaKieuNguoiDung: 0,
      TenKieuNguoiDung: "",
      HoTen: "",
      DiaChi: "",
      MaDonViSuDung: 0,
    },
    lstUserTypeInfo: [],
    lstUser: [],
  });
  const [loai, setLoai] = useState([
    {
      Ten: "Người dùng",
      TrangThai: 1,
      HienThi: true,
      DanhSach: [],
    },
    {
      Ten: "Kiểu người dùng",
      TrangThai: 2,
      HienThi: false,
      DanhSach: [],
    },
  ]);
  useEffect(() => {
    const manguoidung = data.MaNguoiDung;
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getuserinfo?iduser=${manguoidung}`
    )
      .then((res) => res.json())
      .then((responseJson) => {
        const _thongtin = responseJson.Result.data;
        setThongTin(_thongtin);
        const _kieunguoidung = responseJson.Result.data.lstUserTypeInfo;
        const _nguoidung = responseJson.Result.data.lstUser;
        const _loai = [...loai];
        _loai[0].DanhSach = _nguoidung.map((knd_item, knd_index) => ({
          ID: knd_index,
          ...knd_item,
        }));
        _loai[1].DanhSach = _kieunguoidung.map((nd_item, nd_index) => ({
          ID: nd_index,
          ...nd_item,
        }));
        setLoai(_loai);
      })
      .catch((e) => setThongTin({}));
  }, [0]);
  const ChuyenDoi_Loai = (_loai_index) => {
    let _loai = loai.map((loai_item, loai_index) =>
      loai_index == _loai_index
        ? {
            ...loai_item,
            HienThi: true,
          }
        : {
            ...loai_item,
            HienThi: false,
          }
    );
    // console.log(_hoso);
    setLoai(_loai);
  };

  const TaiKhoan = () => {
    return (
      <View
        style={{
          height: TOP_CONTAINER_HEIGHT,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          // borderWidth: 1,
        }}
      >
        <ScrollView
          style={{
            height: "90%",
            width: "90%",
            padding: 20,
            borderRadius: 25,
            backgroundColor: "white",
            ...styles.shadow,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {thongtin.UserInfo.HoTen}
          </Text>
          <View
            style={{
              // width: "100%",
              alignSelf: "center",
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              • Họ tên:{" "}
              <Text style={styles.thongtinTaiKhoan}>
                {thongtin.UserInfo.HoTen}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              • Tên đăng nhập:{" "}
              <Text style={styles.thongtinTaiKhoan}>
                {thongtin.UserInfo.TenDangNhap}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              • Tên kiểu người dùng:{" "}
              <Text style={styles.thongtinTaiKhoan}>
                {thongtin.UserInfo.TenKieuNguoiDung}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              • Địa chỉ:{" "}
              <Text style={styles.thongtinTaiKhoan}>
                {thongtin.UserInfo.DiaChi == ""
                  ? "Không có"
                  : thongtin.UserInfo.DiaChi}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  const DanhSach_NguoiDung = () => {
    return (
      <View
        style={{
          height: BODY_CONTAINER_HEIGHT,
          width: "100%",
          // borderWidth: 1,
        }}
      >
        {/*Thanh chọn loại*/}
        <View
          style={[
            styles.center,
            {
              height: TAB_HEADER_HEIGHT,
              flexDirection: "row",
              //borderWidth: 1
            },
          ]}
        >
          {loai.map((loai_item, loai_index) => {
            return (
              <TouchableOpacity
                key={loai_index.toString()}
                style={[
                  styles.center,
                  {
                    height: "100%",
                    width: `${100 / loai.length}%`,
                    backgroundColor: loai_item.HienThi ? "white" : "",
                    flexDirection: "column",
                    alignItems: "center",
                    // borderWidth: 1,
                  },
                ]}
                onPress={() => ChuyenDoi_Loai(loai_index)}
              >
                <Text
                  style={{
                    color: loai_item.HienThi ? "#0965B0" : "black",
                    fontWeight: "bold",
                  }}
                >
                  {loai_item.Ten}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name={"account-cog"}
                    color={loai_item.HienThi ? "#0965B0" : "black"}
                  />
                  <Text style={{ fontSize: 12, color: "red", paddingLeft: 5 }}>
                    {loai_item.DanhSach.length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <DanhSach />
      </View>
    );
  };
  const DanhSach = ({ item }) => {
    return loai.map((loai_item, loai_index) => {
      if (loai_item.HienThi) {
        // console.log(loai_item.DanhSach);
        return loai_item.TrangThai == 1 ? (
          <FlatList
            key={loai_index.toString()}
            style={{
              height: BODY_CONTAINER_HEIGHT - TAB_HEADER_HEIGHT,
              width: "100%",
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            data={loai_item.DanhSach}
            renderItem={({ item }) => (
              <View
                style={
                  (styles.center,
                  {
                    width: "100%",
                    minHeight: 150,
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
                      height: 150,
                      width: "100%",
                      backgroundColor: "#FEFFE2",
                      borderRadius: 20,
                      padding: 15,
                      justifyContent: "space-evenly",
                      // borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.HoTen}
                  </Text>
                  <View
                    style={{
                      // width: "100%",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      • Họ tên:{" "}
                      <Text style={styles.thongtinTaiKhoan}>{item.HoTen}</Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      • Tên đăng nhập:{" "}
                      <Text style={styles.thongtinTaiKhoan}>
                        {item.TenDangNhap}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      • Tên kiểu người dùng:{" "}
                      <Text style={styles.thongtinTaiKhoan}>
                        {item.TenKieuNguoiDung}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      • Địa chỉ:{" "}
                      <Text style={styles.thongtinTaiKhoan}>
                        {item.DiaChi == ""
                          ? "Không có"
                          : thongtin.UserInfo.DiaChi}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <FlatList
            key={loai_index.toString()}
            style={{
              height: BODY_CONTAINER_HEIGHT - TAB_HEADER_HEIGHT,
              width: "100%",
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            data={loai_item.DanhSach}
            renderItem={({ item }) => (
              <View
                style={
                  (styles.center,
                  {
                    width: "100%",
                    minHeight: 60,
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
                      height: 90,
                      width: "100%",
                      backgroundColor: "#FEFFE2",
                      borderRadius: 20,
                      padding: 15,
                      justifyContent: "space-evenly",
                      // borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    • Kiểu người dùng:{" "}
                    <Text style={styles.thongtinTaiKhoan}>
                      {item.KieuNguoiDung}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    • Số lượng:{" "}
                    <Text style={styles.thongtinTaiKhoan}>{item.SoLuong}</Text>
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      }
      return null;
    });
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
      <TaiKhoan />
      <DanhSach_NguoiDung />
    </View>
  );
};
const styles = StyleSheet.create({
  ...STYLE,
  thongtinTaiKhoan: {
    color: "red",
  },
});
export default Taikhoan;
