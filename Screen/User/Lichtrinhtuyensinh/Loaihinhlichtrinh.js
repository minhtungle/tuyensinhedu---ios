import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { STYLE, TAB_HEADER_HEIGHT } from "./style";

export default function Loaihinhlichtrinh({ _data }) {
  const lstLT = _data[0].lstLT;
  return (
    <ScrollView nestedScrollEnabled>
      {/*Giai đoạn 1*/}
      <View style={styles.main}>
        <View style={styles.block}>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Giai đoạn 1</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>
                Niêm yết công khai kế hoạch tuyển sinh.
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, styles.thoiGian]}>
                {lstLT[0].ThoiGian}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*Giai đoạn 2*/}
      <View style={styles.main}>
        <View style={styles.block}>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Giai đoạn 2</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>
                Nhận hồ sơ tuyển sinh trực tuyến trên cổng thông tin.
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, styles.thoiGian]}>
                {lstLT[1].ThoiGian}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*Giai đoạn 3*/}
      <View style={styles.main}>
        <View style={styles.block}>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Giai đoạn 3</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>
                {`Nhận hồ sơ tuyển sinh trực tiếp
- Buổi sáng từ 7 giờ 30 phút đến 11 giờ 00 phút.
- Buổi chiều từ 14 giờ 00 phút đến 16 giờ 30 phút.
(Cuối buổi niêm phong hồ sơ tuyển sinh)`}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, styles.thoiGian]}>
                {lstLT[2].ThoiGian}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*Giai đoạn 4*/}
      <View style={styles.main}>
        <View style={styles.block}>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Giai đoạn 4</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>
                Thông báo, niêm yết danh sách học sinh trúng tuyển và phân luồng
                học sinh.
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, styles.thoiGian]}>
                {lstLT[3].ThoiGian}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*Giai đoạn 5*/}
      <View style={[styles.main, { marginBottom: 100 }]}>
        <View style={styles.block}>
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Giai đoạn 5</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>
                Tiếp nhận, giải quyết thắc mắc, khiếu nại của học sinh, phụ
                huynh (nếu có).
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, styles.thoiGian]}>
                {lstLT[4].ThoiGian}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  ...STYLE,
});
