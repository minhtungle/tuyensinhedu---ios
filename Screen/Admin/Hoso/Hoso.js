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
} from "react-native";
import { Picker } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// Gọi các chức năng
import Baocao from "./Baocao";
import Thongke from "./Thongke";

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
    let doituong = data.DoiTuong;
    let cap = 0;
    if (doituong == 2 || doituong == 3) {
      cap = 2;
    } else {
      cap = 3;
    }
    let namnay = new Date().getFullYear();
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getkythi?tunam=${namnay}&dennam=${namnay}&cap=${cap}`
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
  const GET_API = async (url) => {
    try {
      const res = await fetch(url);
      const responseJson = await res.json();
      return responseJson;
    } catch (e) {
      console.log(e);
      alert(e);
      return (responseJson = {});
    }
  };
  useEffect(() => {
    if (kythi != 0) {
      (async () => {
        const doituong = data.DoiTuong;

        let url = "";
        let idtinh = 0;
        const tinh = JSON.parse(data.Tinh);
        idtinh = tinh.ID;

        let idtruong = 0;
        let idquan = 0;
        let idphuong = 0;
        let idkythi = kythi;
        let cap = 0;

        let solieu_Hoso = []; // Số liệu hồ sơ các loại
        let danhsach_Hoso = []; // Danh sách hồ sơ các loại

        let res = {}; // Kết quả CALL API

        // Đối tượng đăng nhập là Trường
        if (doituong == 2) {
          const truong = JSON.parse(data.Truong);
          idtruong = truong.ID;
          idtruong = 0;
          url = `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getallhoso?cap=${cap}&idtinh=${idtinh}&idquan=${idquan}&idphuong=${idphuong}&idtruong=${idtruong}&idkythi=${idkythi}`;

          console.log(url);
          res = await GET_API(url);
        }
        // Đối tượng đăng nhập là PGD
        else if (doituong == 3) {
          const pgd = JSON.parse(data.PGD);
          idtruong = pgd.ID;
          cap = 2;
          url = `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getallhoso?cap=${cap}&idtinh=${idtinh}&idquan=${idquan}&idphuong=${idphuong}&idtruong=${idtruong}&idkythi=${idkythi}`;

          res = await GET_API(url);
        }
        // Đối tượng đăng nhập là SGD
        else if (doituong == 4) {
          cap = 3;
          url = `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getallhoso?cap=${cap}&idtinh=${idtinh}&idquan=${idquan}&idphuong=${idphuong}&idtruong=${idtruong}&idkythi=${idkythi}`;

          res = await GET_API(url);
        }
        solieu_Hoso = res.Result.data.lstHoSoGroup_TrangThai;
        danhsach_Hoso = res.Result.data.lstHoSo;
        // console.log(danhsach_Hoso);
        solieu_Hoso.map((solieu_item, solieu_index) => {
          //Tạo bản sao hồ sơ
          const _hoso = [...hoso];
          //Gán số liệu hồ sơ tương ứng cho loại hồ sơ cùng trạng thái
          _hoso[solieu_item.TrangThai - 1].Loai[0].SoLuong =
            solieu_item.HoSoTrucTiep; // Trực tiếp
          _hoso[solieu_item.TrangThai - 1].Loai[1].SoLuong =
            solieu_item.HoSoOnline; // Trực tuyến
          setHoSo(_hoso);
        });

        // Xoá toàn bộ danh sách hồ sơ các loại
        const _hoso = [...hoso];
        _hoso.map((hoso_item, hoso_index) =>
          hoso_item.Loai.map(
            (loai_hoso_item, loai_hoso_index) =>
              (loai_hoso_item.DanhSach.length = 0)
          )
        );
        setHoSo(_hoso);
        // Có hồ sơ thì gán hô sơ vào danh sách hồ sơ các loại tương ứng
        danhsach_Hoso.map((ds_item, ds_index) => {
          // Tạo bản sao hồ sơ
          const _hoso = [...hoso];
          // Gán số liệu hồ sơ tương ứng cho loại hồ sơ cùng trạng thái
          if (ds_item.LaHoSoTrucTiep) {
            // _hoso[ds_item.TrangThai - 1].Loai[0].DanhSach.length = 0;
            _hoso[ds_item.TrangThai - 1].Loai[0].DanhSach.push(ds_item);
          } else {
            // _hoso[ds_item.TrangThai - 1].Loai[1].DanhSach.length = 0;
            _hoso[ds_item.TrangThai - 1].Loai[1].DanhSach.push(ds_item);
          }
          setHoSo(_hoso);
        });
      })();
    }
  }, [kythi]);
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
        <Baocao {...{ hoso, setHoSo }} />
        {/*Thống kê*/}
        <Thongke {...{ hoso, setHoSo }} />
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
export default Hoso;
