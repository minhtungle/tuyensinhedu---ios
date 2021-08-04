import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Button, Icon } from "native-base";
import {
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import Constants from "expo-constants";
const { statusBarHeight } = Constants;
import { BlurView } from "expo-blur";

export default function FileDinhKem({
  loaiminhchung,
  loaiminhchung_cache,
  setLoaiMinhChung,
  changeValuePicker,
  setModal_MinhChung,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const showAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => Alert.alert("Ok Pressed"),
          style: "accept",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  //* Chọn loại minh chứng
  const ChonMinhChung = (idx) => {
    // Thay đổi trạng thái minh chứng được chọn thành true
    let _loaiminhchung = loaiminhchung.map(
      (loaiminhchung_item, loaiminhchung_idx) => {
        return loaiminhchung_idx === idx
          ? {
              ...loaiminhchung_item,
              trangthai: true,
            }
          : loaiminhchung_item;
      }
    );
    //console.log(_loaiminhchung);
    setLoaiMinhChung(_loaiminhchung);
    // Mở modal lên
    setModalVisible(true);
  };
  //* Nhấn giữ ảnh
  const GiuAnh = (idx_LoaiMinhChung, idx_Anh) => {
    let _loaiminhchung = loaiminhchung.map(
      (loaiminhchung_item, loaiminhchung_idx) => {
        return loaiminhchung_idx === idx_LoaiMinhChung
          ? {
              ...loaiminhchung_item,
              lstMinhChung: loaiminhchung_item.lstMinhChung.map(
                (anh_item, anh_idx) => {
                  return anh_idx === idx_Anh
                    ? {
                        base64: anh_item.base64,
                        trangthai: !anh_item.trangthai,
                      }
                    : anh_item;
                }
              ),
            }
          : loaiminhchung_item;
      }
    );
    setLoaiMinhChung(_loaiminhchung);
  };
  //* Xóa ảnh
  const XoaAnh = (idx_LoaiMinhChung) => {
    let _loaiminhchung = loaiminhchung.map(
      (loaiminhchung_item, loaiminhchung_idx) => {
        return loaiminhchung_idx === idx_LoaiMinhChung
          ? {
              ...loaiminhchung_item,
              lstMinhChung: loaiminhchung_item.lstMinhChung.filter(
                (anh_item, anh_idx) => anh_item.trangthai == true
              ),
            }
          : loaiminhchung_item;
      }
    );
    setLoaiMinhChung(_loaiminhchung);
  };
  //* Chọn ảnh minh chứng
  const ChonAnh = (imgs) => {
    // Lưu danh sách ảnh được chọn lại loại minh chứng tương ứng và tắt trạng thái chọn của nó
    let _loaiminhchung = loaiminhchung.map(
      (loaiminhchung_item, loaiminhchung_idx) => {
        return loaiminhchung_item.trangthai
          ? {
              ...loaiminhchung_item,
              trangthai: false,
              lstMinhChung: imgs.map((i) => ({
                base64: i.base64,
                trangthai: true,
              })),
            }
          : loaiminhchung_item;
      }
    );
    setLoaiMinhChung(_loaiminhchung);
    // Đóng modal lại
    setModalVisible(!modalVisible);
  };
  //* Lưu ảnh minh chứng
  const Luu_MinhChung = () => {
    // console.log(loaiminhchung.length);
    let lst_minhchung = [];
    for (var i = 0; i < loaiminhchung.length; i++) {
      for (var j = 0; j < loaiminhchung[i].lstMinhChung.length; j++) {
        let minhchung = {
          Ten: loaiminhchung[i].Ten + `_${j}`,
          Loai: loaiminhchung[i].ID,
          GhiChu: loaiminhchung[i].GhiChu,
          base64: loaiminhchung[i].lstMinhChung[j].base64,
        };
        lst_minhchung.push(minhchung);
      }
    }
    changeValuePicker({ FileDinhKem: lst_minhchung });
    setModal_MinhChung(false);
  };
  const Huy_LuuMinhChung = () => {
    // Trả lại danh sách minh chứng ban đầu
    setLoaiMinhChung(loaiminhchung_cache);
    setModal_MinhChung(false);
  };
  return (
    <View
      style={{
        width: "100%",
        // height: 50,
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "center", height: 25 }}
      >
        <TouchableOpacity
          style={{
            // borderWidth: 1,
            justifyContent: "center",
            flexGrow: 1,
          }}
          onPress={() => Huy_LuuMinhChung()}
        >
          <Text style={{ fontSize: 16, textAlign: "center" }}>Huỷ</Text>
        </TouchableOpacity>
        <View
          style={{
            // borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 3,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {/* Đã chọn {} ảnh */}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            // borderWidth: 1,
            justifyContent: "center",
            flexGrow: 1,
          }}
          onPress={() => Luu_MinhChung()}
        >
          <Text style={{ fontSize: 16, textAlign: "center" }}>Chọn</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: statusBarHeight,
          // height: (height * 80) / 100,
          // maxHeight: (height * 70) / 100,
          // flexDirection: "column",
        }}
      >
        {loaiminhchung &&
          loaiminhchung.map((loaiminhchung_item, loaiminhchung_idx) => (
            <View
              key={loaiminhchung_idx.toString()}
              style={{ flexDirection: "column" }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#2f58cf",
                  marginVertical: 5,
                  minHeight: 50,
                }}
              >
                <Text
                  style={{
                    flexWrap: "wrap",
                    flexGrow: 1,
                    maxWidth: "90%",
                    paddingLeft: 10,
                    alignSelf: "center",
                    color: "#FFF",
                  }}
                >
                  {loaiminhchung_item.Ten}
                </Text>
                {loaiminhchung_item.lstMinhChung.length > 0 && (
                  <Icon
                    name="trash"
                    style={{ alignSelf: "center", color: "#FFF" }}
                    onPress={() => XoaAnh(loaiminhchung_idx)}
                  />
                )}
              </View>
              {/* <Text
                style={{
                  position: "absolute",
                  borderWidth: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                {loaiminhchung_item.lstMinhChung.length}
              </Text> */}
              <Text
                style={{ textAlign: "center", color: "red", marginBottom: 5 }}
              >
                {loaiminhchung_item.GhiChu}
              </Text>
              {/* Ảnh */}
              <View style={styles.lst_imgs}>
                <TouchableOpacity
                  style={[
                    styles.img,
                    {
                      backgroundColor: "#DDDDDD",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                  onPress={() => ChonMinhChung(loaiminhchung_idx)}
                >
                  <Icon
                    name="add"
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  />
                </TouchableOpacity>
                {loaiminhchung_item.lstMinhChung.map((img_item, img_idx) => {
                  return (
                    <TouchableOpacity
                      key={img_idx.toString()}
                      onPress={() => GiuAnh(loaiminhchung_idx, img_idx)}
                    >
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${img_item.base64}`,
                        }}
                        style={styles.img}
                      />
                      {!img_item.trangthai && (
                        <View
                          style={[
                            styles.img,
                            {
                              position: "absolute",
                              justifyContent: "center",
                              backgroundColor: "#bcc8deb0",
                            },
                          ]}
                        >
                          <Icon
                            name="close-circle-outline"
                            style={{
                              color: "black",
                              fontSize: 45,
                              width: "100%",
                              textAlign: "center",
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}

          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setModalVisible(!modalVisible);
          // }}
        >
          <BlurView
            style={[
              StyleSheet.absoluteFill,
              {
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#FFF",
              },
            ]}
            intensity={200}
          >
            <View
              style={{
                width: "100%",
                height: height - statusBarHeight,
                backgroundColor: "#FFF",
              }}
            >
              <AssetsSelector
                options={{
                  /* Add only when u want to Manipulate Assets.
                   */
                  manipulate: {
                    width: 512,
                    compress: 0.7,
                    base64: true,
                    saveTo: "png",
                  },
                  assetsType: [
                    "photo",
                    //, "video"
                  ],
                  maxSelections: 100,
                  margin: 3,
                  portraitCols: 4,
                  landscapeCols: 5,
                  widgetWidth: 100,
                  widgetBgColor: "white",
                  selectedBgColor: "green",
                  spinnerColor: "white",
                  videoIcon: {
                    Component: Ionicons,
                    iconName: "ios-videocam",
                    color: "white",
                    size: 20,
                  },
                  selectedIcon: {
                    Component: Ionicons,
                    iconName: "ios-checkmark-circle-outline",
                    color: "green",
                    bg: "#e7f3ffc7",
                    size: 32,
                  },
                  defaultTopNavigator: {
                    selectedText: "ảnh được chọn",
                    continueText: "Chọn",
                    goBackText: "Huỷ",
                    midTextColor: "red",
                    // buttonStyle: validViewStyleObject,
                    // textStyle: validTextStyleObject,
                    backFunction: (imgs) => ChonAnh([]),
                    doneFunction: (imgs) => ChonAnh(imgs),
                  },
                  //   noAssets: CustomNoAssetsComponent,
                }}
              />
            </View>
          </BlurView>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  lst_imgs: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    // height: width / 5,
    // width: width / 5,
    width: (width - 2 * 4 * 2) / 4,
    height: (width - 2 * 4 * 2) / 4,
    margin: 2,
  },
});
