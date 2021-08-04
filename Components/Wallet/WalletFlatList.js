import React from "react";
import { StatusBar } from "expo-status-bar";

import {
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from "react-native";

import { Cards } from "./Card";
import WalletCard from "./WalletCard";
import { useNavigation } from "@react-navigation/native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const cards = [
  {
    index: "5",
    type: Cards.Card5,
  },
  {
    index: "1",
    type: Cards.Card1,
  },
  {
    index: "2",
    type: Cards.Card2,
  },
  {
    index: "3",
    type: Cards.Card3,
  },
  {
    index: "4",
    type: Cards.Card4,
  },

  // {
  //   index: "6",
  //   type: Cards.Card6,
  // },
];
const y = new Animated.Value(0);
const WalletFlatList = ({ Tinh }) => {
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  const navigation = useNavigation();
  // Lặp từng Card
  const renderItem = ({ index, item: { type } }) => (
    <WalletCard {...{ index, y, type, Tinh }} />
  );
  return (
    <AnimatedFlatList
      style={{ width: "100%" }}
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={renderItem}
      keyExtractor={(item) => item.index}
      {...{ onScroll }}
    ></AnimatedFlatList>
  );
};
export default WalletFlatList;
