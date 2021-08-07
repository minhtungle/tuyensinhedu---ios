import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Picker } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// Gọi các chức năng
import Baocao from "./Baocao";

const Hoso = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {},
    });
  });
  const data = route.params;

  const [kythi, setKyThi] = useState(0);
  const [hoso, setHoSo] = useState([
    {
      Ten: "HỒ SƠ ĐĂNG KÝ",
      TrangThai: 1,
      HienThi: true,
      Loai: [
        {
          Ten: "Trực tiếp",
          SoLuong: 0,
          DanhSach: [],
          HienThi: true,
        },
        {
          Ten: "Trực tuyến",
          SoLuong: 0,
          DanhSach: [],
          HienThi: false,
        },
      ],
    },
    {
      Ten: "HỒ SƠ CHỜ XÉT DUYỆT",
      TrangThai: 2,
      HienThi: false,
      Loai: [
        {
          Ten: "Trực tiếp",
          SoLuong: 0,
          DanhSach: [],
          HienThi: true,
        },
        {
          Ten: "Trực tuyến",
          SoLuong: 0,
          DanhSach: [],
          HienThi: false,
        },
      ],
    },
    {
      Ten: "HỒ SƠ TRÚNG TUYỂN",
      TrangThai: 3,
      HienThi: false,
      Loai: [
        {
          Ten: "Trực tiếp",
          SoLuong: 0,
          DanhSach: [],
          HienThi: true,
        },
        {
          Ten: "Trực tuyến",
          SoLuong: 0,
          DanhSach: [],
          HienThi: false,
        },
      ],
    },
    {
      Ten: "HỒ SƠ TRẢ LẠI",
      TrangThai: 4,
      HienThi: false,
      Loai: [
        {
          Ten: "Trực tiếp",
          SoLuong: 0,
          DanhSach: [],
          HienThi: true,
        },
        {
          Ten: "Trực tuyến",
          SoLuong: 0,
          DanhSach: [],
          HienThi: false,
        },
      ],
    },
  ]);
  //#region Picker
  const [picker, setPicker] = useState({
    KyThi: [
      {
        ID: 0,
        Ten: "Chọn kỳ thi",
      },
    ],
  });
  //* Call API kỳ thi
  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getkythi?tunam=0&dennam=0&cap=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            ID: 0,
            Ten: "Chọn kỳ thi",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: item.ID,
            Ten: item.TenKyThi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          KyThi: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          KyThi: [
            {
              ID: 0,
              Ten: "Chọn kỳ thi",
            },
          ],
        }));
      });
  }, [0]);
  //#endregion
  //#region Gọi dữ liệu hồ sơ
  useEffect(() => {}, []);
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
    setLoaiHienThi(_loaiHT);
  };
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
        {/*Chọn kỳ thi*/}
        <View style={styles.picker}>
          <Picker
            selectedValue={kythi}
            iosIcon={
              <MaterialCommunityIcons
                name={"menu-down"}
                size={23}
                color={"#0965B0"}
              />
            }
            style={{ width: "100%", height: TAB_HEADER_HEIGHT }}
            onValueChange={(itemValue, itemIndex) => setKyThi(itemValue)}
          >
            {picker.KyThi.map((item, index) => {
              return (
                <Picker.Item
                  key={index.toString()}
                  label={item.Ten}
                  value={item.ID}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      {/*Thanh lựa chọn chung*/}
      <Baocao {...{ hoso, setHoSo }} />
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
export default Hoso;
