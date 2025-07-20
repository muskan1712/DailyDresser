 import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import ChatbotButton from '@/components/ChatbotButton';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

const BACKEND_URL = process.env.BACKEND_URL;

const ExploreScreen = () => {
  const [clothes, setClothes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchClothes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/clothes`);
      setClothes(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch clothes:', err);
      Alert.alert('Fetch Error', 'Failed to load clothes. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCloth = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/clothes/${id}`);
      setClothes(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      Alert.alert('Error', '❌ Failed to delete item.');
      console.error(err);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete Confirmation', 'Do you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCloth(id) },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchClothes();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 80)} style={styles.cardWrapper}>
      <Pressable android_ripple={{ color: '#ddd' }} style={styles.card}>
        <Image
          source={{ uri: item.images[0]?.path }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.type} - {item.subType}</Text>
          <Text style={styles.meta}>{item.gender} • {item.season}</Text>

          {typeof item.color === 'object' ? (
            <Text style={styles.meta}>
              🎨 Color:{' '}
              <Text style={styles.bold}>
                {item.color.top ? `Top - ${item.color.top}` : ''}
                {item.color.top && item.color.bottom ? ', ' : ''}
                {item.color.bottom ? `Bottom - ${item.color.bottom}` : ''}
              </Text>
            </Text>
          ) : (
            <Text style={styles.meta}>
              🎨 Color: <Text style={styles.bold}>{item.color}</Text>
            </Text>
          )}

          {item.style && (
            <Text style={styles.meta}>
              🎭 Style: <Text style={styles.bold}>{item.style}</Text>
            </Text>
          )}

          {item.confidence && (
            <Text style={styles.meta}>
              🔍 Confidence: <Text style={styles.bold}>{item.confidence}%</Text>
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => confirmDelete(item._id)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 100 }} />;
  }

  return (
    <LinearGradient colors={['#D15B9B', '#9B46E6']} style={styles.container}>
      <FlatList
        data={clothes}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={1}
      />
      <ChatbotButton />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    position: 'relative',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  bold: {
    color: '#222',
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ExploreScreen;
