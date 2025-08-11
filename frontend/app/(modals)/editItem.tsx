import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { callApi } from '../../api/apiClient';
import type { FridgeItem } from '../(tabs)/fridge'

type Props = {
  item: FridgeItem;
  onClose: () => void;
  onSaved: (updated: FridgeItem) => void;
};

export default function EditItemModal({ item, onClose, onSaved }: Props) {
  // Lazy-initialize form state once
  const [form, setForm] = useState(() => ({
      name: item?.name ?? '',
      quantity: item ? String(item.quantity) : '',
      unit: item?.unit ?? '',
      expiryDate: item?.expiryDate ? item.expiryDate.split('T')[0] : '',
    }));

    const dirtyRef = useRef(false);
    const setField = (field: keyof typeof form, value: string) => {
    dirtyRef.current = true;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // edit item function
  const handleSave = async () => {
    const { name, quantity, unit, expiryDate } = form;
    console.log('[handleSave] Saving item with values:', { 
    name, quantity, unit, expiryDate });
    
    if (!name || !quantity) {
      Alert.alert('Missing Fields', 'Please enter both name and quantity');
      return;
    }
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity)) {
      Alert.alert('Invalid Quantity', 'Please enter a valid number');
      return
    };

    const payload = {
      name,
      quantity: parseFloat(quantity),
      unit: unit || '',
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : '',
    };

    try {
      await callApi(`/api/fridge/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      // Construct updated item to pass back to parent
      const updated: FridgeItem = {
        ...item,
        name: payload.name,
        quantity: payload.quantity,
        unit: payload.unit,
        expiryDate: payload.expiryDate ?? null,
      };
      
      onSaved(updated);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update item');
    }
  };
  console.log('[EditItemScreen] Rendering UI...');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        <Stack.Screen options={{ presentation: 'modal', title: 'Edit Item' }} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, width: '100%' }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.popup}>
              <TextInput placeholder="Item name" value={form.name} onChangeText={v => setField('name', v)} style={styles.input} />
              <TextInput placeholder="Quantity" value={form.quantity} onChangeText={v => setField('quantity', v)} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Unit (e.g., kg, L, pcs)" value={form.unit} onChangeText={v => setField('unit', v)} style={styles.input} />
              <TextInput placeholder="Expiry Date (YYYY-MM-DD)" value={form.expiryDate} onChangeText={v => setField('expiryDate', v)} style={styles.input} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title="Cancel" onPress={onClose} />
                <Button title="Save Changes" onPress={handleSave} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
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
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
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