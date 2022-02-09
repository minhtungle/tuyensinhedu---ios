import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Picker, Spinner } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loaihinhlichtrinh from "./Loaihinhlichtrinh";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";

export default function Lichtrinhtuyensinh({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Lịch trình tuyển sinh ",
    });
  });
  const data = [
    {
      ID: 61,
      Ten: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
      lstLT: [
        {
          ID: 61,
          IDKyThi: 87,
          ThoiGian: "01/02/2022",
          IDNoiDung: 1,
          TenKyThi: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 0,
        },
        {
          ID: 61,
          IDKyThi: 87,
          ThoiGian: "10/01/2022-30/01/2022",
          IDNoiDung: 2,
          TenKyThi: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 0,
        },
        {
          ID: 61,
          IDKyThi: 87,
          ThoiGian: "10/01/2022-10/02/2022",
          IDNoiDung: 3,
          TenKyThi: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 0,
        },
        {
          ID: 61,
          IDKyThi: 87,
          ThoiGian: "01/01/2021",
          IDNoiDung: 7,
          TenKyThi: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 0,
        },
        {
          ID: 61,
          IDKyThi: 87,
          ThoiGian: "01/01/2021",
          IDNoiDung: 8,
          TenKyThi: "Kỳ tuyển sinh mầm non đối với trẻ 1 - 3 tuổi",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 0,
        },
      ],
    },
    {
      ID: 62,
      Ten: "Kỳ tuyển sinh vào lớp 1",
      lstLT: [
        {
          ID: 62,
          IDKyThi: 88,
          ThoiGian: "10/02/2022",
          IDNoiDung: 1,
          TenKyThi: "Kỳ tuyển sinh vào lớp 1",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "14/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 1,
        },
        {
          ID: 62,
          IDKyThi: 88,
          ThoiGian: "10/01/2022-10/02/2022",
          IDNoiDung: 2,
          TenKyThi: "Kỳ tuyển sinh vào lớp 1",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "14/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 1,
        },
        {
          ID: 62,
          IDKyThi: 88,
          ThoiGian: "10/01/2022-10/02/2022",
          IDNoiDung: 3,
          TenKyThi: "Kỳ tuyển sinh vào lớp 1",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "14/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 1,
        },
        {
          ID: 62,
          IDKyThi: 88,
          ThoiGian: "10/02/2022",
          IDNoiDung: 7,
          TenKyThi: "Kỳ tuyển sinh vào lớp 1",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "14/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 1,
        },
        {
          ID: 62,
          IDKyThi: 88,
          ThoiGian: "10/02/2022",
          IDNoiDung: 8,
          TenKyThi: "Kỳ tuyển sinh vào lớp 1",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "14/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 1,
        },
      ],
    },
    {
      ID: 63,
      Ten: "Kỳ tuyển sinh vào lớp 6",
      lstLT: [
        {
          ID: 63,
          IDKyThi: 89,
          ThoiGian: "10/02/2022",
          IDNoiDung: 1,
          TenKyThi: "Kỳ tuyển sinh vào lớp 6",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 2,
        },
        {
          ID: 63,
          IDKyThi: 89,
          ThoiGian: "10/01/2022-10/02/2022",
          IDNoiDung: 2,
          TenKyThi: "Kỳ tuyển sinh vào lớp 6",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 2,
        },
        {
          ID: 63,
          IDKyThi: 89,
          ThoiGian: "10/01/2022-10/02/2022",
          IDNoiDung: 3,
          TenKyThi: "Kỳ tuyển sinh vào lớp 6",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 2,
        },
        {
          ID: 63,
          IDKyThi: 89,
          ThoiGian: "10/02/2022",
          IDNoiDung: 7,
          TenKyThi: "Kỳ tuyển sinh vào lớp 6",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 2,
        },
        {
          ID: 63,
          IDKyThi: 89,
          ThoiGian: "10/02/2022",
          IDNoiDung: 8,
          TenKyThi: "Kỳ tuyển sinh vào lớp 6",
          ThoiGianBatDauThi: "14/10/2021",
          ThoiGianKetThucThi: "17/10/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 2,
        },
      ],
    },
    {
      ID: 65,
      Ten: "Kế họach tuyển sinh vào lớp 10",
      lstLT: [
        {
          ID: 65,
          IDKyThi: 91,
          ThoiGian: "28/01/2022",
          IDNoiDung: 1,
          TenKyThi: "Kế họach tuyển sinh vào lớp 10",
          ThoiGianBatDauThi: "21/01/2022",
          ThoiGianKetThucThi: "28/08/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 3,
        },
        {
          ID: 65,
          IDKyThi: 91,
          ThoiGian: "28/01/2022-28/03/2022",
          IDNoiDung: 2,
          TenKyThi: "Kế họach tuyển sinh vào lớp 10",
          ThoiGianBatDauThi: "21/01/2022",
          ThoiGianKetThucThi: "28/08/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 3,
        },
        {
          ID: 65,
          IDKyThi: 91,
          ThoiGian: "28/01/2022-28/03/2022",
          IDNoiDung: 3,
          TenKyThi: "Kế họach tuyển sinh vào lớp 10",
          ThoiGianBatDauThi: "21/01/2022",
          ThoiGianKetThucThi: "28/08/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 3,
        },
        {
          ID: 65,
          IDKyThi: 91,
          ThoiGian: "25/06/2022",
          IDNoiDung: 7,
          TenKyThi: "Kế họach tuyển sinh vào lớp 10",
          ThoiGianBatDauThi: "21/01/2022",
          ThoiGianKetThucThi: "28/08/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 3,
        },
        {
          ID: 65,
          IDKyThi: 91,
          ThoiGian: "28/06/2022",
          IDNoiDung: 8,
          TenKyThi: "Kế họach tuyển sinh vào lớp 10",
          ThoiGianBatDauThi: "21/01/2022",
          ThoiGianKetThucThi: "28/08/2022",
          NamHoc: 2022,
          DoiTuongTuyenSinh: 3,
        },
      ],
    },
  ];
  const [lichtrinh, setLichTrinh] = useState([]);
  const [kythi, setKyThi] = useState(0);
  const [picker, setPicker] = useState({
    // KyThi: [
    //   {
    //     ID: 0,
    //     Ten: "Chọn kỳ thi",
    //     lstLT: [],
    //   },
    // ],
    KyThi: [...data],
  });

  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getlichtrinhtuyensinh`
    )
      .then((res) => res.json())
      .then((responseJson) => {
        setPicker((prevState) => ({
          ...prevState,
          KyThi: [
            {
              ID: 0,
              Ten: "Chọn kỳ thi",
            },
            ...responseJson.Result.result,
          ],
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
  }, []);
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
    <View style={styles.container}>
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
          style={{ width: "100%", height: 50 }}
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
      {(() => {
        let _data = data.filter((lt) => lt.ID == kythi);
        return _data.length > 0 ? <Loaihinhlichtrinh {...{ _data }} /> : null;
      })()}
    </View>
  );
}
const styles = StyleSheet.create({
  ...STYLE,
});
