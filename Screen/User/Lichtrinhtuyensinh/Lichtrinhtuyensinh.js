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
import { tenmienDonVi } from "../../../assets/generalData";

export default function Lichtrinhtuyensinh({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Lịch trình tuyển sinh ",
    });
  });
  const [lichtrinh, setLichTrinh] = useState([]);
  const [kythi, setKyThi] = useState(0);
  const [picker, setPicker] = useState({
    KyThi: [
      {
        ID: 0,
        Ten: "Chọn kỳ thi",
        lstLT: [],
      },
    ],
    // KyThi: [...data],
  });

  useEffect(() => {
    fetch(`${tenmienDonVi}/api/TSAPIService/getlichtrinhtuyensinh`)
      .then((res) => res.json())
      .then((responseJson) => {
        setPicker((prevState) => ({
          ...prevState,
          KyThi: [
            {
              ID: 0,
              Ten: "Chọn kỳ thi",
              lstLT: [],
            },
            ...responseJson.Result.results,
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
              lstLT: [],
            },
          ],
        }));
      });
  }, []);
  // console.log(picker.KyThi);
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
        let _data = picker.KyThi.filter((lt) => lt.ID == kythi);
        return _data[0].lstLT.length > 0 ? (
          <Loaihinhlichtrinh {...{ _data }} />
        ) : null;
      })()}
    </View>
  );
}
const styles = StyleSheet.create({
  ...STYLE,
});
