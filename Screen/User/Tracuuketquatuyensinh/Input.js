import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { IconButton, Colors } from "react-native-paper";

//* Giới hạn độ dài input
const MaxLength = (value, lenght) => {
  var TextLength = value.length.toString();
  if (TextLength == lenght) {
    Alert.alert(`Độ dài quy định của mã là ${lenght} ký tự`);
  }
};
const Inputs = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  let view;
  props.checkboxValue.map((checkbox, i) => {
    //* Kiểm tra ô nào check
    if (checkbox.checked) {
      //* Gọi view riêng cho mỗi loại
      switch (i) {
        case 0:
          return (view = (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã hồ sơ"
                keyboardType="default"
                value={checkbox.value1}
                multiline={false}
                onChangeText={(value) => {
                  MaxLength(value, 25);
                  props.updateValue(value, 1);
                }}
              />
            </View>
          ));
        case 1:
          return (view = (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã học sinh"
                keyboardType="default"
                value={checkbox.value1}
                multiline={false}
                onChangeText={(value) => {
                  MaxLength(value, 50);
                  props.updateValue(value, 1);
                }}
              />
              <View
                style={{
                  borderRadius: 10,
                  borderColor: "#008577",
                  borderWidth: 1,
                  height: 40,
                  marginTop: "2%",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{
                    paddingLeft: 20,
                    fontSize: 20,
                    flexGrow: 1,
                    alignSelf: "center",
                  }}
                  secureTextEntry={secureTextEntry}
                  value={checkbox.value2}
                  placeholder="Nhập mật khẩu"
                  keyboardType="default"
                  multiline={false}
                  onChangeText={(value) => props.updateValue(value, 2)}
                />
                <IconButton
                  icon="eye"
                  color={Colors.red500}
                  size={18}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              </View>
            </View>
          ));
        case 2:
          return (view = (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nhập số báo danh"
                keyboardType="default"
                value={checkbox.value1}
                multiline={false}
                onChangeText={(value) => {
                  MaxLength(value, 25);
                  props.updateValue(value, 1);
                }}
              />
            </View>
          ));
      }
    }
  });
  //! Nếu không có true thì trả ra null
  return view || null;
};
const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: "#008577",
    borderWidth: 0.8,
    height: 40,
    marginTop: "2%",
    paddingLeft: 20,
    fontSize: 20,
  },
});

export default Inputs;
