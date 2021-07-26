import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
/* //* User
import {
  Dangkytuyensinh,
  Dangnhap,
  Danhmucvanban,
  FileDinhKem,
  Gopy,
  Huongdandangkytructuyen,
  Test,
  Thongtintuyensinh,
  Tracuuketquatuyensinh,
  Trangchu,
  Trangdangky,
} from "./Screen/User/index"; */
import { _User, _Admin, Test } from "./Screen/index";
const ScreenStyle = {
  headerTitleStyle: {
    alignSelf: "center",
  },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#DEEBFE",
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
        <Stack.Screen name="Đăng nhập" component={_User.Dangnhap} />
        {/* Trang chủ */}
        <Stack.Screen name="Trang chủ" component={_User.Trangchu} />
        {/* Danh mục văn bản */}
        <Stack.Screen name="Danh mục văn bản" component={_User.Danhmucvanban} />
        {/* Thông tin tuyển sinh */}
        <Stack.Screen
          name="Thông tin tuyển sinh"
          component={_User.Thongtintuyensinh}
        />
        {/* Đăng ký tuyển sinh */}
        <Stack.Screen
          name="Đăng ký tuyển sinh"
          component={_User.Dangkytuyensinh}
        />
        <Stack.Screen name="Trang đăng ký" component={_User.Trangdangky} />
        <Stack.Screen name="FileDinhKem" component={_User.FileDinhKem} />
        {/* Tra cứu kết quả tuyển sinh */}
        <Stack.Screen
          name="Tra cứu kết quả tuyển sinh"
          component={_User.Tracuuketquatuyensinh}
        />
        {/* Hướng dẫn đăng ký trực tuyến */}
        <Stack.Screen
          name="Hướng dẫn đăng ký trực tuyến"
          component={_User.Huongdandangkytructuyen}
        />
        {/* Góp ý */}
        <Stack.Screen name="Góp ý" component={_User.Gopy} />
        {/* Test */}
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
