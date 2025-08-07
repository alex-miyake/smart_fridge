import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef, } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { callApi } from '../../api/apiClient' ;

interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  UserId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function FridgeScreen() {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser ] = useState<User | null>(null);
  const router = useRouter();

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    console.log('[FridgeScreen] useEffect triggered');

    // Get fridge items and username
    const fetchData = async () => {
      try {

        setLoading(true);
        setError(null);
        console.log('fetching Items...');

        // fetch fridge items
        const fridgeData = await callApi('/api/fridge', {
          method: 'GET',
          requiresAuth: true,
        });
        const filtered = (fridgeData as FridgeItem[]).filter(item => item.UserId === 1);
        //console.log('[FridgeScreen] filtered API data:', filtered);
        setFridgeItems(filtered);

        // hardcode test user id for now
        const userData = await callApi('/api/users/1', {
        method: 'GET',
        //requiresAuth: true,
      });
      setUser(userData as User);
      } 
      catch (error: any) {
        console.error('Failed to load fridge or user data:', error);
        setError('Failed to fetch fridge data. Please check your network connection');
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Placeholder for food image icon */}
      <Ionicons name="image-outline" size={24} color="#666" style={styles.foodIcon} />

      {/* Quantity badge */}
      <View style={styles.quantityBadge}>
        <Text style={styles.quantityText}>x{item.quantity}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDesc}>{item.unit}</Text> 
      </View>

    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.username}>{user ? user.username : 'Guest'}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}onPress={() => router.push('/addItem')}>
          <Ionicons name="add" size={20} color="#000" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Grid of food items */}
      <FlatList
        data={fridgeItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#3C3C3C',
  },
  username: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E2E2E',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  grid: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    aspectRatio: 1,
    position: 'relative',
  },
  foodIcon: {
    marginBottom: 8,
  },
  quantityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textContainer: {
    position: 'absolute',
    bottom: 18,          // Distance from bottom of card
    left: 18,            // Distance from left of card
  },

  foodName: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  foodDesc: {
    fontSize: 12,
    color: '#555',
  },
});


