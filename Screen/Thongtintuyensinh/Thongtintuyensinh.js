import { useHeaderHeight } from "@react-navigation/stack";
import { Button, Picker, Text, View } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Linking,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors, IconButton } from "react-native-paper";

export default function Thongtintuyensinh({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thông tin tuyển sinh",
    });
  });
  const { Tinh } = route.params;
  const headerHeight = useHeaderHeight();
  const [data, setData] = useState({
    IDTinh: "",
    IDHuyen: "",
    IDXa: "",
    CapTS: "",
    IDTruong: "",
    ketqua: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
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
    setData((prevState) => ({
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
          (item, index) => item.TenDiaChi.toString() === Tinh.toString()
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
          `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${obj[0].ID}&idquanhuyen=${data.IDHuyen}&idphuongxa=${data.IDXa}&cap=${data.CapTS}`
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
  //#region Huyện
  // useEffect(() => {
  //   setPicker((prevState) => ({
  //     ...prevState,
  //     IDHuyen: [
  //       {
  //         id: "",
  //         name: "Chọn Quận/Huyện",
  //       },
  //     ],
  //     IDXa: [
  //       {
  //         id: "",
  //         name: "Chọn Phường/xã",
  //       },
  //     ],
  //   }));
  //   fetch(
  //     `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDTinh}&level=2`
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       const arrData = [
  //         {
  //           id: "",
  //           name: "Chọn Quận/Huyện",
  //         },
  //       ];
  //       responseJson.Result.results.map((item, index) => {
  //         const obj = {
  //           id: item.ID,
  //           name: item.TenDiaChi,
  //         };
  //         arrData.push(obj);
  //       });
  //       setPicker((prevState) => ({
  //         ...prevState,
  //         IDHuyen: arrData,
  //       }));
  //     })
  //     .catch((error) => {
  //       setPicker((prevState) => ({
  //         ...prevState,
  //         IDHuyen: [
  //           {
  //             id: "",
  //             name: "Chọn Quận/Huyện",
  //           },
  //         ],
  //       }));
  //     });
  // }, [data.IDTinh]);
  //#endregion
  //* Xã
  useEffect(() => {
    //! Cứ khi ID huyện thay đổi thì set id và picker xã về null
    changeValuePicker({ IDXa: "" });
    setPicker((prevState) => ({
      ...prevState,
      IDXa: [
        {
          id: "",
          name: "Chọn Phường/xã",
        },
      ],
    }));
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getaddress?idParent=${data.IDHuyen}&level=3`
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
  }, [data.IDHuyen]);
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
    //console.log(data);
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getschoolbyaddress?idtinh=${data.IDTinh}&idquanhuyen=${data.IDHuyen}&idphuongxa=${data.IDXa}&cap=${data.CapTS}`
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
  }, [data.IDHuyen, data.IDXa, data.CapTS]);
  //#endregion
  //#region Button: Ẩn hiện - Tra cứu - Lấy API Tra cứu
  const Trangthai = () => {
    if (((data.IDHuyen && data.IDXa && data.IDTruong) || data.IDTruong) != "") {
      return true;
    }
    return false;
  };
  const Tracuu = async () => {
    try {
      await fetch(
        `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getkehoachbyyear?idquanhuyen=${data.IDHuyen}&idphuongxa=${data.IDXa}&idtruong=${data.IDTruong}&cap=${data.CapTS}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          let obj = {};
          let rs = [];
          for (let i = 0; i < responseJson.Result.results.length; i++) {
            obj.ID = i + 1;
            obj.IDTruong = responseJson.Result.results[i].ID;
            obj.MaTruong = responseJson.Result.results[i].MaTruong;
            obj.TenTruong = responseJson.Result.results[i].TenTruong;
            obj.TenFile = responseJson.Result.results[i].TenFile;
            obj.TieuDe = responseJson.Result.results[i].TieuDe;
            obj.DuongDan = responseJson.Result.results[i].DuongDan;
            rs.push(obj);
            obj = {};
          }
          // console.log(responseJson);
          // console.log(rs);
          changeValuePicker({ ketqua: rs });
          setModalVisible(true);
        });
    } catch (e) {
      changeValuePicker({ ketqua: [] });
      setModalVisible(true);
    }
  };
  //#endregion
  const ExternalLinkBtn = (props) => {
    return (
      <TouchableOpacity
        key={props.index}
        onPress={() => {
          Linking.openURL(props.url).catch((err) => {
            console.error("Không thể kết nối trang web bởi: ", err);
            alert("Không tải được tệp");
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              flexGrow: 2,
              justifyContent: "center",
              maxWidth: "90%",
            }}
          >
            <Text>
              {props.index}
              {". "}
              {props.title.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "column",
            }}
          >
            <IconButton
              style={{
                alignSelf: "flex-end",
              }}
              icon="file"
              color={Colors.red500}
              size={18}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.block}>
        {/*// Tỉnh thành phố */}
        <View style={[styles.field, { zIndex: 11003, display: "none" }]}>
          {data.IDTinh == "" || null ? null : (
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
            selectedValue={data.IDTinh}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeValuePicker({ IDTinh: itemValue })
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
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>
        {/*// Quận huyện */}
        <View style={[styles.field, { zIndex: 11002 }]}>
          {data.IDHuyen == "" || null ? null : (
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
            selectedValue={data.IDHuyen}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeValuePicker({ IDHuyen: itemValue })
            }
            dropdownIconColor={
              data.IDHuyen == "" || null ? Colors.red500 : "#61b15a"
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
        {/*// Phường xã */}
        <View style={[styles.field, { zIndex: 11001 }]}>
          {data.IDXa == "" || null ? null : (
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
            selectedValue={data.IDXa}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeValuePicker({ IDXa: itemValue })
            }
            dropdownIconColor={
              data.IDXa == "" || null ? Colors.red500 : "#61b15a"
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
        <View style={[styles.field, { zIndex: 11001 }]}>
          {data.CapTS == "" || null ? null : (
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
            selectedValue={data.CapTS}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeValuePicker({ CapTS: itemValue })
            }
            dropdownIconColor={
              data.CapTS == "" || null ? Colors.red500 : "#61b15a"
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
        <View style={[styles.field, { zIndex: 11001 }]}>
          {data.IDTruong == "" ? null : (
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
            selectedValue={data.IDTruong}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              changeValuePicker({ IDTruong: itemValue })
            }
            dropdownIconColor={
              data.IDTruong == "" || null ? Colors.red500 : "#61b15a"
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
      {Trangthai() ? (
        <View style-={{}}>
          <Button success style={styles.button} onPress={() => Tracuu()}>
            <Text style={{ color: "#FFF" }}>Tra cứu</Text>
          </Button>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: headerHeight,
                backgroundColor: "#DEEBFE",
                //opacity: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "90%",
                  minHeight: 300,
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 10,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexGrow: 2,
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {data.ketqua.length !== 0 ? (
                    <View
                      style={{
                        marginVertical: 5,
                        borderBottomWidth: 0.5,
                        width: "100%",
                      }}
                    >
                      {data.ketqua.map((item, index) => {
                        return (
                          <ExternalLinkBtn
                            index={item.ID}
                            title={item.TieuDe}
                            url={item.DuongDan}
                            key={index}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity>
                        <View
                          style={{
                            alignItems: "center",
                            padding: 10,
                          }}
                        >
                          <Text>Không có thông tin phù hợp</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flexGrow: 1,
                    flexDirection: "row",
                  }}
                >
                  <Button
                    info
                    style={[styles.button, { alignSelf: "flex-end" }]}
                    color="#61b15a"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Đóng</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  //? Phân cấp View : container > block = title > box > field(...element)
  container: {
    backgroundColor: "#DEEBFE",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  block: {
    width: "95%",
    marginBottom: 10,
  },
  box: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
    // borderColor: "red",
    // borderWidth: 1,
  },
  field: {
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
    height: 50,
    flexGrow: 1,
  },
  button: {
    marginBottom: "5%",
    alignSelf: "center",
    borderRadius: 25,
    textShadowColor: "#bbbbbb",

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
