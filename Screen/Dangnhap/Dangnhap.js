import { Button, Picker, View, Text } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Colors, IconButton } from "react-native-paper";

const height = Dimensions.get("window").height;

export default function Dangnhap({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [data, setData] = useState({
    Tinh: "Chọn Tỉnh/Thành phố",
  });

  //#region Picker
  const [picker, setPicker] = useState({
    IDTinh: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
  });
  //* Chọn giá trị cho Picker
  const changeValuePicker = (arg) => {
    setData((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };
  //#endregion

  //#region API - Call
  //* Tỉnh:
  useEffect(() => {
    fetch(
      "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=1&level=1",
      // "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=1&level=1",
      {
        method: "get",
        headers: new Headers(),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        const arrData = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          // console.log(item.TenDiaChi);
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDTinh: arrData,
        }));
      })
      .catch((error) => {
        const arrDataFail = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        setPicker((prevState) => ({
          ...prevState,
          IDTinh: arrDataFail,
        }));
      });
  }, [0]);
  //#endregion

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          zIndex: -1,
        }}
        blurRadius={1.5}
      >
        <StatusBar hidden />
        <View
          style={{
            width: "100%",
            height: height / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{
              borderRadius: 100,
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: height / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[styles.field, { marginHorizontal: 10 }]}>
            {data.Tinh == "Chọn Tỉnh/Thành phố" ? null : (
              <View style={styles.label}>
                <IconButton
                  style={{ backgroundColor: "#61b15a" }}
                  icon="check"
                  color="#FFFF"
                  size={10}
                />
              </View>
            )}
            <Picker
              selectedValue={data.Tinh}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                changeValuePicker({ Tinh: itemValue })
              }
              dropdownIconColor={
                data.IDTinh == "" || null ? Colors.red500 : "#61b15a"
              }
            >
              {picker.IDTinh.map((item, index) => {
                return (
                  <Picker.Item
                    key={index.toString()}
                    label={item.name}
                    value={item.name}
                  />
                );
              })}
            </Picker>
          </View>
          {data.Tinh !== "Chọn Tỉnh/Thành phố" && (
            <Button
              round
              style={styles.button}
              onPress={() =>
                navigation.navigate("Trang chủ", { Tinh: data.Tinh })
              }
            >
              <Text>Đăng nhập</Text>
            </Button>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  field: {
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 5,
    marginBottom: "2%",
    flexDirection: "row",

    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  label: {
    alignSelf: "center",
    // marginRight: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    flexGrow: 1,
  },
  button: {
    height: 50,
    width: 150,
    borderRadius: 25,
    alignSelf: "center",
    textShadowColor: "black",
    backgroundColor: "#61b15a",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
