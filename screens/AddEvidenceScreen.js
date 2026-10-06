import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, GROUP_CODE } from '../theme';
import { InspectionContext } from '../InspectionContext';

export default function AddEvidenceScreen({ navigation }) {
  const { draft, setDraft } = useContext(InspectionContext);
  const [denied, setDenied] = useState(false);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setDenied(true);
      return;
    }
    setDenied(false);
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 0.6 });
    if (!result.canceled) {
      setDraft({ ...draft, imageUri: result.assets[0].uri });
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setDenied(true);
      return;
    }
    setDenied(false);
    let result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
    if (!result.canceled) {
      setDraft({ ...draft, imageUri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musanze Safe Market</Text>
        <Text style={styles.headerCode}>{GROUP_CODE}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.stepTitle}>New Inspection</Text>
        <Text style={styles.stepSubtitle}>Step 2 of 2: Add Evidence</Text>

        {denied ? (
          <View style={styles.deniedCard}>
            <Text style={styles.deniedIcon}>⚠️</Text>
            <Text style={styles.deniedTitle}>Camera Permission Required</Text>
            <Text style={styles.deniedText}>Permission is needed to capture stall evidence. Please grant permission in device settings or choose from gallery.</Text>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => Linking.openSettings()}>
              <Text style={styles.settingsBtnText}>Open Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gallerySecondaryBtn} onPress={pickImage}>
              <Text style={styles.gallerySecondaryText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        ) : draft.imageUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: draft.imageUri }} style={styles.previewImage} />
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={takePhoto}>
                <Text style={styles.actionText}>🔄 Replace Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.removeBtn]} onPress={() => setDraft({ ...draft, imageUri: null })}>
                <Text style={[styles.actionText, styles.removeText]}>🗑 Remove Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderTitle}>No image selected</Text>
            <Text style={styles.placeholderSubtitle}>Take a photo or choose from gallery to add inspection evidence.</Text>
            <View style={{ width: '100%', gap: 10, marginTop: 20 }}>
              <TouchableOpacity style={styles.primaryBtn} onPress={takePhoto}>
                <Text style={styles.primaryBtnText}>📷 Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={pickImage}>
                <Text style={styles.secondaryBtnText}>🖼 Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.navRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.nextBtn, !draft.imageUri && styles.nextBtnDisabled]}
            disabled={!draft.imageUri}
            onPress={() => navigation.navigate('Review')}
          >
            <Text style={styles.nextBtnText}>Next: Review →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  headerCode: { color: COLORS.accent, fontSize: 12, marginTop: 2, fontWeight: '600' },
  content: { flex: 1, padding: 20 },
  stepTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  stepSubtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 16 },
  placeholderBox: { flex: 1, borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFF' },
  placeholderIcon: { fontSize: 44, marginBottom: 8 },
  placeholderTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  placeholderSubtitle: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', marginTop: 4 },
  primaryBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#F1F5F9', paddingVertical: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  secondaryBtnText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  previewContainer: { flex: 1 },
  previewImage: { width: '100%', height: 260, borderRadius: 12 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  actionBtn: { flex: 1, paddingVertical: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, alignItems: 'center' },
  actionText: { fontSize: 13, fontWeight: '600', color: COLORS.textMain },
  removeBtn: { borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' },
  removeText: { color: COLORS.error },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 'auto', paddingTop: 16 },
  backBtn: { flex: 1, paddingVertical: 14, backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, alignItems: 'center' },
  backBtnText: { color: COLORS.textMain, fontWeight: '700' },
  nextBtn: { flex: 1, paddingVertical: 14, backgroundColor: COLORS.primary, borderRadius: 10, alignItems: 'center' },
  nextBtnDisabled: { backgroundColor: '#94A3B8' },
  nextBtnText: { color: '#FFF', fontWeight: '700' },
  deniedCard: { padding: 20, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  deniedIcon: { fontSize: 36, marginBottom: 8 },
  deniedTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  deniedText: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginVertical: 8 },
  settingsBtn: { backgroundColor: COLORS.primary, width: '100%', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  settingsBtnText: { color: '#FFF', fontWeight: '700' },
  gallerySecondaryBtn: { width: '100%', padding: 12, alignItems: 'center', marginTop: 6 },
  gallerySecondaryText: { color: COLORS.primary, fontWeight: '600' }
});