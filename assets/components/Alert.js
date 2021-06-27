import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

const Type = (param) => {
  switch (param) {
    case "success":
      return {
        color: "#9CDC78",
        image: "emoticon-excited",
      };
    case "info":
      return {
        color: "#84AFF7",
        image: "emoticon-wink-outline",
      };
    case "warning":
      return {
        color: "#F8C03E",
        image: "emoticon-tongue-outline",
      };
    case "error":
      return {
        color: "#FF8E9E",
        image: "emoticon-confused",
      };
  }
};
export function Alert(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const type = Type(props.type);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <View
          style={{
            height: 300,
            width: 300,
            backgroundColor: type.color,
            margin: 20,
            borderRadius: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <IconButton
            icon="close"
            color="white"
            size={22}
            style={{
              backgroundColor: type.color,
              alignSelf: "flex-end",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 8,

              elevation: 1.5,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          {/* Body Alert*/}
          <View
            style={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View>
              <IconButton icon={type.image} color="white" size={100} />
              <View
                style={{
                  position: "absolute",
                  bottom: 15,
                  alignSelf: "center",
                  width: 45,
                  height: 10,
                  borderRadius: 50,
                  backgroundColor: "black",
                  opacity: 0.1,
                  transform: [{ scaleX: 2 }],
                }}
              />
            </View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.message}>{props.message}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    flexGrow: 1,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
  message: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    flexGrow: 1,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
});

export default Alert;
