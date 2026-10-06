import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { FormContext } from '../FormDataContext';
import { styles } from '../styles';

export default function HygieneAuditScreen({ navigation }) {
  const { isElevated, setIsElevated, hasWasteBin, setHasWasteBin } = useContext(FormContext);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>3. Visible Stall Hygiene Audit</Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Fruit Display Elevated Off Floor (>30cm)</Text>
        <Switch value={isElevated} onValueChange={setIsElevated} trackColor={{ true: '#2D6A4F' }} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Dedicated Clean Waste Bin Present</Text>
        <Switch value={hasWasteBin} onValueChange={setHasWasteBin} trackColor={{ true: '#2D6A4F' }} />
      </View>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => navigation.navigate('EvidencePhoto')}
      >
        <Text style={styles.primaryButtonText}>Continue ➔</Text>
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