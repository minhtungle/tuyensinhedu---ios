import React, { useLayoutEffect } from "react";
import { Button, Text, View } from "native-base";
import AnimatedEllipsis from "react-native-animated-ellipsis";
//import { Button } from "galio-framework";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  TextInput,
} from "react-native";
function Gopy({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Góp ý",
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.main}
      >
        <View style={styles.block}>
          <Text style={styles.title}>Gửi ý kiến của bạn cho chúng tôi</Text>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            keyboardType="default"
            multiline={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Email - name@gmail.com"
            keyboardType={"email-address"}
            multiline={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType={"number-pad"}
            multiline={false}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Vui lòng nhập nội dung vào đây"
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
          />
          <Button
            success
            style={styles.button}
            color="#61b15a"
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Text>Gửi liên hệ</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEEBFE",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "bold",
    color: "#1e6f5c",
  },
  block: {
    width: "90%",
    // height: "80%",
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
  input: {
    borderRadius: 10,
    borderColor: "#008577",
    borderWidth: 0.8,
    height: 40,
    marginTop: "2%",
    paddingLeft: 20,
    fontSize: 20,
    width: "90%",
    marginBottom: 5,
  },
  button: {
    marginBottom: "5%",
    alignSelf: "center",
    borderRadius: 25,
    textShadowColor: "#bbbbbb",

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
export default Gopy;
