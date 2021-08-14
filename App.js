import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { _User, _Admin, _Genaral, Test } from "./Screen/index";

import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";

const ScreenStyle = {
  headerTitleStyle: {
    alignSelf: "center",
  },
  headerTitleAlign: "center",
  headerStyle: {
    // backgroundColor: "#DEEBFE",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

// Admin Screen
const AdminStack = createStackNavigator();
function AdminStack_Screen() {
  return (
    <AdminStack.Navigator
      initialRouteName="Kỳ tuyển sinh"
      screenOptions={ScreenStyle}
    >
      {/* Kỳ tuyển sinh */}
      <AdminStack.Screen name="Kỳ tuyển sinh" component={_Admin.Kytuyensinh} />
      {/* Kế hoạch tuyển sinh */}
      <AdminStack.Screen
        name="Kế hoạch tuyển sinh"
        component={_Admin.Kehoachtuyensinh}
      />
      {/* Kỳ thi*/}
      <AdminStack.Screen name="Kỳ thi" component={_Admin.Kythi} />
      {/* Hồ sơ */}
      <AdminStack.Screen name="Hồ sơ" component={_Admin.Hoso} />
      {/* Tài khoản */}
      <AdminStack.Screen name="Tài khoản" component={_Admin.Taikhoan} />
    </AdminStack.Navigator>
  );
}

// User Screen
const UserStack = createStackNavigator();
function UserStack_Screen() {
  return (
    <UserStack.Navigator
      initialRouteName="Trang chủ"
      screenOptions={ScreenStyle}
    >
      {/* Trang chủ */}
      <UserStack.Screen name="Trang chủ" component={_User.Trangchu} />
      {/* Danh mục văn bản */}
      <UserStack.Screen
        name="Danh mục văn bản"
        component={_User.Danhmucvanban}
      />
      {/* Thông tin tuyển sinh */}
      <UserStack.Screen
        name="Thông tin tuyển sinh"
        component={_User.Thongtintuyensinh}
      />
      {/* Đăng ký tuyển sinh */}
      <UserStack.Screen
        name="Đăng ký tuyển sinh"
        component={_User.Dangkytuyensinh}
      />
      <UserStack.Screen name="Trang đăng ký" component={_User.Trangdangky} />
      <UserStack.Screen name="FileDinhKem" component={_User.FileDinhKem} />
      {/* Tra cứu kết quả tuyển sinh */}
      <UserStack.Screen
        name="Tra cứu kết quả tuyển sinh"
        component={_User.Tracuuketquatuyensinh}
      />
      {/* Hướng dẫn đăng ký trực tuyến */}
      <UserStack.Screen
        name="Hướng dẫn đăng ký trực tuyến"
        component={_User.Huongdandangkytructuyen}
      />
    </UserStack.Navigator>
  );
}

const GenaralTab = createBottomTabNavigator();
function GenaralTab_Screen({ route, navigation }) {
  const data = route.params;
  return (
    <GenaralTab.Navigator
      initialRouteName="Quản lý"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize;
          let fontWeight;
          let fontSize;
          let tabName;
          let color;

          if (route.name === "Trang chủ") {
            tabName = "Trang chủ";
            if (focused) {
              iconName = "home";
              iconSize = 26;
              color = "tomato";
              fontWeight = "bold";
              fontSize = 15;
            } else {
              iconName = "home-outline";
              iconSize = 23;
              color = "gray";
              fontWeight = "normal";
              fontSize = 13;
            }
          } else if (route.name === "Quản lý") {
            tabName = "Quản lý";
            if (focused) {
              iconName = "equalizer";
              iconSize = 26;
              color = "tomato";
              fontWeight = "bold";
              fontSize = 15;
            } else {
              iconName = "equalizer-outline";
              iconSize = 23;
              color = "gray";
              fontWeight = "normal";
              fontSize = 13;
            }
          }
          // You can return any component that you like here!
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
                width: "100%",
                height: "100%",
                // borderWidth: 1,
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={iconSize}
                color={color}
              />
              <Text
                style={{
                  color: color,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                }}
              >
                {tabName}
              </Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false,
        style: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#FFF",
          height: 80,
          // paddingBottom: 10,
          // bottom: 20,
          // left: 20,
          // right: 20,
          // borderRadius: 25,
          // ...styles.shadow,
        },
      }}
    >
      <GenaralTab.Screen
        name="Trang chủ"
        component={_User.Trangchu}
        initialParams={{ ...data }}
      />
      {/* <GenaralTab.Screen
        name="Đăng nhập"
        component={_Genaral.Dangnhap}
        options={{
          headerTitle: () => <Text>Alo</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={"home"} size={40} color={"white"} />
          ),
          tabBarButton: (props) => <DangnhapTab {...props} />,
        }}
      /> */}
      <GenaralTab.Screen
        name="Quản lý"
        component={_Admin.Trangchu}
        initialParams={{ ...data }}
      />
    </GenaralTab.Navigator>
  );
}
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Đăng nhập" screenOptions={ScreenStyle}>
        <Stack.Screen name="Đăng nhập" component={_Genaral.Dangnhap} />
        <Stack.Screen name="Quản trị viên" component={GenaralTab_Screen} />
        <Stack.Screen name="Trang chủ" component={_User.Trangchu} />
        <Stack.Screen name="Test" component={Test} />
        {/* User */}
        <UserStack.Screen
          name="Danh mục văn bản"
          component={_User.Danhmucvanban}
        />
        <UserStack.Screen
          name="Thông tin tuyển sinh"
          component={_User.Thongtintuyensinh}
        />
        <UserStack.Screen
          name="Đăng ký tuyển sinh"
          component={_User.Dangkytuyensinh}
        />
        <UserStack.Screen name="Trang đăng ký" component={_User.Trangdangky} />
        <UserStack.Screen name="FileDinhKem" component={_User.FileDinhKem} />
        <UserStack.Screen
          name="Tra cứu kết quả tuyển sinh"
          component={_User.Tracuuketquatuyensinh}
        />
        <UserStack.Screen
          name="Hướng dẫn đăng ký trực tuyến"
          component={_User.Huongdandangkytructuyen}
        />
        {/* Admin */}
        <AdminStack.Screen
          name="Kỳ tuyển sinh"
          component={_Admin.Kytuyensinh}
        />
        <AdminStack.Screen
          name="Kế hoạch tuyển sinh"
          component={_Admin.Kehoachtuyensinh}
        />
        <AdminStack.Screen name="Kỳ thi" component={_Admin.Kythi} />
        <AdminStack.Screen name="Hồ sơ" component={_Admin.Hoso} />
        <AdminStack.Screen name="Tài khoản" component={_Admin.Taikhoan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//#region code cũ
// Đăng nhập Tab
const DangnhapTab = ({ children, onPress }) => (
  <View
    style={{
      top: -10,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    // onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        backgroundColor: "tomato",
        borderRadius: 35,
      }}
    >
      {children}
    </View>
  </View>
);
function _App() {
  return (
    <NavigationContainer>
      <GenaralTab.Navigator
        initialRouteName="User"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let iconSize;
            let fontWeight;
            let fontSize;
            let tabName;
            let color;

            if (route.name === "User") {
              tabName = "Người dùng";
              if (focused) {
                iconName = "account-group";
                iconSize = 34;
                color = "tomato";
                fontWeight = "bold";
                fontSize = 16;
              } else {
                iconName = "account-group-outline";
                iconSize = 23;
                color = "gray";
                fontWeight = "normal";
                fontSize = 13;
              }
            } else if (route.name === "Admin") {
              tabName = "Quản trị";
              if (focused) {
                iconName = "account-key";
                iconSize = 34;
                color = "tomato";
                fontWeight = "bold";
                fontSize = 16;
              } else {
                iconName = "account-key-outline";
                iconSize = 23;
                color = "gray";
                fontWeight = "normal";
                fontSize = 13;
              }
            }
            // You can return any component that you like here!
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                  // borderWidth: 1,
                  width: "100%",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={iconSize}
                  color={color}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                  }}
                >
                  {tabName}
                </Text>
              </View>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          showLabel: false,
          /* style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#FFF",
          borderRadius: 25,
          height: 60,
          ...styles.shadow,
        }, */
        }}
      >
        <GenaralTab.Screen name="User" component={UserStack_Screen} />
        {/* <GenaralTab.Screen
          name="Đăng nhập"
          component={_Genaral.Dangnhap}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name={"home"} size={30} color={"white"} />
            ),
            tabBarButton: (props) => <DangnhapTab {...props} />,
          }}
        /> */}
        <GenaralTab.Screen name="Admin" component={AdminStack_Screen} />
      </GenaralTab.Navigator>
    </NavigationContainer>
  );
}
//#endregion

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
export default App;
