// Chiều cao thanh chọn chung
import { Dimensions } from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

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
