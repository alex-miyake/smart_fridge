import { StyleSheet, Text, View } from 'react-native';

export default function Map() {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

