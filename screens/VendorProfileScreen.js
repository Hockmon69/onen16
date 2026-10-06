import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FormContext } from '../FormDataContext';
import { styles } from '../styles';

export default function VendorProfileScreen({ navigation }) {
  const { 
    vendorName, setVendorName, 
    vendorPhone, setVendorPhone, 
    stallNumber, setStallNumber, 
    commodity, setCommodity 
  } = useContext(FormContext);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>2. Fictional Vendor Profile</Text>
      
      <Text style={styles.label}>Vendor Name (Fictional)</Text>
      <TextInput 
        style={styles.input} 
        value={vendorName} 
        onChangeText={setVendorName} 
      />

      <Text style={styles.label}>Phone Number (Fictional)</Text>
      <TextInput 
        style={styles.input} 
        value={vendorPhone} 
        onChangeText={setVendorPhone} 
        keyboardType="phone-pad"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '48%' }}>
          <Text style={styles.label}>Stall Number</Text>
          <TextInput style={styles.input} value={stallNumber} onChangeText={setStallNumber} />
        </View>
        <View style={{ width: '48%' }}>
          <Text style={styles.label}>Main Commodity</Text>
          <TextInput style={styles.input} value={commodity} onChangeText={setCommodity} />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => navigation.navigate('HygieneAudit')}
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