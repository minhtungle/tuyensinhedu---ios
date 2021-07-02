import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Picker,
  Form,
  DeckSwiper,
  Card,
  CardItem,
} from "native-base";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

export default function ButtonThemeExample() {
  const [text, setText] = useState("");
  const [data, setData] = useState({
    Tinh: "Chọn Tỉnh/Thành phố",
  });
  const cards = [
    {
      text: "Card One",
      name: "One",
    },
    {
      text: "Card Two",
      name: "Two",
    },
    {
      text: "Card Three",
      name: "Three",
    },
    {
      text: "Card Four",
      name: "Four",
    },
  ];
  //#region Picker
  const [picker, setPicker] = useState({
    IDTinh: [
      {
        id: "",
        name: "Chọn Tỉnh/Thành phố",
      },
    ],
  });
  //* Chọn giá trị cho Picker
  const onChangeValue = (newValue) => {
    setData((prevState) => ({
      ...prevState,
      Tinh: newValue,
    }));
  };
  //#endregion

  //#region API - Call
  //* Tỉnh:
  useEffect(() => {
    fetch(
      "http://tuyensinh.huongvietedm.vn/api/TSAPIService/getaddress?idParent=1&level=1"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const arrData = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        responseJson.Result.results.map((item, index) => {
          const obj = {
            id: item.ID,
            name: item.TenDiaChi,
          };
          arrData.push(obj);
        });
        setPicker((prevState) => ({
          ...prevState,
          IDTinh: arrData,
        }));
      })
      .catch((error) => {
        const arrDataFail = [
          {
            id: "",
            name: "Chọn Tỉnh/Thành phố",
          },
        ];
        setPicker((prevState) => ({
          ...prevState,
          IDTinh: arrDataFail,
        }));
      });
  }, [0]);
  //#endregion

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="camera" onPress={() => console.log("click")} />
          </Button>
        </Right>
      </Header>
      <Content style={[styles.border, { flex: 1 }]} scrollEnabled={false}>
        <Form>
          <Picker
            note
            mode="dropdown"
            style={{ width: "100%" }}
            selectedValue={data.Tinh}
            onValueChange={onChangeValue}
          >
            {picker.IDTinh.map((item, index) => {
              return (
                <Picker.Item
                  key={index.toString()}
                  label={item.name}
                  value={item.name}
                />
              );
            })}
          </Picker>
        </Form>
        <TextInput
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
          mode="outlined"
          style={{ width: "50%" }}
        />
        <DeckSwiper
          dataSource={cards}
          renderItem={(item) => (
            <Card style={{ elevation: 3 }}>
              <CardItem></CardItem>
              <CardItem cardBody>
                <View
                  style={{ height: 150, flex: 1, backgroundColor: "green" }}
                />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: "#ED4A6A" }} />
                <Text>{item.name}</Text>
              </CardItem>
            </Card>
          )}
        />
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
  },
});
