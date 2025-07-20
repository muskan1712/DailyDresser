// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Image,
// //   StyleSheet,
// //   ActivityIndicator,
// //   Alert,
// //   TouchableOpacity,
// //   Text,
// //   Modal,
// // } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// // import axios from 'axios';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import ChatbotButton from '@/components/ChatbotButton';
// // import { AntDesign } from '@expo/vector-icons';
// // import Constants from 'expo-constants';

// // // ✅ Safely extract BACKEND_URL with fallback
// // const BACKEND_URL: string = Constants.expoConfig?.extra?.BACKEND_URL ?? 'http://localhost:3000';

// // const UploadScreen = () => {
// //   const [imageUri, setImageUri] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);

// //   const pickImage = async () => {
// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       quality: 1,
// //     });

// //     if (!result.canceled) {
// //       setImageUri(result.assets[0].uri);
// //     }
// //   };

// //   const uploadImage = async () => {
// //     if (!imageUri) return;
// //     setUploading(true);

// //     const filename = imageUri.split('/').pop()!;
// //     const fileType = filename.split('.').pop();
// //     const formData = new FormData();

// //     formData.append('images', {
// //       uri: imageUri,
// //       name: filename,
// //       type: `image/${fileType}`,
// //     } as any);

// //     try {
// //       const response = await axios.post(`${BACKEND_URL}/upload-clothes`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       Alert.alert('✅ Upload Successful', 'Clothing info detected and uploaded!');
// //       setImageUri(null);
// //     } catch (err) {
// //       console.error('❌ Upload failed:', err);
// //       Alert.alert('❌ Upload Failed', 'Something went wrong while uploading.');
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <LinearGradient colors={['#D15B9B', '#9B46E6']} style={styles.container}>
// //       <Text style={styles.title}>👕 Upload Your Outfit</Text>

// //       {imageUri && (
// //         <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
// //       )}

// //       <TouchableOpacity style={styles.button} onPress={pickImage}>
// //         <AntDesign name="picture" size={20} color="#fff" />
// //         <Text style={styles.buttonText}> Pick Image</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         style={[styles.button, styles.uploadButton]}
// //         onPress={uploadImage}
// //         disabled={!imageUri || uploading}
// //       >
// //         <AntDesign name="cloudupload" size={20} color="#fff" />
// //         <Text style={styles.buttonText}> Upload</Text>
// //       </TouchableOpacity>

// //       {!imageUri && (
// //         <Text style={styles.helperText}>No image selected yet</Text>
// //       )}

// //       <Modal visible={uploading} transparent animationType="fade">
// //         <View style={styles.overlay}>
// //           <ActivityIndicator size="large" color="#fff" />
// //           <Text style={styles.loadingText}>Uploading...</Text>
// //         </View>
// //       </Modal>

