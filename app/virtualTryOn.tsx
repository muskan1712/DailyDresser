import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2;

export default function VirtualTryOn() {
  const { image } = useLocalSearchParams();
  const router = useRouter();
  const garmentImageUri = Array.isArray(image) ? image[0] : image;

  const [personImage, setPersonImage] = useState<string | null>(null);
  const [loadingPerson, setLoadingPerson] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null); // Placeholder for result

  const pickPersonImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLoadingPerson(true);
      setPersonImage(result.assets[0].uri);
      setTimeout(() => setLoadingPerson(false), 1000); // Simulate loading
    }
  };
const GEMINI_API_KEY1 = 'AIzaSyDdhUR4mOm0pkqSorUwRg7z5vzCmCMkTTY';
  // Simulate try-on API call
 const handleTryOn = async () => {
  if (!garmentImageUri || !personImage) return;
  setResultImage(null);

  try {
    // Convert both images to base64
    const garmentBase64 = await FileSystem.readAsStringAsync(garmentImageUri, { encoding: FileSystem.EncodingType.Base64 });
    const personBase64 = await FileSystem.readAsStringAsync(personImage, { encoding: FileSystem.EncodingType.Base64 });

    // Prepare the Gemini API payload
    const payload = {
      contents: [
        {
          parts: [
            {
              text: "Generate a try-on preview by overlaying the garment image onto the person image"
            },
             {
              inline_data: {
                mime_type: "image/jpeg",
                data: garmentBase64
              }
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: personBase64
              }
            }
          ]
        }
      ]
    };

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY1}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
     const data = await response.json();

    // Extract the result image (assuming Gemini returns base64 or a URL)
    // Adjust this part based on Gemini's actual response structure
const resultBase64 = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.inline_data)?.inline_data?.data;
    if (resultBase64) {
      setResultImage(`data:image/jpeg;base64,${resultBase64}`);
    } else {
      alert('No image returned from Gemini');
    }
  } catch (err) {
    alert('Try-on failed');
    console.error(err);
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.row}>
        {/* Garment image */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Garment image</Text>
          {garmentImageUri ? (
            <Image source={{ uri: garmentImageUri }} style={styles.cardImage} resizeMode="contain" />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>image came via{'\n'}parameters in{'\n'}this</Text>
            </View>
          )}
        </View>

        {/* Person image */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Person image</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={pickPersonImage}>
            <Feather name="upload-cloud" size={32} color="#aaa" />
            <Text style={styles.uploadText}>Drop Image Here{'\n'}- or -{'\n'}Click to Upload</Text>
          </TouchableOpacity>
          {loadingPerson && <ActivityIndicator style={{ marginTop: 10 }} />}
          {personImage && (
            <Image source={{ uri: personImage }} style={styles.cardImageOverlay} resizeMode="contain" />
          )}
        </View>
      </View>

      {/* Try On Button */}
      <TouchableOpacity
        style={[
          styles.tryOnBtn,
          (!garmentImageUri || !personImage) && { opacity: 0.5 }
        ]}
        onPress={handleTryOn}
        disabled={!garmentImageUri || !personImage}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          Try On
        </Text>
      </TouchableOpacity>

      {/* Result */}
      <View style={styles.resultCard}>
        <Text style={styles.cardTitle}>Result</Text>
        {resultImage ? (
          <Image source={{ uri: resultImage }} style={styles.resultImage} resizeMode="contain" />
        ) : (
          <View style={styles.resultPlaceholder}>
            <Feather name="image" size={40} color="#ccc" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#faf9fd',
    padding: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
  },
  cardImageOverlay: {
    position: 'absolute',
    left: 8,
    top: 32,
    width: CARD_SIZE - 16,
    height: CARD_SIZE - 40,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    width: '100%',
    height: '80%',
  },
  placeholderText: {
    color: '#bbb',
    textAlign: 'center',
    fontSize: 15,
  },
  uploadBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    width: '100%',
    height: '80%',
    marginTop: 8,
  },
  uploadText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  tryOnBtn: {
    backgroundColor: '#9B46E6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: -10,
    opacity: 1,
  },
  resultCard: {
    width: width - 40,
    height: width * 0.6,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#faf9fd',
    marginTop: 10,
    alignItems: 'center',
    padding: 8,
  },
  resultImage: {
    width: '100%',
    height: '90%',
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
  },
  resultPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    width: '100%',
    height: '90%',
  },
});