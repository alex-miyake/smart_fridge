// app/addItem.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, 
  Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { callApi } from '../../api/apiClient';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !quantity) {
      Alert.alert('Missing Fields', 'Please enter both name and quantity');
      return;
    }

  const payload = {
  name,
  quantity: parseFloat(quantity),
  unit: unit || null,
  expiryDate: new Date(expiryDate).toISOString(), // ensure valid format
  userId: 1,
  };

  console.debug("[DEBUG] Sending payload to /api/fridge:", payload);

  try {
    const response = await callApi('/api/fridge', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.debug("[DEBUG] API Response:", response);

    router.back(); // Go back to fridge screen
  } 
  catch (err: any) {
    Alert.alert('Error', err.message || 'Failed to add item');
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, width: '100%' }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.popup}>
              <TextInput
                placeholder="Item name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Unit (e.g., kg, L, pcs)"
                value={unit}
                onChangeText={setUnit}
                style={styles.input}
              />
              <TextInput
                placeholder="Expiry Date (YYYY-MM-DD)"
                value={expiryDate}
                onChangeText={setExpiryDate}
                style={styles.input}
              />
              <Button title="Add Item" onPress={handleAdd} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>  
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400, // keeps it small on large screens
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 8,
  },
});