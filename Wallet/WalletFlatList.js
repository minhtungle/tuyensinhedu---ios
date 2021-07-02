import React from "react";
import { StatusBar } from "expo-status-bar";

import {
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from "react-native";

import { Cards } from "../Transformations/components/Card";
import WalletCard from "./WalletCard";
import { useNavigation } from "@react-navigation/native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const cards = [
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
  {
    index: "5",
    type: Cards.Card5,
  },
  {
    index: "6",
    type: Cards.Card6,
  },
];
const y = new Animated.Value(0);
const Wallet = ({ Tinh }) => {
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
      style={{ marginTop: 40 }}
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={renderItem}
      keyExtractor={(item) => item.index}
      {...{ onScroll }}
    ></AnimatedFlatList>
  );
};
export default Wallet;