// //       <ChatbotButton />
// //     </LinearGradient>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     paddingTop: 60,
// //     paddingHorizontal: 20,
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //     marginBottom: 30,
// //   },
// //   image: {
// //     width: '100%',
// //     height: 300,
// //     borderRadius: 20,
// //     borderWidth: 2,
// //     borderColor: '#fff',
// //     marginBottom: 25,
// //   },
// //   button: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#D15B9B',
// //     paddingVertical: 12,
// //     paddingHorizontal: 20,
// //     borderRadius: 30,
// //     marginBottom: 16,
// //     width: '80%',
// //     justifyContent: 'center',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.2,
// //     shadowRadius: 10,
// //     elevation: 5,
// //   },
// //   uploadButton: {
// //     backgroundColor: '#9B46E6',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// //   helperText: {
// //     color: '#f0f0f0',
// //     marginTop: 10,
// //     fontStyle: 'italic',
// //   },
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   loadingText: {
// //     color: '#fff',
// //     marginTop: 12,
// //     fontSize: 18,
// //   },
// // });

// // export default UploadScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   Text,
//   Modal,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import ChatbotButton from '@/components/ChatbotButton';
// import { AntDesign } from '@expo/vector-icons';

// const BACKEND_URL = 'https://mergedfolder-pq21.onrender.com'; // ✅ No trailing slash

// const UploadScreen = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!result.canceled && result.assets?.length > 0) {
//         setImageUri(result.assets[0].uri);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to open image picker.');
//       console.error(error);
//     }
//   };

//   const uploadImage = async () => {
//     if (!imageUri) return;
//     setUploading(true);

//     const filename = imageUri.split('/').pop()!;
//     const fileType = filename.split('.').pop();

//     const formData = new FormData();
//     formData.append('images', {
//       uri: imageUri,
//       name: filename,
//       type: `image/${fileType}`,
//     } as any); // ⚠️ RN FormData requires `as any` for type compatibility

//     try {
//       const response = await axios.post(`${BACKEND_URL}/upload-clothes`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Alert.alert('✅ Upload Successful', 'Clothing info detected and uploaded!');
//       setImageUri(null);
//     } catch (err) {
//       console.error('❌ Upload failed:', err);
//       Alert.alert('❌ Upload Failed', 'Something went wrong while uploading.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#D15B9B', '#9B46E6']} style={styles.container}>
//       <Text style={styles.title}>👕 Upload Your Outfit</Text>

//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
//       )}

//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         <AntDesign name="picture" size={20} color="#fff" />
//         <Text style={styles.buttonText}> Pick Image</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, styles.uploadButton]}
//         onPress={uploadImage}
//         disabled={!imageUri || uploading}
//       >
//         <AntDesign name="cloudupload" size={20} color="#fff" />
//         <Text style={styles.buttonText}> Upload</Text>
//       </TouchableOpacity>

//       {!imageUri && <Text style={styles.helperText}>No image selected yet</Text>}

//       <Modal visible={uploading} transparent animationType="fade">
//         <View style={styles.overlay}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={styles.loadingText}>Uploading...</Text>
//         </View>
//       </Modal>

//       <ChatbotButton />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 30,
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//     marginBottom: 25,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D15B9B',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     marginBottom: 16,
//     width: '80%',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   uploadButton: {
//     backgroundColor: '#9B46E6',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   helperText: {
//     color: '#f0f0f0',
//     marginTop: 10,
//     fontStyle: 'italic',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 18,
//   },
// });

// export default UploadScreen;
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import ChatbotButton from "@/components/ChatbotButton";
import { AntDesign } from "@expo/vector-icons";

const BACKEND_URL = "https://mergedfolder-pq21.onrender.com";

const UploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;
    setUploading(true);

    const filename = imageUri.split("/").pop()!;
    const fileType = filename.split(".").pop();
    const formData = new FormData();

    formData.append("images", {
      uri: imageUri,
      name: filename,
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/upload-clothes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      Alert.alert(
        "✅ Upload Successful",
        "Clothing info detected and uploaded!",
      );
      setImageUri(null);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      Alert.alert("❌ Upload Failed", "Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={["#D15B9B", "#9B46E6"]} style={styles.container}>
      <Text style={styles.title}>👕 Upload Your Outfit</Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <AntDesign name="picture" size={20} color="#fff" />
        <Text style={styles.buttonText}> Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={uploadImage}
        disabled={!imageUri || uploading}
      >
        <AntDesign name="cloudupload" size={20} color="#fff" />
        <Text style={styles.buttonText}> Upload</Text>
      </TouchableOpacity>

      {!imageUri && (
        <Text style={styles.helperText}>No image selected yet</Text>
      )}

      <Modal visible={uploading} transparent animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      </Modal>

      <ChatbotButton />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 25,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D15B9B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 16,
    width: "80%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: "#9B46E6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  helperText: {
    color: "#f0f0f0",
    marginTop: 10,
    fontStyle: "italic",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 18,
  },
});

export default UploadScreen;
