import { MaterialCommunityIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { Spinner } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tenmienDonVi } from "../../../assets/generalData";
// Gọi các chức năng
import Baocao from "./Baocao.js";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";
import Thongke from "./Thongke.js";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Kythi = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {},
    });
  });
  const data = route.params;

  const [kythi, setKyThi] = useState([]);
  //#region Kỳ thi
  //* Call API kỳ thi
  useEffect(() => {
    let namnay = new Date().getFullYear();
    // console.log(namnay);
    fetch(
      `${tenmienDonVi}/api/TSAPIService/getkythi?tunam=${namnay}&dennam=${namnay}&cap=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.Result.results);
        /* 0: Không có lịch trình e1701a
             1: Chưa đến thời gian 51c4d3
             2: Quá thời gian ce1212
             3: Trong thời gian
          */

        let arrData = responseJson.Result.results.map((item, index) => ({
          HienThi: false,

          ID: item.ID,
          Ten: item.TenKyThi,
          MaKyThi: item.MaKyThi,
          MaDonViSuDung: item.MaDonViSuDung,

          DiemSan: item.DiemSan,
          SoLuongNguyenVong:
            item.SoLuongHDT == null ? 0 : item.SoLuongNguyenVong,
          SoLuongHocSinh: item.SoLuongHDT == null ? 0 : item.SoLuongHocSinh,
          SoLuongHDT: item.SoLuongHDT == null ? 0 : item.SoLuongHDT,

          // DanhSachMonHoc: "1,3,4,11,12",
          // DanhSachLopHoc: "9",

          TrangThai_HienThi:
            item.TrangThai_HienThi == 0
              ? "Chưa có lịch trình"
              : item.TrangThai_HienThi == 2
              ? "Chưa đến thời gian"
              : item.TrangThai_HienThi == 3
              ? "Quá thời gian"
              : "Trong thời gian",

          ThoiGianBatDauThi:
            item.ThoiGianBatDauThi == null ? "Chưa có" : item.ThoiGianBatDauThi,
          ThoiGianDangKyThi:
            item.ThoiGianDangKyThi == null ? "Chưa có" : item.ThoiGianDangKyThi,
          ThoiGianToChucThi:
            item.ThoiGianToChucThi == null ? "Chưa có" : item.ThoiGianToChucThi,
          ThoiGianChamThi:
            item.ThoiGianChamThi == null ? "Chưa có" : item.ThoiGianChamThi,
          ThoiGianKetThucThi:
            item.ThoiGianKetThucThi == null
              ? "Chưa có"
              : item.ThoiGianKetThucThi,
          NgayTao: item.NgayTao == null ? "" : item.NgayTao,
          NgaySua: item.NgaySua == null ? "Chưa sửa" : item.NgaySua,
          NamHoc: item.NamHoc == null ? "" : item.NamHoc,
        }));
        arrData[0].HienThi = true;
        // console.log(arrData);
        setKyThi(arrData);
      })
      .catch((error) => {
        setKyThi([]);
      });
  }, [0]);
  //#endregion
  //#region Xử lý thanh chọn chung
  const [loaiHienThi, setLoaiHienThi] = useState([
    {
      Ten: "Báo cáo",
      TrangThai: true,
      Icon: "file-table",
      Style: {
        ...styles.loaiHienThi,

        borderRightWidth: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
    },
    {
      Ten: "Thống kê",
      TrangThai: false,
      Icon: "chart-bar",
      Style: {
        ...styles.loaiHienThi,

        borderLeftWidth: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      },
    },
  ]);
  const position = useState(new Animated.Value(0))[0];
  const Xem_BaoCao = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  const Xem_ThongKe = () => {
    Animated.timing(position, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  const ChuyenDoi_TrangThai_BCTK = (_loaiHT_item, _loaiHT_index) => {
    let _loaiHT = loaiHienThi.map((loaiHT_item, loaiHT_index) =>
      loaiHT_index == _loaiHT_index
        ? {
            ...loaiHT_item,
            TrangThai: true,
          }
        : {
            ...loaiHT_item,
            TrangThai: false,
          }
    );
    // Di chuyển sang báo cáo và thống kê
    _loaiHT_index == 0 ? Xem_BaoCao() : Xem_ThongKe();
    setLoaiHienThi(_loaiHT);
  };
  //#endregion
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
      }}
    >
      {/*Thanh lựa chọn chung*/}
      <View style={styles.center}>
        <View
          style={[
            styles.center,
            {
              height: TAB_HEADER_HEIGHT,
              backgroundColor: "white",
              flexDirection: "row",
              // borderWidth: 1,
            },
          ]}
        >
          {loaiHienThi.map((loaiHT_item, loaiHT_index) => (
            <TouchableOpacity
              key={loaiHT_index.toString()}
              style={{
                ...styles.center,
                ...loaiHT_item.Style,
                backgroundColor: loaiHT_item.TrangThai ? "#0965B0" : "white",
              }}
              onPress={() =>
                ChuyenDoi_TrangThai_BCTK(loaiHT_item, loaiHT_index)
              }
            >
              <Text
                style={{
                  color: loaiHT_item.TrangThai ? "white" : "#0965B0",
                }}
              >
                <MaterialCommunityIcons name={loaiHT_item.Icon} />{" "}
                {loaiHT_item.Ten}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Animated.View
        style={[
          {
            width: 2 * SCREEN_WIDTH,
            flexDirection: "row",
            transform: [
              {
                translateX: position,
              },
            ],
          },
        ]}
      >
        {/*Báo cáo*/}
        <Baocao {...{ kythi, setKyThi }} />
        {/*Thống kê*/}
        <Thongke {...{ kythi, setKyThi }} />
      </Animated.View>
    </View>
  );
};
export const styles = StyleSheet.create({
  ...STYLE,
  loaiHienThi: {
    width: "35%",
    height: 30,
    borderWidth: 1,
    borderColor: "#0965B0",
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    // borderWidth: 1,
    // paddingHorizontal: 10,
  },
});
export default Kythi;
