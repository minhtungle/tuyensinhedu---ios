import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "pinar";

function Huongdandangkytructuyen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Hướng dẫn đăng ký ",
    });
  });
  const [images, setImages] = useState({
    b1: {
      uri: [require("./Images/b1.png")],
      activeImg: 0,
    },
    b2: {
      uri: [require("./Images/b2.png")],
      activeImg: 0,
    },
    b3: {
      uri: [require("./Images/b3.png")],
      activeImg: 0,
    },
    b4: {
      uri: [
        require("./Images/b4_1.png"),
        require("./Images/b4_2.png"),
        require("./Images/b4_3.png"),
        require("./Images/b4_4.png"),
        require("./Images/b4_5.png"),
        require("./Images/b4_6.png"),
        require("./Images/b4_7.png"),
      ],
      activeImg: 0,
    },
    b5: {
      uri: [require("./Images/b5_1.png"), require("./Images/b5_2.png")],
      activeImg: 0,
    },
    b6: {
      uri: [require("./Images/b6.png")],
      activeImg: 0,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*Bước 1*/}
        <View style={[styles.main, { height: 600 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 1</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Tại màn hình trang chủ, chọn{" "}
                  <Text style={{ fontWeight: "bold" }}>Đăng ký tuyển sinh</Text>
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b1.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
              </View>
            </View>
          </View>
        </View>
        {/*Bước 2*/}
        <View style={[styles.main, { height: 600 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 2</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Trang tuyển sinh hiển thị danh sách các kỳ thi tuyển
                  sinh hiện có, phụ huynh click chọn kỳ tuyển sinh muốn đăng ký
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b2.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
              </View>
            </View>
          </View>
        </View>
        {/*Bước 3*/}
        <View style={[styles.main, { height: 600 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 3</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Phụ huynh/học sinh nhấn vào ô "
                  <Text style={{ fontWeight: "bold" }}>Chọn trường</Text>"
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b3.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
              </View>
            </View>
          </View>
        </View>
        {/*Bước 4*/}
        <View style={[styles.main, { height: 780 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 4</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Chọn trường muốn đăng ký trong danh sách trường tuyển
                  sinh
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b4.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
                <Text style={styles.boxText}>
                  &emsp;<Text style={{ fontWeight: "bold" }}>Lưu ý </Text>
                  (Đối với Trường chuyên/chất lượng cao) :
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Phụ huynh/học sinh muốn đăng ký học lớp chuyên/chất lượng
                  cao nhấn <Text style={{ color: "red" }}>"Chọn lớp học" </Text>
                  và chọn{" "}
                  <Text style={{ color: "red" }}>
                    "Lớp chuyên/chất lượng cao"
                  </Text>
                  .
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Phụ huynh/học sinh muốn đăng ký học lớp đại trà không cần
                  thực hiện chọn lớp. Trong trường hợp có lớp đại trà thì thực
                  hiện chọn lớp đại trà.
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/*Bước 5*/}
        <View style={[styles.main, { height: 820 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 5</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Phụ huynh nhập đầy đủ các trường thông tin vào form đăng
                  ký
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b5.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
                <Text style={styles.boxText}>
                  &emsp;<Text style={{ fontWeight: "bold" }}>Lưu ý :</Text>
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Mã học sinh, mật khẩu hệ thống sẽ tự động cập nhật, phụ
                  huynh vui lòng kiểm tra e-mail thông báo để nhận mã học sinh
                  và mật khẩu.
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Các thông tin chứa dấu
                  <Text style={{ color: "red" }}> *</Text> đỏ là các thông tin
                  bắt buộc nhập.
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Nếu thông tin về hộ khẩu thường trú và nơi ở hiện tại không
                  chính xác, phụ huynh vui lòng liên hệ cơ sở giáo dục cũ để
                  chỉnh sửa hoặc đợi đến thời gian mở tuyển sinh trực tiếp mang
                  hồ sơ tới trường để đăng ký tuyển sinh.
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/*Bước 6*/}
        <View style={[styles.main, { height: 900 }]}>
          <View style={styles.block}>
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>Bước 6</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  &emsp;Phụ huynh kiểm tra lại thông tin sau đó tích chọn cam
                  kết, nhấn <Text style={{ fontWeight: "bold" }}>Đăng ký</Text>
                </Text>
                <Carousel index={0} height={400} style={styles.carousel}>
                  {images.b6.uri.map((item, index) => (
                    <View key={index.toString()} style={styles.imageContainer}>
                      <Image source={item} style={styles.image} />
                    </View>
                  ))}
                </Carousel>
                <Text style={styles.boxText}>
                  &emsp;<Text style={{ fontWeight: "bold" }}>Lưu ý :</Text>
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Trường hợp học sinh có nơi sinh ở nước ngoài thì nộp hồ sơ
                  trực tiếp tại trường.
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Phụ huynh vui lòng không cung cấp mã học sinh, mật khẩu, mã
                  hồ sơ cho bên thứ 3 dưới bất kỳ hình thức nào nhằm bảo mật
                  thông tin hồ sơ.
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  ► Phụ huynh/học sinh đăng ký không thành công, vui lòng kiểm
                  tra lại phân tuyến trường đăng ký và hộ khẩu.
                </Text>
                <Text style={[styles.boxText, { fontSize: 15 }]}>
                  Khi nhận được e-mail trả lại hồ sơ kèm theo lý cần chỉnh sửa
                  hồ sơ, phụ huynh/học sinh thực hiện sửa đổi trực tiếp trên
                  cổng thông tin tại mục "
                  <Text style={{ fontWeight: "bold" }}>Đăng ký hồ sơ</Text>" dựa
                  vào mã học sinh và mật khẩu đã được cấp
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DEEBFE",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEEBFE",
  },
  block: {
    width: "95%",
    height: "90%",
    backgroundColor: "white",
    alignItems: "center",
    //* bóng mờ
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  title: {
    backgroundColor: "#61b15a",
    borderRadius: 25,
    position: "relative",
    top: -15,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 2,
    paddingBottom: 5,
  },
  titleText: {
    width: "50%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  box: {
    //alignItems: "center",
    padding: 10,
  },
  boxText: {
    paddingHorizontal: 10,
    textAlign: "justify",
    fontSize: 16,
  },
  field: {
    borderColor: "white",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 10,
    marginBottom: "1%",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  carousel: {
    flex: 1,
    marginVertical: 10,
  },
});
export default Huongdandangkytructuyen;
