import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Example static data (replace with DB data later)
const fridgeItems = [
  { id: '1', name: 'Food 1', description: 'Lorem ipsum dolor', quantity: 9 },
  { id: '2', name: 'Food 2', description: 'Lorem ipsum dolor', quantity: 3 },
  { id: '3', name: 'Food 3', description: 'Lorem ipsum dolor', quantity: 1 },
  { id: '4', name: 'Food 4', description: 'Lorem ipsum dolor', quantity: 4 },
  { id: '5', name: 'Food 5', description: 'Lorem ipsum dolor', quantity: 1 },
  { id: '6', name: 'Food 6', description: 'Lorem ipsum dolor', quantity: 8 },
  { id: '7', name: 'Food 7', description: 'Lorem ipsum dolor', quantity: 10 },
  { id: '8', name: 'Food 8', description: 'Lorem ipsum dolor', quantity: 2 },
];

export default function FridgeScreen() {
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
        <Text style={styles.foodDesc}>{item.description}</Text>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.username}>Username</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#000" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Grid of food items */}
      <FlatList
        data={fridgeItems}
        keyExtractor={(item) => item.id}
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


