import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Button, Icon } from "native-base";
import {
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
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
  //* Chọn ảnh minh chứng
  const ChonAnh = (imgs) => {
    // Lưu danh sách ảnh được chọn lại loại minh chứng tương ứng và tắt trạng thái chọn của nó
    let _loaiminhchung = loaiminhchung.map(
      (loaiminhchung_item, loaiminhchung_idx) => {
        return loaiminhchung_item.trangthai
          ? {
              ...loaiminhchung_item,
              trangthai: false,
              lstMinhChung: imgs.map((i) => i.base64),
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
          base64: loaiminhchung[i].lstMinhChung[j],
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
                {/* {loaiminhchung_item.lstMinhChung.length > 0 && (
                  <Icon
                    name="trash"
                    style={{ alignSelf: "center", color: "#FFF" }}
                  />
                )} */}
              </View>
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
                    <Image
                      key={img_idx.toString()}
                      source={{
                        uri: `data:image/jpeg;base64,${img_item}`,
                      }}
                      style={styles.img}
                    />
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
                  maxSelections: 20,
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
