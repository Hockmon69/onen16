import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { scholarship } = route.params || {};

  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>{scholarship?.name}</Text>
      <Text style={styles.text}>Field: {scholarship?.field}</Text>
      <Text style={styles.text}>Benefit: {scholarship?.benefit}</Text>
      
      <Text style={styles.text}>Timeline: {scholarship?.timeline}</Text>
      <Text style={styles.text}>Eligibility: {scholarship?.eligibility}</Text>
      <Text style={styles.text}>CampusLogistics: {scholarship?.campusLogistics}</Text>
      <Text style={styles.text}>RemainingSlots: {scholarship?.remainingSlots}</Text>
     
    
      <Pressable 
  style={styles.button}
  onPress={() => navigation.navigate('Registration', { scholarship })}
>
  <Text style={styles.buttonText}>Continue To Registration</Text>
</Pressable>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText:{
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },

  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});