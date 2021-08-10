// Chiều cao thanh chọn chung
import { Dimensions } from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const COLORS = [
  "#03256C",
  "#2541B2",
  "#1768AC",
  "#E5D549",
  "#1EAE98",
  "#F4A9A8",
  "#CE97B0",
  "#4AA96C",
  "#F55C47",
  "#867AE9",
  "#F98404",
  "#E93B81",
  "#5E8B7E",
  "#DBE6FD",
];

export const TAB_HEADER_HEIGHT = 50;
export const STYLE = {
  center: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.27,

    elevation: 10,
  },
};
