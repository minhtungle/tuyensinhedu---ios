import { Dimensions } from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const TAB_HEADER_HEIGHT = 50;
export const STYLE = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DEEBFE",
  },
  main: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEEBFE",
    paddingVertical: 20,
    // borderWidth: 1,
  },
  block: {
    width: "95%",
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
  title: {
    backgroundColor: "#61b15a",
    borderRadius: 25,
    position: "relative",
    top: -15,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 2,
    paddingBottom: 5,
  },
  titleText: {
    width: "50%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  box: {
    //alignItems: "center",
    padding: 10,
  },
  boxText: {
    paddingHorizontal: 10,
    textAlign: "justify",
    fontSize: 18,
  },
  field: {
    borderColor: "white",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: 10,
    marginBottom: "1%",
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    // borderWidth: 1,
    // paddingHorizontal: 10,
  },
  thoiGian: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
};
