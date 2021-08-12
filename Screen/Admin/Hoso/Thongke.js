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
import { STYLE, TAB_HEADER_HEIGHT, COLORS } from "./style";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const lst_Test = Array(5).fill(
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
);
const Thongke = ({ hoso, setHoSo, kythi, setLoading, tieuchi, setTieuChi }) => {
  //   console.log(hoso);
  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT =
    SCREEN_HEIGHT - HEADER_HEIGHT - 2 * TAB_HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.3;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;

  //#region Thống kê
  const [loaihoso, setLoaiHoSo] = useState([
    {
      Ten: "Tất cả",
      Loai: 1,
      HienThi: true,
    },
    {
      Ten: "Trực tiếp",
      Loai: 2,
      HienThi: false,
    },
    {
      Ten: "Trực tuyến",
      Loai: 3,
      HienThi: false,
    },
  ]);
  const [loaibieudo, setLoaiBieuDo] = useState([
    {
      Loai: 1,
      Ten: "Biểu đồ cột",
      HienThi: true,
    },
    {
      Loai: 2,
      Ten: "Biểu đồ tròn",
      HienThi: false,
    },
  ]);
  const ChuyenDoi_LoaiHoSo = (_loai_index) => {
    let _loaihs = loaihoso.map((loai_item, loai_index) =>
      loai_index == _loai_index
        ? {
            ...loai_item,
            HienThi: true,
          }
        : {
            ...loai_item,
            HienThi: false,
          }
    );
    // console.log(_hoso);
    setLoaiHoSo(_loaihs);
  };
  const ChuyenDoi_LoaiBieuDo = (_loai_index) => {
    let _loaibieudo = loaibieudo.map((loai_item, loai_index) =>
      loai_index == _loai_index
        ? {
            ...loai_item,
            HienThi: true,
          }
        : {
            ...loai_item,
            HienThi: false,
          }
    );
    // console.log(_hoso);
    setLoaiBieuDo(_loaibieudo);
  };
  const Chon_TieuChi = (_loai_index) => {
    let _tieuchi = tieuchi.map((loai_item, loai_index) => {
      if (loai_index == _loai_index) {
        console.log(tieuchi);
        // Kiểm tra nó có phải cái duy nhất được chọn không
        let soluong_chon = tieuchi.filter((item) => item.HienThi).length;
        // console.log(soluong_chon, !loai_item.HienThi);
        if (soluong_chon == 2) {
          if (loai_item.HienThi) return loai_item;
          return {
            ...loai_item,
            HienThi: true,
          };
        }
        return {
          ...loai_item,
          HienThi: !loai_item.HienThi,
        };
      }
      return loai_item;
    });
    setTieuChi(_tieuchi);
  };
  const TieuChi_ThongKe = () => {
    return (
      <View
        style={[
          styles.center,
          {
            height: TOP_CONTAINER_HEIGHT,
            // borderWidth: 1,
          },
        ]}
      >
        <View
          style={{
            ...styles.shadow,
            height: "90%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 25,
          }}
        >
          {tieuchi.map((loai_item, loai_index) => {
            return (
              <TouchableOpacity
                key={loai_index.toString()}
                style={{
                  height: `${100 / tieuchi.length}%`,
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderColor: "#F1F1F1",
                  borderBottomWidth:
                    loai_index == 0
                      ? 0.5
                      : loai_index != tieuchi.length - 1
                      ? 0.5
                      : 0, // phần tử đầu tiên
                  borderTopWidth:
                    loai_index == tieuchi.length - 1
                      ? 0.5
                      : loai_index != 0
                      ? 0.5
                      : 0, // phàn tử cuối cùng
                }}
                onPress={() => Chon_TieuChi(loai_index)}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  {loai_item.Ten}
                </Text>
                <View
                  style={[
                    styles.center,
                    {
                      borderRadius: 25,
                      height: 20,
                      width: 20,
                      backgroundColor: loai_item.HienThi
                        ? "#61b15a"
                        : "#F1F1F1",
                    },
                  ]}
                >
                  {loai_item.HienThi && (
                    <MaterialCommunityIcons
                      name={"check"}
                      //   size={45}
                      color={"white"}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  const PieChart_Custom = ({ data_chart }) => {
    /*  const data_chart = hocsinh.map((hs_item, hs_index) => ({
            name: hs_item.MaKyThi,
            soluong: hs_item.SoLuong,
            color: COLORS[hs_index],
            legendFontColor: COLORS[hs_index],
            legendFontSize: 13,
          })); */
    return (
      <PieChart
        data={data_chart}
        // hasLegend={false} // hiện chú thích
        width={SCREEN_WIDTH * 0.9 - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          alignItems: "center",
          // borderWidth: 1,
        }}
        accessor="soluong"
        backgroundColor="transparent"
        paddingLeft="15"
        // absolute // Cái này sẽ là trạng thái true: hiện số, false : hiện %
      />
    );
  };
  const BarChart_Custom = ({ barData, segments }) => {
    return (
      <BarChart
        data={barData}
        segments={segments}
        fromZero={true}
        style={{ marginBottom: 20 }}
        width={SCREEN_WIDTH * 0.9 - 40}
        height={220}
        showValuesOnTopOfBars={true}
        // yAxisLabel={"Rs"}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    );
  };
  const Chart = () => {
    let _tieuchi = tieuchi.filter((item) => item.HienThi);

    let _loaihoso = loaihoso.filter((item) => item.HienThi); // Lưu ý: Chỉ có 1 phần tử
    let _loaibieudo = loaibieudo.filter((item) => item.HienThi); // Lưu ý: Chỉ có 1 phần tử
    let segments =
      _tieuchi.length == 0 || _tieuchi.length == 1 ? 2 : _tieuchi.length;
    // console.log(_loaihoso);

    // Biểu đồ cột
    if (_loaibieudo[0].Loai == 1) {
      const tructiep_tructuyen = _tieuchi.map((ds) =>
        ds.Loai.reduce((a, b) => a + b.SoLuong, 0)
      );
      const tructiep = _tieuchi.map((ds) => ds.Loai[0].SoLuong);
      const tructuyen = _tieuchi.map((ds) => ds.Loai[1].SoLuong);
      // console.log(_loaihoso[0].Loai == 1);
      const barData = {
        labels: _tieuchi.map((item) => item.Ma),
        datasets: [
          {
            data:
              _loaihoso[0].Loai == 1
                ? tructiep_tructuyen
                : _loaihoso[0].Loai == 2
                ? tructiep
                : tructuyen,
            // colors: [(opacity = 1) => `rgba(0, 0, 0, ${opacity})`],
          },
        ],
      };
      // console.log(barData);
      return (
        <View
          style={{
            width: "100%",
          }}
        >
          <BarChart_Custom {...{ barData, segments }} />
          <View
            style={{
              width: "100%",
            }}
          >
            {_tieuchi.map((tieuchi_item, tieuchi_index) => (
              <View key={tieuchi_index.toString()}>
                <Text>
                  ● {tieuchi_item.Ma} :{" "}
                  <Text style={{ color: "red" }}>{tieuchi_item.Ten}</Text>
                </Text>
                <View
                  style={{
                    marginBottom: 5,
                    paddingHorizontal: 15,
                  }}
                >
                  {/*Tổng*/}
                  <Text style={styles.soluong}>
                    Tổng:{" "}
                    <Text style={{ color: "red" }}>
                      {tructiep_tructuyen[tieuchi_index]}
                    </Text>
                  </Text>
                  {/*Trực tiếp*/}
                  <Text style={styles.soluong}>
                    Trực tiếp:{" "}
                    <Text style={{ color: "red" }}>
                      {(() => {
                        let _tructiep = tructiep[tieuchi_index];
                        let tong = tructiep_tructuyen[tieuchi_index];
                        let tyle = 0;
                        tyle =
                          _tructiep > 0
                            ? ((_tructiep * 100) / tong).toFixed(2)
                            : 0;
                        return `${_tructiep} (${tyle}%)`;
                      })()}
                    </Text>
                  </Text>
                  {/*Trực tuyến*/}
                  <Text style={styles.soluong}>
                    Trực tuyến:{" "}
                    <Text style={{ color: "red" }}>
                      {(() => {
                        let _tructuyen = tructuyen[tieuchi_index];
                        let tong = tructiep_tructuyen[tieuchi_index];
                        let tyle = 0;
                        tyle =
                          _tructuyen > 0
                            ? ((_tructuyen * 100) / tong).toFixed(2)
                            : 0;
                        return `${_tructuyen} (${tyle}%)`;
                      })()}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      );
    }
    // Biểu đồ tròn
    else {
    }
  };
  const BieuDo_ThongKe = () => {
    return (
      <View
        style={[
          styles.center,
          {
            height: BODY_CONTAINER_HEIGHT,
            // borderWidth: 1,
            // borderColor: "red",
          },
        ]}
      >
        <View
          style={{
            ...styles.shadow,
            height: "90%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 25,
          }}
        >
          <View
            style={[
              {
                height: TAB_HEADER_HEIGHT,
                flexDirection: "row",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                // borderWidth: 1,
              },
            ]}
          >
            {loaihoso.map((loaihoso_item, loaihoso_index) => {
              return (
                <TouchableOpacity
                  key={loaihoso_index.toString()}
                  style={[
                    styles.center,
                    {
                      height: "100%",
                      width: `${100 / loaihoso.length}%`,
                      backgroundColor: loaihoso_item.HienThi ? "white" : "",
                      borderTopLeftRadius:
                        loaihoso_index == 0
                          ? 25
                          : loaihoso_index != loaihoso.length - 1
                          ? 0
                          : 0, // phần tử đầu tiên,

                      borderTopRightRadius:
                        loaihoso_index == loaihoso.length - 1
                          ? 25
                          : loaihoso_index != 0
                          ? 0
                          : 0, // phần tử cuối cùng,
                      /*  borderRightWidth:
                        loaihoso_index == 0
                          ? 0.5
                          : loaihoso_index != loaihoso.length - 1
                          ? 0.5
                          : 0, // phần tử đầu tiên,
                      borderLeftWidth:
                        loaihoso_index == loaihoso.length - 1
                          ? 0.5
                          : loaihoso_index != 0
                          ? 0.5
                          : 0, // phần tử đầu tiên, */
                      borderBottomWidth: 0.5,
                      // borderWidth: 1,
                    },
                  ]}
                  onPress={() => ChuyenDoi_LoaiHoSo(loaihoso_index)}
                >
                  <Text
                    style={{
                      color: loaihoso_item.HienThi ? "#0965B0" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {loaihoso_item.Ten}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              height: BODY_CONTAINER_HEIGHT * 0.9 - TAB_HEADER_HEIGHT,
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 20,
              // backgroundColor: "white",
              // borderWidth: 1,
            }}
          >
            <ScrollView
              nestedScrollEnabled
              style={{
                width: "100%",
                // borderWidth: 1,
              }}
            >
              <Chart />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  //#endregion

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      {/*Danh sách thông kê*/}
      <TieuChi_ThongKe />
      <BieuDo_ThongKe />
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
  soluong: {
    fontSize: 13,
    paddingVertical: 5,
  },
});
export default Thongke;
