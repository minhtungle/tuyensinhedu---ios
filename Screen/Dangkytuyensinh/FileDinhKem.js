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

function FileDinhKem({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loaiminhchung, setLoaiMinhChung] = useState(null);
  //* Gọi API loại minh chứng
  useEffect(() => {
    fetch(
      `http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getminhchung?cap=${DoiTuongTuyenSinh}`
    )
      .then((res) => res.json())
      .then((responseJson) => {
        let lst_Loai_MinhChung = responseJson.Result.results.map((item, i) => ({
          ...item,
          trangthai: false, // trạng thái của mình chứng đang được chọn
          lstMinhChung: [], // danh sách ảnh minh chứng được chọn
        }));
        //console.log(lst_Loai_MinhChung);
        setLoaiMinhChung(lst_Loai_MinhChung);
      })
      .catch(setLoaiMinhChung(null));
    return () => {
      // clean memory
      setLoaiMinhChung(null);
    };
  }, []);
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
  return (
    <ScrollView style={styles.container}>
      <Text>aloooooo</Text>
      {loaiminhchung &&
        loaiminhchung.map((loaiminhchung_item, loaiminhchung_idx) => (
          <View
            key={loaiminhchung_idx.toString()}
            style={{ flexDirection: "column" }}
          >
            <TouchableOpacity
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
                />
              )}
            </TouchableOpacity>
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <AssetsSelector
          options={{
            /* Add only when u want to Manipulate Assets.
             */
            manipulate: {
              width: 512,
              compress: 0.7,
              base64: true,
              saveTo: "jpeg",
            },
            assetsType: [
              "photo",
              //, "video"
            ],
            maxSelections: 5,
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
              continueText: "Đồng ý",
              //goBackText: "Back",
              midTextColor: "red",
              // buttonStyle: validViewStyleObject,
              // textStyle: validTextStyleObject,
              // backFunction: goBack,
              doneFunction: (imgs) => ChonAnh(imgs),
            },
            //   noAssets: CustomNoAssetsComponent,
          }}
        />
      </Modal>
    </ScrollView>
  );
}
export default FileDinhKem;
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
