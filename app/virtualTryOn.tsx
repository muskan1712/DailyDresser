
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function VirtualTryOn() {
  const { image } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Ensure image is always a string
  const imageUri = Array.isArray(image) ? image[0] : image;

  console.log("Virtual Try-On image URI:", imageUri); // Debug

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Virtual Try-On</Text>

      {imageUri ? (
        <View style={styles.imageWrapper}>
          {loading && <ActivityIndicator size="large" color="#999" style={styles.loader} />}
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              console.error("Failed to load image:", imageUri);
            }}
          />
        </View>
      ) : (
        <Text style={styles.errorText}>No image provided for try-on.</Text>
      )}
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
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  imageWrapper: {
    width: width * 0.85,
    height: width * 1.2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
});
