import React from "react";
import { View, SafeAreaView } from "react-native";
import ChatWidget from "../components/ChatWidget";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatWidget />
    </SafeAreaView>
  );
};

export default HomeScreen;
