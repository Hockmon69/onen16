import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, GROUP_CODE } from '../theme';
import { InspectionContext } from '../InspectionContext';

export default function ReviewScreen({ navigation }) {
  const { draft, commitRecord } = useContext(InspectionContext);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    commitRecord();
    setSaved(true);
  };

  if (saved) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successBox}>
          <Text style={styles.checkIcon}>✅</Text>
          <Text style={styles.successTitle}>Inspection Saved!</Text>
          <Text style={styles.successSubtitle}>The inspection record has been added to your local session.</Text>
          
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => navigation.navigate('RecordsTab')}
          >
            <Text style={styles.primaryBtnText}>View Records</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.primary, marginTop: 10 }]} 
            onPress={() => {
              setSaved(false);
              navigation.navigate('InspectionForm');
            }}
          >
            <Text style={[styles.primaryBtnText, { color: COLORS.primary }]}>New Inspection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musanze Safe Market</Text>
        <Text style={styles.headerCode}>{GROUP_CODE}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Review Inspection</Text>
        <Text style={styles.subtitle}>Confirm details before saving</Text>

        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.k}>Vendor Alias</Text><Text style={styles.v}>{draft.vendorAlias}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Stall Code</Text><Text style={styles.v}>{draft.stallCode}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Category</Text><Text style={styles.v}>{draft.category}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Contact Number</Text><Text style={styles.v}>{draft.contactNumber}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Risk Level</Text><Text style={[styles.v, { color: COLORS.priorityLow, fontWeight: '700' }]}>{draft.riskLevel}</Text></View>
          <View style={styles.row}><Text style={styles.k}>Consent</Text><Text style={[styles.v, { color: COLORS.accent, fontWeight: '700' }]}>✓ Confirmed</Text></View>
          
          <Text style={[styles.k, { marginTop: 12, marginBottom: 6 }]}>Evidence Photo</Text>
          {draft.imageUri && <Image source={{ uri: draft.imageUri }} style={styles.reviewImage} />}

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>📅 Recorded: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <Text style={styles.metaText}>🏷 Group Code: {GROUP_CODE}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
          <Text style={styles.primaryBtnText}>Save Inspection</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  headerCode: { color: COLORS.accent, fontSize: 12, marginTop: 2, fontWeight: '600' },
  content: { padding: 20 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  subtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 14 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  k: { color: COLORS.textMuted, fontSize: 13 },
  v: { color: COLORS.textMain, fontSize: 13, fontWeight: '600' },
  reviewImage: { width: '100%', height: 180, borderRadius: 8, marginVertical: 6 },
  metaRow: { marginTop: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  metaText: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  primaryBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 10, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  successBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  checkIcon: { fontSize: 50, marginBottom: 12 },
  successTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textMain },
  successSubtitle: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', marginTop: 4, marginBottom: 28 }
});