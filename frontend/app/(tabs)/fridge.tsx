import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState, useRef, } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { callApi } from '../../api/apiClient' ;
import EditItemModal from '../(modals)/editItem';

export interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  unit: string | '';
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

  // Data retrieval function
  const fetchFridgeList = async () => {
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

  // Delete Item function
  const handleDelete = (id: number) => {
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete this item?',
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await callApi(`/api/fridge/${id}`, { method: 'DELETE', requiresAuth: true });
            setFridgeItems((prev) => prev.filter(item => item.id !== id));
            Alert.alert('Success', 'Item deleted successfully');
          } 
          catch (error) {
            Alert.alert('Error', 'Failed to delete item');
          }
        } 
      },
    ]
  );
};

// Edit item logic
const [editItem, setEditItem] = useState<FridgeItem | null>(null);
const [isEditModalVisible, setEditModalVisible] = useState(false);

const openEdit = (item: FridgeItem) => {
  console.log('[FridgeScreen] openEdit for', item.id);
  setEditItem(item);
  setEditModalVisible(true);
};

const closeEditModal = () => {
  setEditItem(null);
  setEditModalVisible(false);
};

  console.log('FridgeTab component is rendering...');

  useFocusEffect(
    useCallback(() => {
      fetchFridgeList();
      return () => {
        console.log('[FridgeScreen] Screen is losing focus. Data cleanup can happen here.');
      };
    }, [])
  );

  // Render item function
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Placeholder for food image icon */}
      <Ionicons name="image-outline" size={24} color="#666" style={styles.foodIcon} />
      
      {/* Delete button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>

      {/* Edit button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEdit(item)}>
        <Ionicons name="pencil-outline" size={20} color="#000" />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodUnit}>{`${item.quantity} ${item.unit}`}</Text> 
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
        <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('../(modals)/addItem')}>
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

      {/* Render modal*/}
      {isEditModalVisible && editItem && (
        <EditItemModal
          item={editItem}
          onClose={closeEditModal}
          onSaved={(updatedItem) => {
            setFridgeItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
            closeEditModal();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
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
  foodUnit: {
    fontSize: 12,
    color: '#555',
  },
  deleteButton: {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,
  zIndex: 10,
},
editButton: {
  position: 'absolute',
  top: 12,
  right: 48, // to the left of delete button
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,
  zIndex: 10,
},
});


