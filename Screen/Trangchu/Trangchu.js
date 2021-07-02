import React, { useLayoutEffect } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import Wallet from "../../Wallet/Trangchu";

function Trangchu({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const { Tinh } = route.params;
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
          <IconButton
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
          />
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
