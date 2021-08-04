import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
} from "react-native";
import { Button, Picker, Text, View } from "native-base";
const { height, width } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Dangnhap({ route, navigation }) {
  const [donvi, setDonVi] = useState([
    {
      ten: "Học sinh",
      trangthai: true,
      icon: "account-child",
      loai: 1,
    },
    {
      ten: "Trường",
      trangthai: false,
      icon: "account-box",
      loai: 2,
    },
    {
      ten: "PGD",
      trangthai: false,
      icon: "account-circle",
      loai: 3,
    },
    {
      ten: "SGD",
      trangthai: false,
      icon: "shield-account",
      loai: 4,
    },
  ]);
  const [thongtin, setThongTin] = useState({
    IDTinh: "",
    IDQuan: "",
    IDXa: "",
    IDTruong: "",
    CapTS: "",
    Taikhoan: "",
    Matkhau: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  //#region DropPicker: Dữ liệu - Thay đổi value khi chọn - Ràng buộc picker child với parent
  //* Dữ liệu trong dropDown
  const [picker, setPicker] = useState({
    IDTinh: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
    IDHuyen: [
      {
        id: "",
        name: "Chọn Quận/Huyện",
      },
    ],
    IDXa: [
      {
        id: "",
        name: "Chọn Phường/Xã",
      },
    ],
    IDTruong: [
      {
        id: "",
        name: "Chọn Trường",
      },
    ],
    CapTS: [
      {
        id: "",
        name: "Chọn cấp tuyển sinh",
      },
      {
        id: "0",
        name: "Mầm non",
      },
      {
        id: "1",
        name: "Cấp 1",
      },
      {
        id: "2",
        name: "Cấp 2",
      },
      {
        id: "3",
        name: "Cấp 3",
      },
    ],
  });
  //* Chọn giá trị cho Picker
  const changeValuePicker = (arg) => {
    setThongTin((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };
  //#endregion
  //#region API - Call:  tỉnh-huyện-xã
  //* Huyện + Trường:
  useEffect(() => {
    fetch(
      "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=1&level=1"
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
        const obj = responseJson.Result.results.filter(
          (item, index) => item.TenDiaChi.toString() === "Vĩnh Phúc"
        );
        // console.log(obj);
        // Reset dữ liệu tỉnh để nhận duy nhất tỉnh đang chọn từ đăng nhập
        arrData.length = 0;
        arrData.push({
          id: obj[0].ID,
          name: obj[0].TenDiaChi,
        });
        //console.log(obj[0].ID);
        setPicker((prevState) => ({
          ...prevState,
          IDTinh: arrData,
        }));
        // Set idTinh
        changeValuePicker({ IDTinh: obj[0].ID });
        // Set lại IDHuyen và IDXa
        changeValuePicker({ IDHuyen: "", IDXa: "" });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyen: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
          IDXa: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
        // Gọi dữ liệu Quận/Huyện của Tỉnh
        fetch(
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${obj[0].ID}&level=2`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log(responseJson);
            const arrData = [
              {
                id: "",
                name: "Chọn Quận/Huyện",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                id: item.ID,
                name: item.TenDiaChi,
              };
              arrData.push(obj);
            });
            setPicker((prevState) => ({
              ...prevState,
              IDHuyen: arrData,
            }));
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              IDHuyen: [
                {
                  id: "",
                  name: "Chọn Quận/Huyện",
                },
              ],
            }));
          });
        //console.log(obj);
        // GỌi dữ liệu Trường của Tỉnh
        fetch(
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${obj[0].ID}&idquanhuyen=${thongtin.IDHuyen}&idphuongxa=${thongtin.IDXa}&cap=${thongtin.CapTS}`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const arrData = [
              {
                id: "",
                name: "Chọn Trường",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                id: item.ID,
                name: item.TenTruong,
              };
              arrData.push(obj);
            });
            setPicker((prevState) => ({
              ...prevState,
              IDTruong: arrData,
            }));
            //console.log(arrData);
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              IDTruong: [
                {
                  id: "",
                  name: "Chọn Trường",
                },
              ],
            }));
          });
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
  //* Huyện
  useEffect(() => {
    setPicker((prevState) => ({
      ...prevState,
      IDHuyen: [
        {
          id: "",
          name: "Chọn Quận/Huyện",
        },
      ],
      IDXa: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${thongtin.IDTinh}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDHuyen: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDHuyen: [
            {
              id: "",
              name: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [thongtin.IDTinh]);
  //* Xã
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXa: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXa: [
        {
          id: "",
          name: "Chọn Phường/Xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${thongtin.IDHuyen}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDXa: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDXa: [
            {
              id: "",
              name: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [thongtin.IDHuyen]);
  //* Trường
  useEffect(() => {
    //! Cứ khi ID huyện || phường || cấp thay đổi thì set id và picker trường về null
    changeValuePicker({ IDTruong: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDTruong: [
        {
          id: "",
          name: "Chọn Trường",
        },
      ],
    }));
    //console.log(thongtin);
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${thongtin.IDTinh}&idquanhuyen=${thongtin.IDHuyen}&idphuongxa=${thongtin.IDXa}&cap=${thongtin.CapTS}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Trường",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenTruong,
          };
          arrData.push(obj);
        });
        //console.log(arrData);
        setPicker((prevState) => ({
          ...prevState,
          IDTruong: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          IDTruong: [
            {
              id: "",
              name: "Chọn Trường",
            },
          ],
        }));
      });
  }, [thongtin.IDHuyen, thongtin.IDXa, thongtin.CapTS]);
  //#endregion
  const Chon_DonVi = (_donvi_item, _donvi_index) => {
    let _donvi = donvi.map((donvi_item, donvi_index) =>
      donvi_index == _donvi_index
        ? {
            ...donvi_item,
            trangthai: true,
          }
        : {
            ...donvi_item,
            trangthai: false,
          }
    );
    setDonVi(_donvi);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.chonDonVi}>
        {donvi.map((donvi_item, donvi_index) => (
          <TouchableOpacity
            key={donvi_index.toString()}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Chon_DonVi(donvi_item, donvi_index)}
          >
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: donvi_item.trangthai ? "tomato" : "white",
                  ...styles.shadow,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={
                  donvi_item.trangthai
                    ? donvi_item.icon
                    : `${donvi_item.icon}-outline`
                }
                size={30}
                color={donvi_item.trangthai ? "white" : "tomato"}
              />
            </View>
            <Text
              style={{
                marginTop: 10,
                color: donvi_item.trangthai ? "tomato" : "black",
                fontWeight: donvi_item.trangthai ? "bold" : "500",
                // fontSize: donvi_item.trangthai ? "18" : "",
              }}
            >
              {donvi_item.ten}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.thongTinDangNhap}>
        <View
          style={{
            width: "90%",
            // height: "90%",
            paddingVertical: 20,
            minHeight: "35%",
            marginBottom: 25,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "space-between",
            ...styles.shadow,
            backgroundColor: "white",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!donvi[0].trangthai ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!donvi[3].trangthai && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/*// Tỉnh thành phố */}
                    <View
                      style={[styles.field, { zIndex: 11001, display: "none" }]}
                    >
                      {thongtin.IDTinh == "" || null ? null : (
                        <View style={styles.label}>
                          <MaterialCommunityIcons
                            name={"check"}
                            size={16}
                            color={"white"}
                          />
                        </View>
                      )}
                      <Picker
                        selectedValue={thongtin.IDTinh}
                        // iosIcon={
                        //   <MaterialCommunityIcons
                        //     name={"menu-down"}
                        //     size={23}
                        //     color={"black"}
                        //   />
                        // }
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                          changeValuePicker({ IDTinh: itemValue })
                        }
                      >
                        {picker.IDTinh.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index.toString()}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {/*// Quận huyện */}
                    <View
                      style={[
                        styles.field,
                        { zIndex: 11001, ...styles.shadow },
                      ]}
                    >
                      {thongtin.IDHuyen == "" || null ? null : (
                        <View style={styles.label}>
                          <MaterialCommunityIcons
                            name={"check"}
                            size={16}
                            color={"white"}
                          />
                        </View>
                      )}
                      <Picker
                        selectedValue={thongtin.IDHuyen}
                        // iosIcon={
                        //   <MaterialCommunityIcons
                        //     name={"menu-down"}
                        //     size={23}
                        //     color={thongtin.IDHuyen == "" || null ? "tomato" : "#61b15a"}
                        //   />
                        // }
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                          changeValuePicker({ IDHuyen: itemValue })
                        }
                      >
                        {picker.IDHuyen.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index.toString()}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {!donvi[2].trangthai && (
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/*// Phường xã */}
                        <View
                          style={[
                            styles.field,
                            { zIndex: 11001, ...styles.shadow },
                          ]}
                        >
                          {thongtin.IDXa == "" || null ? null : (
                            <View style={styles.label}>
                              <MaterialCommunityIcons
                                name={"check"}
                                size={16}
                                color={"white"}
                              />
                            </View>
                          )}
                          <Picker
                            selectedValue={thongtin.IDXa}
                            // iosIcon={
                            //   <MaterialCommunityIcons
                            //     name={"menu-down"}
                            //     size={23}
                            //     color={thongtin.IDXa == "" || null ? "tomato" : "#61b15a"}
                            //   />
                            // }
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                              changeValuePicker({ IDXa: itemValue })
                            }
                          >
                            {picker.IDXa.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index.toString()}
                                  label={item.name}
                                  value={item.id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                        {/*// Cấp tuyển sinh */}
                        <View
                          style={[
                            styles.field,
                            { zIndex: 11001, ...styles.shadow },
                          ]}
                        >
                          {thongtin.CapTS == "" || null ? null : (
                            <View style={styles.label}>
                              <MaterialCommunityIcons
                                name={"check"}
                                size={16}
                                color={"white"}
                              />
                            </View>
                          )}
                          <Picker
                            selectedValue={thongtin.CapTS}
                            // iosIcon={
                            //   <MaterialCommunityIcons
                            //     name={"menu-down"}
                            //     size={23}
                            //     color={thongtin.CapTS == "" || null ? "tomato" : "#61b15a"}
                            //   />
                            // }
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                              changeValuePicker({ CapTS: itemValue })
                            }
                          >
                            {picker.CapTS.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index.toString()}
                                  label={item.name}
                                  value={item.id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                        {/*// Trường */}
                        <View
                          style={[
                            styles.field,
                            { zIndex: 11001, ...styles.shadow },
                          ]}
                        >
                          {thongtin.IDTruong == "" ? null : (
                            <View style={styles.label}>
                              <MaterialCommunityIcons
                                name={"check"}
                                size={16}
                                color={"white"}
                              />
                            </View>
                          )}
                          <Picker
                            selectedValue={thongtin.IDTruong}
                            // iosIcon={
                            //   <MaterialCommunityIcons
                            //     name={"menu-down"}
                            //     size={23}
                            //     color={thongtin.IDTruong == "" || null ? "tomato" : "#61b15a"}
                            //   />
                            // }
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                              changeValuePicker({ IDTruong: itemValue })
                            }
                          >
                            {picker.IDTruong.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index.toString()}
                                  label={item.name}
                                  value={item.id}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      </View>
                    )}
                  </View>
                )}

                {/*// Tài khoản */}
                <View
                  style={[
                    styles.field,
                    { zIndex: 11001, marginTop: 20, ...styles.shadow },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={"Nhập tài khoản"}
                    onChangeText={(value) =>
                      changeValuePicker({ Taikhoan: value })
                    }
                  >
                    {thongtin.Taikhoan}
                  </TextInput>
                </View>
                {/*// Mật khẩu */}
                <View
                  style={[styles.field, { zIndex: 11001, ...styles.shadow }]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={"Nhập mật khẩu"}
                    numberOfLines={1}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(value) =>
                      changeValuePicker({ MatKhau: value })
                    }
                  >
                    {thongtin.MatKhau}
                  </TextInput>
                  <MaterialCommunityIcons
                    name={secureTextEntry ? "eye" : "eye-off"}
                    size={24}
                    color={"tomato"}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.field,
                  { zIndex: 11001, marginTop: 20, ...styles.shadow },
                ]}
              >
                <View style={styles.label}>
                  <MaterialCommunityIcons
                    name={"check"}
                    size={16}
                    color={"white"}
                  />
                </View>
                <Text style={[styles.input, {}]}>Tỉnh Vĩnh Phúc</Text>
              </View>
            )}
            {/*// Đăng nhập */}
            <Button
              style={[
                styles.dangNhap,
                {
                  height: 50,
                  ...styles.shadow,
                },
              ]}
              onPress={() => navigation.navigate("Trang chủ")}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontWeight: "bold",
                  right: -3,
                  // borderWidth: 1,
                }}
              >
                Đăng nhập
              </Text>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "white",
                  ...styles.shadow,
                }}
              >
                <MaterialCommunityIcons
                  name={secureTextEntry ? "lock" : "lock-open"}
                  size={24}
                  color={"tomato"}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              </View>
            </Button>
          </View>
          <View
            style={
              {
                // borderWidth: 1,
              }
            }
          >
            <Text
              style={{
                fontSize: 12,
              }}
            >
              Quên mật khẩu.{" "}
              <Text
                style={{
                  fontSize: 12,
                  color: "blue",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                }}
              >
                Nhấn để lấy lại
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const marginAvatar = 10;
const sumAvatar = 4;
const gridAvatar = ((width - 2 * marginAvatar * sumAvatar) * 0.88) / sumAvatar; // (width - 2 * margin * count) / count
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: gridAvatar,
    height: gridAvatar,
    marginHorizontal: marginAvatar,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // backgroundColor: "tomato",
  },
  chonDonVi: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
  },
  thongTinDangNhap: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 1,
  },
  input: {
    fontSize: 18,
    paddingLeft: 15,
    flexGrow: 1,
  },
  dangNhap: {
    borderRadius: 25,
    alignSelf: "flex-end",
    marginVertical: 20,
    marginRight: "5%",
    backgroundColor: "tomato",
    flexDirection: "row",
    // paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
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
  field: {
    width: "90%",
    paddingRight: "7%",
    height: 50,

    alignItems: "center",
    borderColor: "white",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 5,
    marginBottom: 10,
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "white",
    // borderWidth: 1,
  },
  label: {
    alignSelf: "center",
    backgroundColor: "#61b15a",
    borderRadius: 25,
    marginLeft: 10,
  },
  picker: {
    flexGrow: 1,
    width: 310,
    // borderWidth: 1,
  },
});
