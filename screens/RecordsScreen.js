import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { COLORS, GROUP_CODE } from '../theme';
import { InspectionContext } from '../InspectionContext';

// Records List (Tab)
export function RecordsScreen({ navigation }) {
  const { records } = useContext(InspectionContext);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? records : records.filter(r => r.riskLevel === filter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musanze Safe Market</Text>
        <Text style={styles.headerCode}>{GROUP_CODE}</Text>
      </View>

      <View style={styles.filterRow}>
        {['All', 'Low', 'Medium', 'High'].map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList 
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.recordCard} 
            onPress={() => navigation.navigate('InspectionDetails', { record: item })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.vendorTitle}>{item.vendorAlias}</Text>
              <Text style={styles.recordSubtitle}>{item.stallCode} • {item.category}</Text>
              <Text style={styles.recordDate}>{item.timestamp}</Text>
            </View>
            <View style={[styles.riskTag, { backgroundColor: item.riskLevel === 'High' ? '#FEE2E2' : '#E0F7F5' }]}>
              <Text style={[styles.riskText, { color: item.riskLevel === 'High' ? COLORS.priorityHigh : COLORS.primary }]}>{item.riskLevel}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// Stack Screen: Inspection Details
export function InspectionDetailsScreen({ route, navigation }) {
  const { record } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inspection Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ padding: 20 }}>
        {record.imageUri && <Image source={{ uri: record.imageUri }} style={styles.detailImage} />}
        
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Vendor Information</Text>
          <View style={styles.row}><Text style={styles.k}>Vendor Alias</Text><Text style={styles.v}>{record.vendorAlias}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Stall Code</Text><Text style={styles.v}>{record.stallCode}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Category</Text><Text style={styles.v}>{record.category}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Contact</Text><Text style={styles.v}>{record.contactNumber}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Risk Level</Text><Text style={styles.v}>{record.riskLevel}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Recorded</Text><Text style={styles.v}>{record.timestamp}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Group Code</Text><Text style={styles.v}>{record.groupCode}</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  detailHeader: { backgroundColor: COLORS.primary, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  headerCode: { color: COLORS.accent, fontSize: 12, marginTop: 2, fontWeight: '600' },
  backArrow: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  filterRow: { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#FFF' },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1F5F9' },
  filterChipActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 12, color: COLORS.textMain, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  recordCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10, alignItems: 'center' },
  vendorTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  recordSubtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  recordDate: { fontSize: 11, color: '#94A3B8', marginTop: 4 },
  riskTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  riskText: { fontSize: 11, fontWeight: '700' },
  detailImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  sectionHeader: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  k: { fontSize: 13, color: COLORS.textMuted },
  v: { fontSize: 13, fontWeight: '600', color: COLORS.textMain }
});