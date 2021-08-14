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
const Thongke = ({ kythi, setKyThi }) => {
  //   console.log(hoso);
  const HEADER_HEIGHT = useHeaderHeight();

  // Chiều cao mà từng màn hình riêng có thể sử dụng
  const CONTAINER_HEIGHT =
    SCREEN_HEIGHT - HEADER_HEIGHT - 1 * TAB_HEADER_HEIGHT;
  const TOP_CONTAINER_HEIGHT = CONTAINER_HEIGHT * 0.2;
  const BODY_CONTAINER_HEIGHT = CONTAINER_HEIGHT - TOP_CONTAINER_HEIGHT;

  //#region Thống kê
  const [loaithongke, setLoaiThongKe] = useState([
    {
      Ten: "Lịch trình tuyển sinh",
      HienThi: true,
    },
    {
      Ten: "Học sinh",
      HienThi: false,
    },
  ]);
  const bieudo = {
    LichTrinh: {
      KhongCoLichTrinh: {
        SoLuong: 0,
        DanhSach: [],
      },
      ChuaDenThoiGian: {
        SoLuong: 0,
        DanhSach: [],
      },
      QuaThoiGian: {
        SoLuong: 0,
        DanhSach: [],
      },
      TrongThoiGian: {
        SoLuong: 0,
        DanhSach: [],
      },
    },
    HocSinh: {
      KyThi: [], // Gồm  {Ten: "" , SoLuong: 0}
    },
  };
  const ChuyenDoi_LoaiTK = (_loaiTK_index) => {
    let _loaithongke = loaithongke.map((loaiTK_item, loaiTK_index) =>
      loaiTK_index == _loaiTK_index
        ? {
            ...loaiTK_item,
            HienThi: true,
          }
        : {
            ...loaiTK_item,
            HienThi: false,
          }
    );
    // console.log(_kythi);
    setLoaiThongKe(_loaithongke);
  };
  const SoLieu_ThongKe = () => {
    return (
      <View
        style={[
          styles.center,
          {
            height: TOP_CONTAINER_HEIGHT,
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
          {loaithongke.map((loaiTK_item, loaiTK_index) => {
            return (
              <TouchableOpacity
                key={loaiTK_index.toString()}
                style={{
                  height: "50%",
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderColor: "#F1F1F1",
                  borderBottomWidth: loaiTK_index == 0 ? 0.5 : 0,
                  borderTopWidth:
                    loaiTK_index == loaithongke.length - 1 ? 0.5 : 0,
                }}
                onPress={() => ChuyenDoi_LoaiTK(loaiTK_index)}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {loaiTK_item.Ten}
                </Text>
                <View
                  style={[
                    styles.center,
                    {
                      borderRadius: 25,
                      height: 20,
                      width: 20,
                      backgroundColor: loaiTK_item.HienThi
                        ? "#61b15a"
                        : "#F1F1F1",
                    },
                  ]}
                >
                  {loaiTK_item.HienThi && (
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
  const BarChart_Custom = ({ data_chart }) => (
    <BarChart
      data={data_chart}
      segments={2}
      // fromZero={true}
      style={{ marginBottom: 20 }}
      width={SCREEN_WIDTH * 0.9 - 40}
      height={220}
      showValuesOnTopOfBars={true}
      // yAxisLabel={"Rs"}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
    />
  );
  const Chart = () => {
    return loaithongke.map((loaiTK_item, loaiTK_index) => {
      if (loaiTK_item.HienThi) {
        if (loaiTK_item.Ten == "Lịch trình tuyển sinh") {
          const lichtrinh = [
            {
              Ten: "Không có lịch trình",
              Ma: "KCLT",
              SoLuong: kythi.filter(
                (item) => item.TrangThai_HienThi == "Chưa có lịch trình"
              ).length,
              DanhSach: kythi.map(
                (item) =>
                  item.TrangThai_HienThi == "Chưa có lịch trình" && item.Ten
              ),
            },
            {
              Ten: "Chưa đến thời gian",
              Ma: "CDTG",
              SoLuong: kythi.filter(
                (item) => item.TrangThai_HienThi == "Chưa đến thời gian"
              ).length,
              DanhSach: kythi.map(
                (item) =>
                  item.TrangThai_HienThi == "Chưa đến thời gian" && item.Ten
              ),
            },
            {
              Ten: "Trong thời gian",
              Ma: "TTG",
              SoLuong: kythi.filter(
                (item) => item.TrangThai_HienThi == "Trong thời gian"
              ).length,
              DanhSach: kythi.map(
                (item) =>
                  item.TrangThai_HienThi == "Trong thời gian" && item.Ten
              ),
            },
            {
              Ten: "Quá thời gian",
              Ma: "QTG",
              SoLuong: kythi.filter(
                (item) => item.TrangThai_HienThi == "Quá thời gian"
              ).length,
              DanhSach: kythi.map(
                (item) => item.TrangThai_HienThi == "Quá thời gian" && item.Ten
              ),
            },
          ];
          // console.log(lichtrinh);
          const data_chart = {
            labels: lichtrinh.map((item) => item.Ma),
            datasets: [
              {
                data: lichtrinh.map((item) => item.SoLuong),
                // colors: [(opacity = 1) => `rgba(0, 0, 0, ${opacity})`],
              },
            ],
          };
          return (
            <View
              key={loaiTK_index.toString()}
              style={{
                width: "100%",
              }}
            >
              <BarChart_Custom {...{ data_chart }} />
              <Text>
                Tổng số kỳ thi đang có:{" "}
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  {kythi.length} kỳ thi
                </Text>
              </Text>

              {lichtrinh.map((lt_item, lt_index) => (
                <View key={lt_index.toString()} style={{ paddingVertical: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {`${lt_item.Ma}: `}
                    <Text
                      style={{
                        fontWeight: "normal",
                        color: "red",
                      }}
                    >
                      {`${lt_item.Ten} - ${lt_item.SoLuong} kỳ thi`}
                    </Text>
                  </Text>
                  {lt_item.SoLuong > 0 &&
                    lt_item.DanhSach.map((dslt_item, dslt_index) => (
                      <Text
                        key={dslt_index.toString()}
                        style={{
                          fontSize: 12,
                          margin: 3,
                        }}
                      >
                        {`• ${dslt_item}`}
                      </Text>
                    ))}
                </View>
              ))}
            </View>
          );
        } else if (loaiTK_item.Ten == "Học sinh") {
          const hocsinh = kythi.map((kt_item, kt_index) => ({
            Ten: kt_item.Ten,
            Ma: kt_item.MaKyThi,
            SoLuong: kt_item.SoLuongHocSinh,
          }));
          const tongHocSinh = hocsinh.reduce(
            (prevNum, nextNum) => prevNum + nextNum.SoLuong,
            0
          );

          const data_chart = {
            labels: hocsinh.map((item) => item.Ma),
            datasets: [
              {
                data: hocsinh.map((item) => item.SoLuong),
                // colors: [(opacity = 1) => `rgba(0, 0, 0, ${opacity})`],
              },
            ],
          };

          // console.log(hocsinh);
          return (
            <View
              key={loaiTK_index.toString()}
              style={{
                width: "100%",
              }}
            >
              <BarChart_Custom {...{ data_chart }} />
              <Text>
                Tổng số học sinh các kỳ thi:{" "}
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  {tongHocSinh} học sinh
                </Text>
              </Text>

              {hocsinh.map((hs_item, hs_index) => (
                <View key={hs_index.toString()} style={{ paddingVertical: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {`${hs_item.Ma}: `}
                    <Text
                      style={{
                        fontWeight: "normal",
                        color: "red",
                      }}
                    >
                      {`${hs_item.Ten} - ${
                        hs_item.SoLuong
                      } học sinh - ${(() => {
                        if (tongHocSinh > 0) {
                          return (hs_item.SoLuong * 100) / tongHocSinh;
                        }
                        return 0;
                      })()}%`}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          );
        }
      }
    });
  };
  const BieuDo_ThongKe = () => {
    return (
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
              width: "100%",
              // borderWidth: 1,
            }}
          >
            <Chart />
          </ScrollView>
        </View>
      </View>
    );
  };
  //#endregion

  return (
    <View style={styles.center}>
      {/*Danh sách thông kê*/}
      <SoLieu_ThongKe />
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
  ketqua: {
    color: "red",
  },
});
export default Thongke;
