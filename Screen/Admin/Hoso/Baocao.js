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

const Baocao = ({ hoso, setHoSo }) => {
  //   console.log(hoso);
  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT =
    SCREEN_HEIGHT - HEADER_HEIGHT - 2 * TAB_HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.3;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;

  const scrollX = useRef(new Animated.Value(0)).current;

  const ChuyenDoi_TrangThaiHoSo = () => {};
  const ChuyenDoi_LoaiHoSo = (_hoso_index, _loai_hoso_index) => {
    let _hoso = hoso.map((hoso_item, hoso_index) =>
      hoso_index == _hoso_index
        ? {
            ...hoso_item,
            Loai: hoso_item.Loai.map((loai_hoso_item, loai_hoso_index) =>
              loai_hoso_index == _loai_hoso_index
                ? {
                    ...loai_hoso_item,
                    HienThi: true,
                  }
                : {
                    ...loai_hoso_item,
                    HienThi: false,
                  }
            ),
          }
        : hoso_item
    );
    // console.log(_hoso);
    setHoSo(_hoso);
  };
  const DanhSach_HoSo = () => {
    return (
      <View
        style={{
          width: "100%",
          height: BODY_CONTAINER_HEIGHT,
          //   borderWidth: 1,
          //   borderBottomColor: "red",
        }}
      >
        {/*Thanh chọn danh sách*/}
        {hoso.map((hoso_item, hoso_index) => {
          return (
            hoso_item.HienThi && (
              <View key={hoso_index.toString()} style={[styles.center, {}]}>
                <View
                  style={[
                    styles.center,
                    { height: TAB_HEADER_HEIGHT, flexDirection: "row" },
                  ]}
                >
                  {hoso_item.Loai.map((loai_hoso_item, loai_hoso_index) => {
                    return (
                      <TouchableOpacity
                        key={loai_hoso_index.toString()}
                        style={[
                          styles.center,
                          {
                            height: "100%",
                            width: "50%",
                            backgroundColor: loai_hoso_item.HienThi
                              ? "white"
                              : "",
                            // borderWidth: 1,
                          },
                        ]}
                        onPress={() =>
                          ChuyenDoi_LoaiHoSo(hoso_index, loai_hoso_index)
                        }
                      >
                        <Text
                          style={{
                            color: loai_hoso_item.HienThi ? "#0965B0" : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {loai_hoso_item.Ten}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {hoso_item.Loai.map((loai_hoso_item, loai_hoso_index) => {
                  return (
                    loai_hoso_item.HienThi && (
                      <ScrollView
                        key={loai_hoso_index.toString()}
                        style={{
                          height: BODY_CONTAINER_HEIGHT - TAB_HEADER_HEIGHT,
                          width: "100%",
                          backgroundColor: "white",
                          //   borderWidth: 1,
                          //   borderColor: "red",
                        }}
                      ></ScrollView>
                    )
                  );
                })}
              </View>
            )
          );
        })}
        {/*Trực tuyến*/}
        <View></View>
      </View>
    );
  };

  return (
    <View style={styles.center}>
      {/*Chọn hồ sơ*/}
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
          {hoso.map((hoso_item, hoso_index) => {
            return (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  // height: TOP_CONTAINER_HEIGHT - 40 - 2 * 5,
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 1,
                }}
                key={hoso_index.toString()}
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
                  onPress={() => ChuyenDoi_TrangThaiHoSo()}
                >
                  <View
                    style={{
                      height: "60%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      // borderWidth: 1,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"file-document"}
                      size={45}
                      color={"#0965B0"}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {hoso_item.Ten}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "40%",
                      width: "100%",
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      // borderWidth: 1,
                    }}
                  >
                    {hoso_item.Loai.map((loai_hoso_item, loai_hoso_index) => {
                      return (
                        <View
                          key={loai_hoso_index.toString()}
                          style={{
                            width: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text>
                            {loai_hoso_item.Ten}:{" "}
                            <Text style={{ color: "red" }}>
                              {(() => {
                                let tyle = 0;
                                let tongsoluong_hoso = hoso_item.Loai.reduce(
                                  (prevValue, nextValue) =>
                                    prevValue + nextValue.SoLuong,
                                  0
                                );
                                // console.log(tongsoluong_hoso);
                                if (tongsoluong_hoso == 0) {
                                  return `${loai_hoso_item.SoLuong} (0%)`;
                                }
                                tyle =
                                  (loai_hoso_item.SoLuong * 100) /
                                  tongsoluong_hoso;
                                return `${loai_hoso_item.SoLuong} (${tyle}%)`;
                              })()}
                            </Text>
                          </Text>
                        </View>
                      );
                    })}
                    {/*Trực tuyến*/}
                    {/* <View
                      style={{
                        width: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text>
                        Trực tuyến:{" "}
                        <Text style={{ color: "red" }}>
                          {(() => {
                            let tyle_tructuyen = 0;
                            if (
                              hoso_item.Loai[0].SoLuong +
                                hoso_item.Loai[1].SoLuong ==
                              0
                            ) {
                              return `${hoso_item.Loai[1].SoLuong} (0%)`;
                            }
                            tyle_tructuyen =
                              (hoso_item.Loai[1].SoLuong * 100) /
                              (hoso_item.Loai[1].SoLuong +
                                hoso_item.Loai[0].SoLuong);
                            return `${hoso_item.Loai[1].SoLuong} (${tyle_tructuyen}%)`;
                          })()}
                        </Text>
                      </Text>
                    </View> */}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {hoso.map((hoso_item, hoso_index) => {
            const dot_width = scrollX.interpolate({
              inputRange: [
                SCREEN_WIDTH * (hoso_index - 1),
                SCREEN_WIDTH * hoso_index,
                SCREEN_WIDTH * (hoso_index + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={hoso_index.toString()}
                style={[styles.normalDot, { width: dot_width }]}
              />
            );
          })}
        </View>
      </View>
      {/*Danh sách hồ sơ*/}
      <DanhSach_HoSo />
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
});
export default Baocao;
