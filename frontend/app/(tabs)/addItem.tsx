// app/addItem.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { callApi } from '../../api/apiClient';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !quantity) {
      Alert.alert('Missing Fields', 'Please enter both name and quantity');
      return;
    }

    try {
      await callApi('/api/fridge', {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          quantity: parseInt(quantity),
          userId: 1, // hardcoded test user
        }),
      });

      router.back(); // Go back to fridge screen
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add item');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 8,
  },
});