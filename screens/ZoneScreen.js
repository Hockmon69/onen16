import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FormContext } from '../FormDataContext';
import { styles } from '../styles';

export default function ZoneScreen({ navigation }) {
  const { zone, setZone } = useContext(FormContext);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>1. Assigned Market Zone</Text>
      {['Zone A - Fruit & Avocado Stalls', 'Zone B - Tree Tomatoes & Bananas', 'Zone C - General Produce'].map((z) => (
        <TouchableOpacity 
          key={z} 
          style={[styles.radioCard, zone === z && styles.radioCardSelected]}
          onPress={() => setZone(z)}
          accessibilityRole="radio"
        >
          <Text style={zone === z ? styles.radioTextSelected : styles.radioText}>{z}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => navigation.navigate('VendorProfile')}
      >
        <Text style={styles.primaryButtonText}>Continue ➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}