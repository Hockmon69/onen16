import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FormContext } from '../FormDataContext';
import { styles } from '../styles';

export default function VerificationPassScreen({ navigation }) {
  const { zone, vendorName, stallNumber, commodity, imageUri, resetForm } = useContext(FormContext);

  const handleNextVendor = () => {
    resetForm();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Zone' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.passCard}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>✓ SAFE MARKET VERIFIED</Text>
        </View>

        <Text style={styles.passTitle}>Musanze Vendor Pilot Pass</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Zone:</Text> {zone}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Vendor:</Text> {vendorName}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Stall:</Text> {stallNumber}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Commodity:</Text> {commodity}</Text>
        
        {imageUri && <Image source={{ uri: imageUri }} style={styles.passImage} />}

        <Text style={styles.offlineNote}>* Record persisted locally to Expo AsyncStorage.</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNextVendor}>
          <Text style={styles.primaryButtonText}>+ Register Next Vendor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}