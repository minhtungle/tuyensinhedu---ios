import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, IconButton } from "react-native-paper";

const DataWithSearchBar = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  //* Lấy API
  useEffect(() => {
    fetch(
      "http://tuyensinhvinhphuc.eduvi.vn/api/TSAPIService/getquyetdinhtuyensinh"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: index + 1,
            title: item.TieuDe,
            url: item.FileQuyetDinh,
          };
          arrData.push(obj);
        });
        setFilteredDataSource(arrData);
        setMasterDataSource(arrData);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Hệ thống đang cập nhật dữ liệu");
        setLoading(false);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity style={{}} onPress={() => getItem(item.url)}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              flexGrow: 2,
              justifyContent: "center",
              maxWidth: "90%",
            }}
          >
            <Text style={styles.itemStyle}>
              {item.id}
              {". "}
              {item.title.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: "column",
            }}
          >
            <IconButton
              style={{
                alignSelf: "flex-end",
              }}
              icon="file"
              color={Colors.red500}
              size={18}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    Linking.openURL(item).catch((err) => {
      console.error("Không thể kết nối trang web bởi: ", err);
      alert("Không tải được tệp");
    });
  };

  return (
    <View style={styles.data}>
      {loading && (
        <View style={{ position: "absolute", alignSelf: "center" }}>
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
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Tìm kiếm ..."
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    backgroundColor: "white",
    width: "90%",
    height: "80%",
    padding: 5,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  itemStyle: {},
  searchInput: {
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});

export default DataWithSearchBar;
