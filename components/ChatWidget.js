import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Animated,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // or use MaterialIcons
import Constants from "expo-constants";

const BACKEND_CHATBOT_API = Constants.expoConfig.extra.BACKEND_CHATBOT_API;

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null); // 🔥 NEW: for virtual try-on

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, sender: "user" };
    const updatedMessages = [...messages, userMessage]; // ✅ includes previous messages

    setMessages(updatedMessages);
    setInputText("");

    try {
      const response = await axios.post(
        `${BACKEND_CHATBOT_API}/api/recommend`,
        {
          message: inputText,
          history: updatedMessages.map((msg) => ({
            sender: msg.sender,
            msg: msg.text,
          })),
        },
      );

      const botMessage = { text: response.data.text, sender: "bot" };
      if (response.data.items) {
        botMessage.items = response.data.items;
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const botMessage = {
        text: "Sorry, something went wrong.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to clipboard!");
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image); // ✅ mark image as selected
  };

  // const goToVirtualTryOn = () => {
  //   if (!selectedImage) {
  //     Alert.alert('Please select a clothing image first.');
  //     return;
  //   }
  //   navigation.navigate('VirtualTryOn', { image: selectedImage }); // 🔥 Send selected image
  // };
  const handleTryOn = (imageUrl) => {
    router.push({
      pathname: "/virtualTryOn",
      params: { image: imageUrl },
    });
  };
  const handleClosePress = () => {
    Alert.alert(
      "Close Chat",
      "Are you sure you want to close the chat?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: onClose },
      ],
      { cancelable: true },
    );
  };

  return (
    <LinearGradient colors={["#DA44bb", "#8921aa"]} style={{ flex: 1 }}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
        <AntDesign name="closecircle" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{ padding: 16 }}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <View style={styles.messageRow}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(msg.text)}
                style={styles.copyIcon}
              >
                <Feather name="copy" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {msg.items &&
              msg.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleImageSelect(item.images)}
                  style={[
                    styles.itemContainer,
                    selectedImage === item.images && {
                      borderColor: "green",
                      borderWidth: 2,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item.images }}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemName}>
                    {item.productDisplayNaNNNme || "No Name"}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleTryOn(selectedImage)}
        style={styles.tryOnButton}
      >
        <Text style={styles.tryOnText}>🧵 Virtual Try-On</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#f997daff",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },

  botBubble: {
    backgroundColor: "#d3a4f7",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },

  messageText: {
    color: "#fefefe", // soft white, easy on eyes
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.4,
    fontWeight: "500",
    fontFamily: "sans-serif-medium",
    textShadowColor: "rgba(0,0,0,0.2)", // subtle depth
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: "#ebddf5ff",
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
  itemContainer: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "pink",
    borderRadius: 10,
    padding: 5,
  },
  itemImage: {
    width: 120,
    height: 160,
    resizeMode: "cover",
    borderRadius: 10,
  },
  itemName: {
    marginTop: 4,
    color: "black",
  },
  tryOnButton: {
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  tryOnText: {
    color: "#6a0dad",
    fontWeight: "bold",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageText: {
    flexShrink: 1, // allows text to wrap if long
    color: "#000",
    fontSize: 15,
  },
  copyIcon: {
    padding: 6,
    marginLeft: 8,
    //backgroundColor: '#f0f0f0',
    borderRadius: 6,
    //borderWidth: 1,
    //borderColor: '#ccc',
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
