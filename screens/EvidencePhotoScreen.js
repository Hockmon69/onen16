import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { FormContext } from '../FormDataContext';
import { styles } from '../styles';

export default function EvidencePhotoScreen({ navigation }) {
  const { 
    zone, vendorName, vendorPhone, stallNumber, commodity,
    isElevated, hasWasteBin, imageUri, setImageUri, setSavedCount
  } = useContext(FormContext);

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Camera Required", "Camera access is needed to capture stall conditions.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!imageUri) {
      Alert.alert("Evidence Required", "Please attach 1 stall image as visual evidence.");
      return;
    }

    const newRecord = {
      id: `MSZ-FR-${Date.now()}`,
      timestamp: new Date().toISOString(),
      zone,
      vendor: {
        fictional_name: vendorName,
        fictional_phone: vendorPhone,
        stall_number: stallNumber,
        commodity
      },
      checklist: {
        fruit_elevated: isElevated,
        waste_bin_present: hasWasteBin
      },
      imageUri
    };

    try {
      const existingLogs = await AsyncStorage.getItem('@musanze_fruit_vendors');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(newRecord);
      await AsyncStorage.setItem('@musanze_fruit_vendors', JSON.stringify(logs));
      setSavedCount(logs.length);
      navigation.navigate('VerificationPass');
    } catch (e) {
      Alert.alert("Storage Error", "Could not save record locally.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>4. Stall Evidence Photo</Text>
      
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>No evidence photo attached</Text>
        </View>
      )}

      <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
        <Text style={styles.secondaryButtonText}>📷 Capture Stall Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Complete & Save Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}