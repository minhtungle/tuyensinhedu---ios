import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

export default function Ketqua(props) {
  const { data, bottom } = props;
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <ScrollView>
        <View style={styles.block}>
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 5,
              borderColor: "white",
              borderRadius: 15,

              margin: 20,
              padding: "5%",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          >
            <View style={styles.title}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#145374",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Kết quả tra cứu hồ sơ
              </Text>
            </View>
            <View style={styles.box}>
              {/* Dữ liệu */}
              <View style={styles.thongtin}>
                <View style={styles.thongtinLeft}>
                  {/*Mã hồ sơ*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Mã hồ sơ:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.MaHoSo}
                    </Text>
                  </View>
                  {/*Họ tên*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Họ tên:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.HoTen}
                    </Text>
                  </View>
                  {/*Ngày sinh*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Ngày sinh:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.NgaySinh}
                    </Text>
                  </View>
                  {/*Giới tính*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Giới tính:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.GioiTinh === true ? "Nam" : "Nữ"}
                    </Text>
                  </View>
                  {/*Thường trú*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Thường trú:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.DiaChiTT !== (null || "") &&
                        data.ThongTinHoSo.DiaChiTT + " - "}
                      {data.ThongTinHoSo.PhuongTT +
                        " - " +
                        data.ThongTinHoSo.QuanTT +
                        " - " +
                        data.ThongTinHoSo.ThanhPhoTT}
                    </Text>
                  </View>
                  {/*Tạm trú*/}
                  {data.ThongTinHoSo.ThanhPhoTamTru !== (null && "" && 0) && (
                    <View style={styles.thongtinBlock}>
                      <Text style={styles.textField}>Tạm trú:</Text>
                      <Text style={styles.textData}>
                        {data.ThongTinHoSo.DiaChiTamTru !== (null || "") &&
                          data.ThongTinHoSo.DiaChiTamTru + " - "}
                        {data.ThongTinHoSo.PhuongTamTru +
                          " - " +
                          data.ThongTinHoSo.QuanTamTru +
                          " - " +
                          data.ThongTinHoSo.ThanhPhoTamTru}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.thongtinRight}>
                  {/*Ngày nộp hồ sơ*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Ngày nộp hồ sơ:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.NgayTao}
                    </Text>
                  </View>
                  {/*Trạng thái hồ sơ*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Trạng thái hồ sơ:</Text>
                    <Text style={styles.textData}>
                      {data.ThongTinHoSo.TrangThai === 1
                        ? "Hồ sơ đã đăng ký"
                        : data.ThongTinHoSo.TrangThai === 2
                        ? "Hồ sơ đã được duyệt"
                        : data.ThongTinHoSo.TrangThai === 3
                        ? "Hồ sơ đã trúng tuyển"
                        : data.ThongTinHoSo.TrangThai === 4 &&
                          "Hồ sơ bị trả lại"}
                    </Text>
                  </View>
                  {/*Trường đăng ký*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Trường đăng ký:</Text>
                    <View style={{ flexDirection: "column" }}>
                      {data.lst_TenTruong_DangKy.map((item, index) => (
                        <Text key={index.toString()} style={styles.textData}>
                          ● {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={styles.thongtinTable}>
                  {/*Bảng nguyện vọng*/}
                  <View style={styles.thongtinBlock}>
                    <Text style={styles.textField}>Kết quả:</Text>
                    {!data.ThoiGianCongBo ? (
                      <Text style={styles.textData}>
                        Chưa đến thời gian công bố kết quả. Vui lòng theo dõi
                        lịch trình tuyển sinh
                      </Text>
                    ) : (
                      ((data) => {
                        if (data.Cap) {
                          if (data.ThongTinHoSo.lstKetQua.length > 0) {
                            return (
                              <View
                                style={{
                                  width: "100%",
                                }}
                              >
                                <Table
                                  style={{
                                    flexDirection: "column",
                                    marginTop: 5,
                                  }}
                                  borderStyle={{ borderWidth: 1 }}
                                >
                                  <TableWrapper
                                    style={{
                                      flexDirection: "row",
                                      backgroundColor: "#cee5d0",
                                      borderWidth: 0.2,
                                      borderBottomWidth: 0,
                                    }}
                                  >
                                    {data.ThongTinHoSo.lstKetQua.map(
                                      (kq, kq_index) => (
                                        <Cell
                                          key={kq_index.toString()}
                                          textStyle={styles.tableCell_TextHead}
                                          data={kq.TenMon}
                                        />
                                      )
                                    )}
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Điểm ưu tiên"
                                    />
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Tổng điểm"
                                    />
                                  </TableWrapper>
                                </Table>
                                <Table
                                  style={{
                                    flexDirection: "column",
                                    marginTop: 10,
                                  }}
                                  borderStyle={{ borderWidth: 1 }}
                                >
                                  {/*---------Trên--------*/}
                                  <TableWrapper
                                    style={{
                                      flexDirection: "row",
                                      backgroundColor: "#cee5d0",
                                      borderWidth: 0.2,
                                      borderBottomWidth: 0,
                                    }}
                                  >
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Nguyện vọng"
                                    />
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Tên trường"
                                    />
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Trạng thái"
                                    />
                                    <Cell
                                      textStyle={styles.tableCell_TextHead}
                                      data="Lý do"
                                    />
                                  </TableWrapper>
                                  {/*---------Dưới--------*/}
                                  {data.lst_NguyenVong_HopLe.map(
                                    (item, index) => (
                                      <TableWrapper
                                        key={index.toString()}
                                        style={{
                                          flexDirection: "row",
                                          backgroundColor: "#ffeedb",
                                          borderWidth: 0.2,
                                        }}
                                      >
                                        <Cell
                                          textStyle={styles.tableCell_TextData}
                                          data={item.NguyenVong}
                                        />
                                        <Cell
                                          textStyle={styles.tableCell_TextData}
                                          data={item.TenTruong}
                                        />
                                        <Cell
                                          textStyle={styles.tableCell_TextData}
                                          data={
                                            item.TrangThai === 1
                                              ? "Hồ sơ đã đăng ký - Chưa có kết quả"
                                              : data.ThongTinHoSo.TrangThai ===
                                                2
                                              ? "Hồ sơ đã được duyệt - Chưa có kết quả"
                                              : data.ThongTinHoSo.TrangThai ===
                                                3
                                              ? "Hồ sơ đã trúng tuyển"
                                              : data.ThongTinHoSo.TrangThai ===
                                                  4 && "Hồ sơ bị trả lại"
                                          }
                                        />
                                        <Cell
                                          textStyle={styles.tableCell_TextData}
                                          data={item.TrangThai_Mail_Str}
                                        />
                                      </TableWrapper>
                                    )
                                  )}
                                </Table>
                              </View>
                            );
                          } else if (data.ThongTinHoSo.DoiTuongTuyenThang) {
                            return (
                              <Text style={styles.textData}>
                                {`Đã được tuyển thẳng ${data.lst_NguyenVong_HopLe[0].NguyenVong} trường ${data.lst_NguyenVong_HopLe[0].MaTruong} - ${data.lst_NguyenVong_HopLe[0].TenTruong}`}
                              </Text>
                            );
                          } else {
                            return (
                              <Text style={styles.textData}>
                                Chưa có kết quả
                              </Text>
                            );
                          }
                        } else {
                          return (
                            <Table
                              style={{ flexDirection: "column", marginTop: 10 }}
                              borderStyle={{ borderWidth: 1 }}
                            >
                              {/*---------Trên--------*/}
                              <TableWrapper
                                style={{
                                  flexDirection: "row",
                                  backgroundColor: "#cee5d0",
                                  borderWidth: 0.2,
                                  borderBottomWidth: 0,
                                }}
                              >
                                <Cell
                                  textStyle={styles.tableCell_TextHead}
                                  data="Nguyện vọng"
                                />
                                <Cell
                                  textStyle={styles.tableCell_TextHead}
                                  data="Tên trường"
                                />
                                <Cell
                                  textStyle={styles.tableCell_TextHead}
                                  data="Trạng thái"
                                />
                                <Cell
                                  textStyle={styles.tableCell_TextHead}
                                  data="Lý do"
                                />
                              </TableWrapper>
                              {/*---------Dưới--------*/}
                              {data.lst_NguyenVong_HopLe.map((item, index) => (
                                <TableWrapper
                                  key={index.toString()}
                                  style={{
                                    flexDirection: "row",
                                    backgroundColor: "#ffeedb",
                                    borderWidth: 0.2,
                                  }}
                                >
                                  <Cell
                                    textStyle={styles.tableCell_TextData}
                                    data={item.NguyenVong}
                                  />
                                  <Cell
                                    textStyle={styles.tableCell_TextData}
                                    data={item.TenTruong}
                                  />
                                  <Cell
                                    textStyle={styles.tableCell_TextData}
                                    data={
                                      item.TrangThai === 1
                                        ? "Hồ sơ đã đăng ký - Chưa có kết quả"
                                        : data.ThongTinHoSo.TrangThai === 2
                                        ? "Hồ sơ đã được duyệt - Chưa có kết quả"
                                        : data.ThongTinHoSo.TrangThai === 3
                                        ? "Hồ sơ đã trúng tuyển"
                                        : data.ThongTinHoSo.TrangThai === 4 &&
                                          "Hồ sơ bị trả lại"
                                    }
                                  />
                                  <Cell
                                    textStyle={styles.tableCell_TextData}
                                    data={item.TrangThai_Mail_Str}
                                  />
                                </TableWrapper>
                              ))}
                            </Table>
                          );
                        }
                      })(data)
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title1: {
    /*  borderColor: "blue",
    borderWidth: 1, */
    alignItems: "center",
    margin: "5%",
  },
  thongtin: {
    /*   borderColor: "purple",
    borderWidth: 1, */
    marginBottom: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  thongtinBlock: {
    marginTop: "5%",
    /*     borderColor: "orange",
    borderWidth: 1, */
    width: "100%",
  },
  thongtinLeft: {
    alignItems: "flex-start",
    /*   borderColor: "green",
    borderWidth: 1, */
    marginHorizontal: 5,
    flexGrow: 1,
  },
  thongtinRight: {
    alignItems: "flex-start",
    /*     borderColor: "green",
    borderWidth: 1, */
    marginHorizontal: 5,
    flexGrow: 1,
  },
  textField: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textData: {
    fontSize: 18,
  },
  thongtinTable: {
    width: "100%",
    marginHorizontal: 5,
    marginBottom: 50,
  },
  tableCell_TextData: {
    textAlign: "center",
    padding: 5,
  },
  tableCell_TextHead: {
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});
