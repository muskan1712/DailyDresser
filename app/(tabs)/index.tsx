import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ChatWidget from "../../components/ChatWidget";
import { AntDesign } from "@expo/vector-icons"; // Icon set

export default function HomeScreen() {
  const [showChat, setShowChat] = useState(false);

  return (
    <LinearGradient colors={["#D15B9B", "#9B46E6"]} style={styles.gradient}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {!showChat && (
          <>
            <Text style={styles.title}>Welcome to Daily Dresser 👕</Text>
            <Text style={styles.subtitle}>
              Upload clothes, explore styles, or chat with our AI stylist.
            </Text>
          </>
        )}

        {showChat && (
          <View style={styles.chatContainer}>
            <ChatWidget onClose={() => setShowChat(false)} />
          </View>
        )}

        {/* Floating Toggle Button */}
        {!showChat && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setShowChat(true)}
          >
            <AntDesign name="message1" size={24} color="white" />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 4,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 50,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
