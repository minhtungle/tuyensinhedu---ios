import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const lst_Test = Array(5).fill(
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
);
const Baocao = ({ kythi, setKyThi }) => {
  //   console.log(hoso);
  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT =
    SCREEN_HEIGHT - HEADER_HEIGHT - 1 * TAB_HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.3;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;

  const scrollX = useRef(new Animated.Value(0)).current;
  //#region Danh sách kỳ thi
  const ChuyenDoi_TrangThaiKyThi = (_kythi_index) => {
    let _kythi = kythi.map((kythi_item, kythi_index) =>
      kythi_index == _kythi_index
        ? {
            ...kythi_item,
            HienThi: true,
          }
        : {
            ...kythi_item,
            HienThi: false,
          }
    );
    // console.log(_kythi);
    setKyThi(_kythi);
  };
  const DanhSach_KyThi = () => {
    return (
      <View
        style={{
          width: "100%",
          height: BODY_CONTAINER_HEIGHT,
          //   borderWidth: 1,
          //   borderBottomColor: "red",
        }}
      >
        <View
          style={[
            styles.center,
            {
              height: BODY_CONTAINER_HEIGHT,
            },
          ]}
        >
          <View
            style={{
              ...styles.shadow,
              height: "90%",
              width: "90%",
              paddingVertical: 30,
              paddingHorizontal: 20,
              backgroundColor: "white",
              borderRadius: 25,
            }}
          >
            <ScrollView
              nestedScrollEnabled
              style={{
                height: BODY_CONTAINER_HEIGHT * 0.9,
                width: "100%",
                // borderWidth: 1,
              }}
            >
              {kythi.map((kythi_item, kythi_index) => {
                return (
                  kythi_item.HienThi && (
                    <View
                      key={kythi_index.toString()}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Lịch trình tuyển sinh:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.TrangThai_HienThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Năm học:{" "}
                        <Text style={styles.ketqua}>{kythi_item.NamHoc}</Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Điểm sàn:{" "}
                        <Text style={styles.ketqua}>{kythi_item.DiemSan}</Text>
                      </Text>

                      <Text
                        style={{
                          marginTop: 25,
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Mã kỳ thi:{" "}
                        <Text style={styles.ketqua}>{kythi_item.MaKyThi}</Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Số lượng nguyện vọng:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.SoLuongNguyenVong}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Số lượng hội đồng thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.SoLuongHDT}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Số lượng học sinh:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.SoLuongHocSinh}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          marginTop: 25,
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Thời gian bắt đầu thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.ThoiGianBatDauThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Thời gian đăng ký thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.ThoiGianDangKyThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Thời gian tổ chức thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.ThoiGianToChucThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Thời gian chấm thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.ThoiGianChamThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Thời gian kết thúc thi:{" "}
                        <Text style={styles.ketqua}>
                          {kythi_item.ThoiGianKetThucThi}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          marginTop: 25,
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Ngày tạo:{" "}
                        <Text style={styles.ketqua}>{kythi_item.NgayTao}</Text>
                      </Text>

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        ● Ngày sửa:{" "}
                        <Text style={styles.ketqua}>{kythi_item.NgaySua}</Text>
                      </Text>
                    </View>
                  )
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  //#endregion

  return (
    <View style={styles.center}>
      {/*Chọn kỳ thi*/}
      <View
        style={[
          styles.center,
          {
            height: TOP_CONTAINER_HEIGHT,
            paddingVertical: 10,
            // justifyContent: "space-between",
            // borderWidth: 1,
          },
        ]}
      >
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={1}
        >
          {kythi.map((kythi_item, kythi_index) => {
            return (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  // height: TOP_CONTAINER_HEIGHT - 40 - 2 * 5,
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 1,
                }}
                key={kythi_index.toString()}
              >
                <TouchableOpacity
                  style={{
                    width: "90%",
                    height: TOP_CONTAINER_HEIGHT * 0.7,
                    borderRadius: 25,
                    backgroundColor: "white",
                    ...styles.shadow,
                    // borderWidth: 1,
                  }}
                  onPress={() => ChuyenDoi_TrangThaiKyThi(kythi_index)}
                >
                  {kythi_item.HienThi && (
                    <View
                      style={[
                        styles.center,
                        {
                          borderRadius: 25,
                          height: 20,
                          width: 20,
                          backgroundColor: "#61b15a",
                          position: "absolute",
                          top: 10,
                          left: 10,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={"check"}
                        //   size={45}
                        color={"white"}
                      />
                    </View>
                  )}

                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      // borderWidth: 1,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"calculator-variant"}
                      size={45}
                      color={"#0965B0"}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {kythi_item.Ten}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {kythi.map((kythi_item, kythi_index) => {
            const dot_width = scrollX.interpolate({
              inputRange: [
                SCREEN_WIDTH * (kythi_index - 1),
                SCREEN_WIDTH * kythi_index,
                SCREEN_WIDTH * (kythi_index + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={kythi_index.toString()}
                style={[styles.normalDot, { width: dot_width }]}
              />
            );
          })}
        </View>
      </View>
      {/*Danh sách hồ sơ*/}
      <DanhSach_KyThi />
    </View>
  );
};
const styles = StyleSheet.create({
  ...STYLE,
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    // top: -16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  ketqua: {
    color: "red",
  },
});
export default Baocao;
