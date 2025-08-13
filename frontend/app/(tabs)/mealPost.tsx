// FILE: app/screens/MealPosts.tsx
/**
 * @file mealPost 
 */


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

type MealPost = {
  id: string;
  userName: string;
  userAvatar: string;
  time: string; // human readable for now
  location?: string;
  caption?: string;
  image?: string;
  likes: number;
  comments: number;
};

// Hardcode some posts for now
const POSTS: MealPost[] = [
  {
    id: '1',
    userName: 'Alex',
    userAvatar: 'https://picsum.photos/seed/a/64',
    time: '2h',
    location: 'Old Town',
    caption: 'Morning run reward — avocado toast & espresso ☕️',
    image: 'https://picsum.photos/seed/meal1/800/500',
    likes: 18,
    comments: 3,
  },
  {
    id: '2',
    userName: 'Sam',
    userAvatar: 'https://picsum.photos/seed/b/64',
    time: 'Yesterday',
    location: 'Riverside Cafe',
    caption: 'Post-ride pasta special 🍝',
    image: 'https://picsum.photos/seed/meal2/800/500',
    likes: 42,
    comments: 6,
  },
  {
    id: '3',
    userName: 'Jordan',
    userAvatar: 'https://picsum.photos/seed/c/64',
    time: '3d',
    location: 'Corner Deli',
    caption: 'Bagel + smoked salmon = ❤️',
    image: 'https://picsum.photos/seed/meal3/800/500',
    likes: 7,
    comments: 1,
  },
];

export default function MealPosts() {
  const renderItem = ({ item }: { item: MealPost }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.meta}>{item.time} · {item.location ?? '—'}</Text>
        </View>
      </View>

      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      ) : null}

      {item.caption ? <Text style={styles.caption}>{item.caption}</Text> : null}

      <View style={styles.row}>
        <View style={styles.stats}>
          <Text style={styles.statText}>❤️ {item.likes}</Text>
          <Text style={styles.statText}>💬 {item.comments}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => { /* placeholder */ }}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => { /* placeholder */ }}>
          <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => { /* placeholder */ }}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={POSTS}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  headerText: { flex: 1 },
  userName: { fontWeight: '600' },
  meta: { color: '#666', fontSize: 12 },
  postImage: { width: '100%', height: 200, backgroundColor: '#eee' },
  caption: { padding: 12, fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingBottom: 8 },
  stats: { flexDirection: 'row', gap: 12 },
  statText: { marginRight: 12 },
  activityMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  small: { color: '#444', fontSize: 12, marginLeft: 8 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#eee' },
  actionButton: { paddingVertical: 6, paddingHorizontal: 12 },
});