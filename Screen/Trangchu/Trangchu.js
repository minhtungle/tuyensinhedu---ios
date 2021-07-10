import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import Wallet from "../../Wallet/Trangchu";
import NetInfo from "@react-native-community/netinfo";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useHeaderHeight } from "@react-navigation/stack";

function Trangchu({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // headerTitleAlign: "center",
    });
  });
  // const { Tinh } = route.params;
  const Tinh = "Vĩnh Phúc";
  //#region Kiểm tra kết nối mạng
  const [connected, setConnected] = useState(false);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected);
    });
  });
  if (!connected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DEEBFE",
          paddingBottom: headerHeight,
        }}
      >
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: "#61b15a",
            fontSize: 100,
            letterSpacing: -15,
          }}
        />
        <Text>Vui lòng kiểm tra kết nối mạng</Text>
      </View>
    );
  }
  //#endregion

  return (
    <View>
      <View
        style={{
          position: "absolute",

          right: 20,
          bottom: 20,
          zIndex: 1,
          opacity: 0.9,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",

            borderRadius: 25,
            backgroundColor: "#FFF",
            alignSelf: "flex-end",
            justifyContent: "center",
            paddingRight: 10, // nếu có X thì xoá
          }}
        >
          <IconButton icon="factory" color={Colors.red500} size={16} />
          <Text
            style={{
              fontSize: 12.5,
              fontWeight: "bold",
              justifyContent: "center",
              alignSelf: "center",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            {Tinh}
          </Text>
          {/* <IconButton
            icon="close"
            color={Colors.red500}
            size={18}
            style={{
              backgroundColor: "#FFF",
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 8,

              elevation: 1.5,
            }}
            onPress={() => navigation.goBack()}
          /> */}
        </View>
      </View>

      <ImageBackground
        source={require("../../assets/background.png")}
        style={{ width: "100%", height: "100%" }}
        blurRadius={1.5}
      >
        <Wallet {...{ Tinh }} />
      </ImageBackground>
    </View>
  );
}

export default Trangchu;
