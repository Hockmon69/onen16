import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { COLORS, GROUP_CODE } from '../theme';
import { InspectionContext } from '../InspectionContext';

export default function InspectionFormScreen({ navigation }) {
  const { draft, setDraft } = useContext(InspectionContext);
  const [touched, setTouched] = useState(false);

  // Strict Validation Rules matching the rubric & mockups
  const isAliasValid = draft.vendorAlias.trim().length > 0;
  const isStallValid = /^[A-Z]-[0-9]{3}$/.test(draft.stallCode.trim()); // e.g. A-001
  const isPhoneValid = /^07[2389][0-9]{7}$/.test(draft.contactNumber.trim()); // Rwanda pattern 07xxxxxxxx
  const isFormValid = isAliasValid && isStallValid && isPhoneValid && draft.consent;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musanze Safe Market</Text>
        <Text style={styles.headerCode}>{GROUP_CODE}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepTitle}>New Inspection</Text>
        <Text style={styles.stepSubtitle}>Step 1 of 2: Enter Vendor Details</Text>

        {/* Vendor Alias */}
        <Text style={styles.label}>Vendor Alias *</Text>
        <TextInput 
          style={[styles.input, touched && !isAliasValid && styles.inputError]}
          placeholder="e.g. Vendor Alpha"
          value={draft.vendorAlias}
          onChangeText={val => setDraft({ ...draft, vendorAlias: val })}
        />
        {touched && !isAliasValid && <Text style={styles.errorText}>Vendor alias is required.</Text>}

        {/* Stall Code */}
        <Text style={styles.label}>Stall Code * (Format: A-001)</Text>
        <TextInput 
          style={[styles.input, touched && !isStallValid && styles.inputError]}
          placeholder="e.g. A-001"
          autoCapitalize="characters"
          value={draft.stallCode}
          onChangeText={val => setDraft({ ...draft, stallCode: val })}
        />
        {touched && !isStallValid && <Text style={styles.errorText}>Invalid stall code. Use format: A-001</Text>}

        {/* Category Picker (Interactive Toggle Segment) */}
        <Text style={styles.label}>Category *</Text>
        <View style={styles.segmentRow}>
          {['Fresh Produce', 'Fruits', 'Grains & Cereals'].map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.segmentBtn, draft.category === cat && styles.segmentBtnActive]}
              onPress={() => setDraft({ ...draft, category: cat })}
            >
              <Text style={[styles.segmentText, draft.category === cat && styles.segmentTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Phone */}
        <Text style={styles.label}>Contact Number * (Rwanda 07xxxxxxxx)</Text>
        <TextInput 
          style={[styles.input, touched && !isPhoneValid && styles.inputError]}
          placeholder="0781234567"
          keyboardType="numeric"
          maxLength={10}
          value={draft.contactNumber}
          onChangeText={val => setDraft({ ...draft, contactNumber: val })}
        />
        {touched && !isPhoneValid && <Text style={styles.errorText}>Invalid phone number. Use 07xxxxxxxx</Text>}

        {/* Risk Level */}
        <Text style={styles.label}>Risk Level *</Text>
        <View style={styles.segmentRow}>
          {['Low', 'Medium', 'High'].map(r => (
            <TouchableOpacity 
              key={r} 
              style={[styles.segmentBtn, draft.riskLevel === r && styles.segmentBtnActive]}
              onPress={() => setDraft({ ...draft, riskLevel: r })}
            >
              <Text style={[styles.segmentText, draft.riskLevel === r && styles.segmentTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Consent Checkbox */}
        <View style={styles.consentRow}>
          <Switch 
            value={draft.consent} 
            onValueChange={val => setDraft({ ...draft, consent: val })}
            trackColor={{ true: COLORS.accent }}
          />
          <Text style={styles.consentText}>I confirm that the vendor has given consent for this inspection.</Text>
        </View>
        {touched && !draft.consent && <Text style={styles.errorText}>You must confirm consent to continue.</Text>}

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.nextBtn, !isFormValid && styles.nextBtnDisabled]}
          onPress={() => {
            setTouched(true);
            if (isFormValid) navigation.navigate('AddEvidence');
          }}
        >
          <Text style={styles.nextBtnText}>Next: Add Evidence →</Text>
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
  stepTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  stepSubtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textMain, marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, fontSize: 15, color: COLORS.textMain },
  inputError: { borderColor: COLORS.error, backgroundColor: COLORS.errorBg },
  errorText: { color: COLORS.error, fontSize: 11, marginTop: 4 },
  segmentRow: { flexDirection: 'row', gap: 6, marginVertical: 4 },
  segmentBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, alignItems: 'center', backgroundColor: '#FFF' },
  segmentBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  segmentText: { fontSize: 12, fontWeight: '600', color: COLORS.textMain },
  segmentTextActive: { color: '#FFF' },
  consentRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 10 },
  consentText: { flex: 1, fontSize: 12, color: COLORS.textMain },
  nextBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 24 },
  nextBtnDisabled: { backgroundColor: '#94A3B8' },
  nextBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' }
});