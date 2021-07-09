import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
//* Screen
import {
  Dangkytuyensinh,
  Dangnhap,
  Gopy,
  Huongdandangkytructuyen,
  Danhmucvanban,
  Thongtintuyensinh,
  Tracuuketquatuyensinh,
  Trangchu,
  Trangdangky,
  FileDinhKem,
  Test,
} from "./Screen/index";

const ScreenStyle = {
  headerTitleStyle: {
    alignSelf: "center",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

// <Wallet/>
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Trang chủ" screenOptions={ScreenStyle}>
        {/* <Stack.Navigator
        initialRouteName="FileDinhKem"
        screenOptions={ScreenStyle}
      > */}
        {/* Đăng nhập */}
        <Stack.Screen name="Đăng nhập" component={Dangnhap} />
        {/* Trang chủ */}
        <Stack.Screen name="Trang chủ" component={Trangchu} />
        {/* Danh mục văn bản */}
        <Stack.Screen name="Danh mục văn bản" component={Danhmucvanban} />
        {/* Thông tin tuyển sinh */}
        <Stack.Screen
          name="Thông tin tuyển sinh"
          component={Thongtintuyensinh}
        />
        {/* Đăng ký tuyển sinh */}
        <Stack.Screen name="Đăng ký tuyển sinh" component={Dangkytuyensinh} />
        <Stack.Screen name="Trang đăng ký" component={Trangdangky} />
        <Stack.Screen name="FileDinhKem" component={FileDinhKem} />
        {/* Tra cứu kết quả tuyển sinh */}
        <Stack.Screen
          name="Tra cứu kết quả tuyển sinh"
          component={Tracuuketquatuyensinh}
        />
        {/* Hướng dẫn đăng ký trực tuyến */}
        <Stack.Screen
          name="Hướng dẫn đăng ký trực tuyến"
          component={Huongdandangkytructuyen}
        />
        {/* Góp ý */}
        <Stack.Screen name="Góp ý" component={Gopy} />
        {/* Test */}
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
