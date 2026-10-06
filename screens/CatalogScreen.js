import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, GROUP_CODE } from '../theme';
import { INITIAL_CATALOG } from '../InspectionContext';

export default function CatalogScreen() {
  const [search, setSearch] = useState('');

  const filteredStalls = INITIAL_CATALOG.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <View style={styles.badgeRow}>
          <View style={[styles.chip, { backgroundColor: item.status === 'Inspected' ? '#DCFCE7' : item.status === 'Pending' ? '#FEF3C7' : '#DBEAFE' }]}>
            <Text style={[styles.chipText, { color: item.status === 'Inspected' ? '#166534' : item.status === 'Pending' ? '#92400E' : '#1E40AF' }]}>{item.status}</Text>
          </View>
          <Text style={[styles.priorityText, { color: item.priority === 'High' ? COLORS.priorityHigh : COLORS.priorityMed }]}>
            Priority: {item.priority}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musanze Safe Market</Text>
        <Text style={styles.headerCode}>{GROUP_CODE}</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search zones or stalls..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredStalls.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No zones or stalls found</Text>
          <Text style={styles.emptySubtitle}>Try a different search term or clear filters.</Text>
        </View>
      ) : (
        <FlatList 
          data={filteredStalls}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  headerCode: { color: COLORS.accent, fontSize: 12, marginTop: 2, fontWeight: '600' },
  searchBox: { flexDirection: 'row', backgroundColor: '#FFF', margin: 16, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', paddingHorizontal: 12 },
  searchInput: { flex: 1, height: 46, fontSize: 14, color: COLORS.textMain },
  clearBtn: { color: COLORS.error, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 12, padding: 12, borderWidth: 1, borderColor: COLORS.border },
  cardImage: { width: 75, height: 75, borderRadius: 8 },
  cardDetails: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  cardSubtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  chip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginRight: 8 },
  chipText: { fontSize: 11, fontWeight: '700' },
  priorityText: { fontSize: 11, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  emptySubtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 }
});