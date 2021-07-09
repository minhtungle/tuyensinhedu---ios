import React from "react";
import { Image, Text, View } from "react-native";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";

function Test() {
  const [isReady, setIsReady] = React.useState(false);
  const _cacheResourcesAsync = async () => {
    const images = [require("../assets/icon.png")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };
  if (isReady) {
    return (
      <AppLoading
        startAsync={() => _cacheResourcesAsync()}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>alo</Text>
    </View>
  );
}
export default Test;
