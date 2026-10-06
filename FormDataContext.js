import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [zone, setZone] = useState('Zone A - Fruit & Avocado Stalls');
  const [vendorName, setVendorName] = useState('Keza Beatrice');
  const [vendorPhone, setVendorPhone] = useState('+250 788 000 123');
  const [stallNumber, setStallNumber] = useState('STALL-A-14');
  const [commodity, setCommodity] = useState('Hass Avocados');
  const [isElevated, setIsElevated] = useState(true);
  const [hasWasteBin, setHasWasteBin] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [savedCount, setSavedCount] = useState(0);

  const loadSavedCount = async () => {
    try {
      const existingLogs = await AsyncStorage.getItem('@musanze_fruit_vendors');
      if (existingLogs) {
        setSavedCount(JSON.parse(existingLogs).length);
      }
    } catch (e) {
      console.log('Error reading local storage', e);
    }
  };

  useEffect(() => {
    loadSavedCount();
  }, []);

  const resetForm = () => {
    const randomId = Math.floor(10 + Math.random() * 90);
    setStallNumber(`STALL-A-${randomId}`);
    setImageUri(null);
  };

  return (
    <FormContext.Provider
      value={{
        zone, setZone,
        vendorName, setVendorName,
        vendorPhone, setVendorPhone,
        stallNumber, setStallNumber,
        commodity, setCommodity,
        isElevated, setIsElevated,
        hasWasteBin, setHasWasteBin,
        imageUri, setImageUri,
        savedCount, setSavedCount,
        loadSavedCount,
        resetForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
}