import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Picker, Text, View, Spinner } from "native-base";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
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
    Tinh: JSON.stringify({
      ID: 5351,
      MaDonViSuDung: 202,
      Ten: "Vĩnh Phúc",
    }),
    Huyen: JSON.stringify({
      ID: "",
      MaDonViSuDung: 0,
      Ten: "Chọn Quận/Huyện",
    }),
    Xa: JSON.stringify({
      ID: "",
      MaDonViSuDung: 0,
      Ten: "Chọn Phường/Xã",
    }),
    Truong: JSON.stringify({
      ID: 0,
      MaDonViSuDung: 0,
      Ten: "Chọn Trường",
    }),
    PGD: JSON.stringify({
      ID: 0,
      MaDonViSuDung: 0,
      Ten: "Chọn Phòng GD&ĐT",
    }),
    SGD: JSON.stringify({
      ID: 0,
      MaDonViSuDung: 0,
      Ten: "Chọn Sở GD&ĐT",
    }),
    Cap: "",
    TenDangNhap: "",
    MatKhau: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  //#region DropPicker: Dữ liệu - Thay đổi value khi chọn - Ràng buộc picker child với parent
  //* Dữ liệu trong dropDown
  const [picker, setPicker] = useState({
    Tinh: [
      {
        ID: 0,
        Ten: "Chọn Tỉnh/Thành phố",
      },
    ],
    Huyen: [
      {
        ID: 0,
        name: "Chọn Quận/Huyện",
      },
    ],
    Xa: [
      {
        ID: 0,
        name: "Chọn Phường/Xã",
      },
    ],
    Truong: [
      {
        ID: 0,
        MaDonViSuDung: 0,
        Ten: "Chọn Trường",
      },
    ],
    SGD: [
      {
        ID: 0,
        MaDonViSuDung: 0,
        Ten: "Chọn Sở GD&ĐT",
      },
    ],
    Cap: [
      {
        ID: "",
        Ten: "Chọn Cấp",
      },
      {
        ID: "0",
        Ten: "Mầm non",
      },
      {
        ID: "1",
        Ten: "Cấp 1",
      },
      {
        ID: "2",
        Ten: "Cấp 2",
      },
      {
        ID: "3",
        Ten: "Cấp 3",
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
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Tỉnh/Thành phố",
          },
        ];
        // Chỉ chọn ra tỉnh Vĩnh Phúc
        const obj = responseJson.Result.results.filter(
          (item, index) => item.ID === 5351 // ID tỉnh Vĩnh Phúc
        );
        // console.log(obj);
        // Reset dữ liệu tỉnh để nhận duy nhất tỉnh đang chọn từ đăng nhập
        // arrData.length = 0;
        arrData.push({
          ID: obj[0].ID,
          MaDonViSuDung: obj[0].MaDonViSuDung,
          Ten: obj[0].TenDiaChi,
        });
        //console.log(obj[0]);
        setPicker((prevState) => ({
          ...prevState,
          Tinh: arrData,
        }));
        // Set thong tin Tinh mặc định
        changeValuePicker({
          Tinh: JSON.stringify({
            ID: 5351,
            MaDonViSuDung: 202,
            Ten: "Vĩnh Phúc",
          }),
        });
        // Set lại thông tin Huyen và Xa
        changeValuePicker({
          Huyen: JSON.stringify({
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Quận/Huyện",
          }),
          Xa: JSON.stringify({
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Phường/Xã",
          }),
        });
        setPicker((prevState) => ({
          ...prevState,
          Huyen: [
            {
              ID: "",
              MaDonViSuDung: 0,
              Ten: "Chọn Quận/Huyện",
            },
          ],
          Xa: [
            {
              ID: "",
              MaDonViSuDung: 0,
              Ten: "Chọn Phường/Xã",
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
                ID: "",
                MaDonViSuDung: 0,
                Ten: "Chọn Quận/Huyện",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                ID: item.ID,
                MaDonViSuDung: item.MaDonViSuDung,
                Ten: item.TenDiaChi,
              };
              arrData.push(obj);
            });
            setPicker((prevState) => ({
              ...prevState,
              Huyen: arrData,
            }));
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              Huyen: [
                {
                  ID: "",
                  MaDonViSuDung: 0,
                  Ten: "Chọn Quận/Huyện",
                },
              ],
            }));
          });
        // GỌi dữ liệu Trường của Tỉnh
        fetch(
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${obj[0].ID}&idquanhuyen=&idphuongxa=&cap=${thongtin.Cap}`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const arrData = [
              {
                ID: 0,
                MaDonViSuDung: 0,
                Ten: "Chọn Trường",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                ID: item.ID,
                MaDonViSuDung: item.MaDonViSuDung,
                Ten: item.TenTruong,
              };
              arrData.push(obj);
            });
            // console.log(arrData);
            setPicker((prevState) => ({
              ...prevState,
              Truong: arrData,
            }));
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              Truong: [
                {
                  ID: 0,
                  MaDonViSuDung: 0,
                  Ten: "Chọn Trường",
                },
              ],
            }));
          });
        // GỌi dữ liệu Phòng của Tỉnh
        fetch(
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${obj[0].ID}&idquanhuyen=&idphuongxa=&cap=4`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const arrData = [
              {
                ID: 0,
                MaDonViSuDung: 0,
                Ten: "Chọn Phòng GD&ĐT",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                ID: item.ID,
                MaDonViSuDung: item.MaDonViSuDung,
                Ten: item.TenTruong,
              };
              arrData.push(obj);
            });
            setPicker((prevState) => ({
              ...prevState,
              PGD: arrData,
            }));
            //console.log(arrData);
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              PGD: [
                {
                  ID: 0,
                  MaDonViSuDung: 0,
                  Ten: "Chọn Phòng GD&ĐT",
                },
              ],
            }));
          });
        // GỌi dữ liệu SỞ của Tỉnh
        fetch(
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${obj[0].ID}&idquanhuyen=&idphuongxa=&cap=5`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const arrData = [
              {
                ID: 0,
                MaDonViSuDung: 0,
                Ten: "Chọn Sở GD&ĐT",
              },
            ];
            responseJson.Result.results.map((item, index) => {
              const obj = {
                ID: item.ID,
                MaDonViSuDung: item.MaDonViSuDung,
                Ten: item.TenTruong,
              };
              arrData.push(obj);
            });
            setPicker((prevState) => ({
              ...prevState,
              SGD: arrData,
            }));
            // Set thong tin Sở mặc định
            changeValuePicker({
              SGD: JSON.stringify({
                ID: 6167,
                MaDonViSuDung: 241,
                Ten: "Sở GD&ĐT Vĩnh Phúc",
              }),
            });
            //console.log(arrData);
          })
          .catch((error) => {
            setPicker((prevState) => ({
              ...prevState,
              SGD: [
                {
                  ID: 0,
                  MaDonViSuDung: 0,
                  Ten: "Chọn Sở GD&ĐT",
                },
              ],
            }));
          });
      })
      .catch((error) => {
        const arrDataFail = [
          {
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Tỉnh/Thành phố",
          },
        ];
        setPicker((prevState) => ({
          ...prevState,
          Tinh: arrDataFail,
        }));
      });
  }, [0]);
  //* Huyện
  useEffect(() => {
    setPicker((prevState) => ({
      ...prevState,
      Huyen: [
        {
          ID: "",
          MaDonViSuDung: 0,
          Ten: "Chọn Quận/Huyện",
        },
      ],
      Xa: [
        {
          ID: "",
          MaDonViSuDung: 0,
          Ten: "Chọn Phường/Xã",
        },
      ],
    }));
    //! Lấy thông tin Tinh - Huyen - Xa
    let tinh = JSON.parse(thongtin.Tinh);
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${tinh.ID}&level=2`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Quận/Huyện",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: item.ID,
            MaDonViSuDung: item.MaDonViSuDung,
            Ten: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          Huyen: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          Huyen: [
            {
              ID: "",
              MaDonViSuDung: 0,
              Ten: "Chọn Quận/Huyện",
            },
          ],
        }));
      });
  }, [thongtin.Tinh]);
  //* Xã
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({
      Xa: JSON.stringify({
        ID: "",
        MaDonViSuDung: 0,
        Ten: "Chọn Phường/Xã",
      }),
    });
    setPicker((prevState) => ({
      ...prevState,
      Xa: [
        {
          ID: "",
          MaDonViSuDung: 0,
          Ten: "Chọn Phường/Xã",
        },
      ],
    }));
    //! Lấy thông tin Tinh - Huyen - Xa
    let huyen = JSON.parse(thongtin.Huyen);
    // console.log(huyen);
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${huyen.ID}&level=3`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            ID: "",
            MaDonViSuDung: 0,
            Ten: "Chọn Phường/Xã",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: item.ID,
            MaDonViSuDung: item.MaDonViSuDung,
            Ten: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          Xa: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          Xa: [
            {
              ID: "",
              MaDonViSuDung: 0,
              Ten: "Chọn Phường/Xã",
            },
          ],
        }));
      });
  }, [thongtin.Huyen]);
  //* Trường
  useEffect(() => {
    //! Cứ khi ID huyện || phường || cấp thay đổi thì set id và picker trường về null
    changeValuePicker({
      Truong: JSON.stringify({
        ID: 0,
        MaDonViSuDung: 0,
        Ten: "Chọn Trường",
      }),
    });
    setPicker((prevState) => ({
      ...prevState,
      Truong: [
        {
          ID: 0,
          MaDonViSuDung: 0,
          Ten: "Chọn Trường",
        },
      ],
    }));
    //console.log(thongtin);
    //! Lấy thông tin Tinh - Huyen - Xa
    let tinh = JSON.parse(thongtin.Tinh);
    let huyen = JSON.parse(thongtin.Huyen);
    let xa = JSON.parse(thongtin.Xa);
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${tinh.ID}&idquanhuyen=${huyen.ID}&idphuongxa=${xa.ID}&cap=${thongtin.Cap}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            ID: 0,
            MaDonViSuDung: 0,
            Ten: "Chọn Trường",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            ID: item.ID,
            MaDonViSuDung: item.MaDonViSuDung,
            Ten: item.TenTruong,
          };
          arrData.push(obj);
        });
        //console.log(arrData);
        setPicker((prevState) => ({
          ...prevState,
          Truong: arrData,
        }));
      })
      .catch((error) => {
        setPicker((prevState) => ({
          ...prevState,
          Truong: [
            {
              ID: 0,
              MaDonViSuDung: 0,
              Ten: "Chọn Trường",
            },
          ],
        }));
      });
  }, [thongtin.Huyen, thongtin.Xa, thongtin.Cap]);
  //#endregion
  //#region Function
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
  const API_DangNhap = async (madonvisudung, doituong, data) => {
    let url = `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/login?username=${thongtin.TenDangNhap}&password=${thongtin.MatKhau}&madonvisudung=${madonvisudung}`;
    // let url = `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/login?username=tkadmin&password=123456&madonvisudung=562`;
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      // body: JSON.stringify(DataPush),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.Result);
        let mess = "";

        if (doituong == 2) {
          let truong = JSON.parse(thongtin.Truong);
          let idtruong = truong.ID;
          if (idtruong == 0 || idtruong == "") {
            mess = "Mời bạn chọn Trường";
          } else {
            mess =
              "Tài khoản của bạn không chính xác. Vui lòng kiểm tra lại thông tin đã nhập";
          }
        } else if (doituong == 3) {
          let pgd = JSON.parse(thongtin.PGD);
          let idpgd = pgd.ID;
          if (idpgd == 0 || idpgd == "") {
            mess = "Mời bạn chọn Phòng GD&ĐT";
          } else {
            mess =
              "Tài khoản của bạn không chính xác. Vui lòng kiểm tra lại thông tin đã nhập";
          }
        } else if (doituong == 4) {
          let sgd = JSON.parse(thongtin.SGD);
          let idsgd = sgd.ID;
          if (idsgd == 0 || idsgd == "") {
            mess = "Mời bạn chọn Sở GD&ĐT";
          } else {
            mess =
              "Tài khoản của bạn không chính xác. Vui lòng kiểm tra lại thông tin đã nhập";
          }
        }
        console.log({ ...data, ...responseJson.Result.data });
        responseJson.Result.status
          ? navigation.navigate("Quản trị viên", {
              ...data,
              ...responseJson.Result.data,
            })
          : alert(mess);
      });
  };
  const DangNhap = () => {
    // Cho hiệu ứng chờ
    setLoading(true);

    let DoiTuong = 0;
    let madonvisudung = 0;
    // Kiểm tra loại đối tượng đăng nhập
    donvi.forEach((donvi_item, donvi_index) => {
      if (donvi_item.trangthai) {
        DoiTuong = donvi_item.loai;
      }
    });
    // Tạo data truyền vào từng trang
    const data = {
      DoiTuong,
      ...thongtin,
    };
    // console.log(data);
    if (DoiTuong == 1) {
      setLoading(false);
      let tinh = JSON.parse(thongtin.Tinh);

      if (tinh.ID == 0 || tinh.ID == "") {
        alert("Mời bạn chọn Tỉnh/Thành phố");
      } else {
        navigation.navigate("Trang chủ", { ...data });
      }
    } else if (DoiTuong == 2) {
      let truong = JSON.parse(thongtin.Truong);
      madonvisudung = truong.MaDonViSuDung;
      API_DangNhap(madonvisudung, DoiTuong, data);
      setLoading(false);
    } else if (DoiTuong == 3) {
      let pgd = JSON.parse(thongtin.PGD);
      madonvisudung = pgd.MaDonViSuDung;
      API_DangNhap(madonvisudung, DoiTuong, data);
      setLoading(false);
    } else if (DoiTuong == 4) {
      let sgd = JSON.parse(thongtin.SGD);
      madonvisudung = sgd.MaDonViSuDung;
      API_DangNhap(madonvisudung, DoiTuong, data);
      setLoading(false);
    }
  };
  //#endregion

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading && (
        <View
          style={{
            width: SCREEN_WIDTH,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 4000,
            paddingBottom: SCREEN_HEIGHT,
            opacity: 0.1,
            backgroundColor: "black",
          }}
        >
          <Spinner color="green" />
        </View>
      )}
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
                  backgroundColor: donvi_item.trangthai ? "#0965B0" : "white",
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
                color={donvi_item.trangthai ? "white" : "#0965B0"}
              />
            </View>
            <Text
              style={{
                marginTop: 10,
                color: donvi_item.trangthai ? "#0965B0" : "black",
                fontWeight: donvi_item.trangthai ? "bold" : "500",
                // fontSize: donvi_item.trangthai ? "18" : "",
              }}
            >
              {donvi_item.ten}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.thongTinDangNhap}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              // height: "90%",
              paddingVertical: 20,
              minHeight: "35%",
              // maxHeight: "80%",
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
                // justifyContent: "center",
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
                  {!donvi[3].trangthai ? (
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/*// Tỉnh thành phố */}
                      <View
                        style={[
                          styles.field,
                          { zIndex: 11001, display: "none" },
                        ]}
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
                          iosIcon={
                            <MaterialCommunityIcons
                              name={"menu-down"}
                              size={23}
                              color={"tomato"}
                            />
                          }
                          style={styles.picker}
                          onValueChange={(itemValue, itemIndex) =>
                            changeValuePicker({ IDTinh: itemValue })
                          }
                        >
                          {picker.Tinh.map((item, index) => {
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
                      {!donvi[2].trangthai ? (
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/*// Quận huyện */}
                          <View
                            style={[
                              styles.field,
                              { zIndex: 11001, ...styles.shadow },
                            ]}
                          >
                            <Picker
                              selectedValue={thongtin.Huyen}
                              iosIcon={
                                <MaterialCommunityIcons
                                  name={"menu-down"}
                                  size={23}
                                  color={"#0965B0"}
                                />
                              }
                              style={styles.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                changeValuePicker({ Huyen: itemValue })
                              }
                            >
                              {picker.Huyen.map((item, index) => {
                                return (
                                  <Picker.Item
                                    key={index.toString()}
                                    label={item.Ten}
                                    value={JSON.stringify(item)}
                                  />
                                );
                              })}
                            </Picker>
                          </View>
                          {/*// Phường xã */}
                          <View
                            style={[
                              styles.field,
                              { zIndex: 11001, ...styles.shadow },
                            ]}
                          >
                            <Picker
                              selectedValue={thongtin.Xa}
                              iosIcon={
                                <MaterialCommunityIcons
                                  name={"menu-down"}
                                  size={23}
                                  color={"#0965B0"}
                                />
                              }
                              style={styles.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                changeValuePicker({ Xa: itemValue })
                              }
                            >
                              {picker.Xa.map((item, index) => {
                                return (
                                  <Picker.Item
                                    key={index.toString()}
                                    label={item.Ten}
                                    value={JSON.stringify(item)}
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
                            <Picker
                              selectedValue={thongtin.Cap}
                              iosIcon={
                                <MaterialCommunityIcons
                                  name={"menu-down"}
                                  size={23}
                                  color={"#0965B0"}
                                />
                              }
                              style={styles.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                changeValuePicker({ Cap: itemValue })
                              }
                            >
                              {picker.Cap.map((item, index) => {
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
                          {/*// Trường */}
                          <View
                            style={[
                              styles.field,
                              { zIndex: 11001, ...styles.shadow },
                            ]}
                          >
                            <Picker
                              selectedValue={thongtin.Truong}
                              iosIcon={
                                <MaterialCommunityIcons
                                  name={"menu-down"}
                                  size={23}
                                  color={"#0965B0"}
                                />
                              }
                              style={styles.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                changeValuePicker({ Truong: itemValue })
                              }
                            >
                              {picker.Truong.map((item, index) => {
                                return (
                                  <Picker.Item
                                    key={index.toString()}
                                    label={item.Ten}
                                    value={JSON.stringify(item)}
                                  />
                                );
                              })}
                            </Picker>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/*// Phòng GD */}
                          <View
                            style={[
                              styles.field,
                              { zIndex: 11001, ...styles.shadow },
                            ]}
                          >
                            <Picker
                              selectedValue={thongtin.PGD}
                              iosIcon={
                                <MaterialCommunityIcons
                                  name={"menu-down"}
                                  size={23}
                                  color={"#0965B0"}
                                />
                              }
                              style={styles.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                changeValuePicker({ PGD: itemValue })
                              }
                            >
                              {picker.PGD.map((item, index) => {
                                return (
                                  <Picker.Item
                                    key={index.toString()}
                                    label={item.Ten}
                                    value={JSON.stringify(item)}
                                  />
                                );
                              })}
                            </Picker>
                          </View>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/*// Sở GD */}
                      <View
                        style={[
                          styles.field,
                          { zIndex: 11001, ...styles.shadow },
                        ]}
                      >
                        <Picker
                          selectedValue={thongtin.SGD}
                          iosIcon={
                            <MaterialCommunityIcons
                              name={"menu-down"}
                              size={23}
                              color={"#0965B0"}
                            />
                          }
                          style={styles.picker}
                          onValueChange={(itemValue, itemIndex) =>
                            changeValuePicker({ SGD: itemValue })
                          }
                        >
                          {picker.SGD.map((item, index) => {
                            return (
                              <Picker.Item
                                key={index.toString()}
                                label={item.Ten}
                                value={JSON.stringify(item)}
                              />
                            );
                          })}
                        </Picker>
                      </View>
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
                        changeValuePicker({ TenDangNhap: value })
                      }
                    >
                      {thongtin.TenDangNhap}
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
                      color={"#0965B0"}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/*// TỈnh thành phố */}
                  <View
                    style={[styles.field, { zIndex: 11001, ...styles.shadow }]}
                  >
                    <Picker
                      selectedValue={thongtin.Tinh}
                      iosIcon={
                        <MaterialCommunityIcons
                          name={"menu-down"}
                          size={23}
                          color={"#0965B0"}
                        />
                      }
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) =>
                        changeValuePicker({ Tinh: itemValue })
                      }
                    >
                      {picker.Tinh.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index.toString()}
                            label={item.Ten}
                            value={JSON.stringify(item)}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
              )}
              {/*// Đăng nhập */}
              <Button
                style={[
                  styles.dangNhap,
                  {
                    height: 45,
                    ...styles.shadow,
                  },
                ]}
                onPress={() => DangNhap()}
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
                    height: 45,
                    width: 45,
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
                    color={"#0965B0"}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                </View>
              </Button>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Quên mật khẩu.{" "}
              </Text>
              <TouchableOpacity>
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
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const marginAvatar = 10;
const sumAvatarPerRow = 4;
const widthPerAvatar =
  ((SCREEN_WIDTH - 2 * marginAvatar * sumAvatarPerRow) * 0.88) /
  sumAvatarPerRow; // (SCREEN_WIDTH - 2 * margin * rowElement) / rowElement
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: widthPerAvatar,
    height: widthPerAvatar,
    marginHorizontal: marginAvatar,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // backgroundColor: "#0965B0",
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
    // alignItems: "center",
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
    backgroundColor: "#0965B0",
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
    height: 45,

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
    backgroundColor: "#0965B0", //"#61b15a",
    borderRadius: 25,
    marginLeft: 10,
  },
  picker: {
    flexGrow: 1,
    width: 310,
    // borderWidth: 1,
  },
});
