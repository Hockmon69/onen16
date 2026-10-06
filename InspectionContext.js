import React, { createContext, useState } from 'react';
import { GROUP_CODE } from './theme';

export const InspectionContext = createContext();

export const INITIAL_CATALOG = [
  { id: '1', name: 'Zone A', subtitle: 'Fresh Produce Stalls', stallCode: 'A-001', category: 'Fresh Produce', status: 'Pending', priority: 'High', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400' },
  { id: '2', name: 'Zone B', subtitle: 'Fruits & Bananas', stallCode: 'B-002', category: 'Fruits', status: 'Inspected', priority: 'Medium', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { id: '3', name: 'Zone C', subtitle: 'Grains & Cereals', stallCode: 'C-003', category: 'Grains & Cereals', status: 'In Progress', priority: 'High', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { id: '4', name: 'Zone D', subtitle: 'Meat & Cold Produce', stallCode: 'D-004', category: 'Meat & Fish', status: 'Pending', priority: 'High', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { id: '5', name: 'Zone E', subtitle: 'Dairy & Eggs Depot', stallCode: 'E-005', category: 'Dairy & Eggs', status: 'Inspected', priority: 'Low', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { id: '6', name: 'Zone F', subtitle: 'General Dry Goods', stallCode: 'F-006', category: 'General Goods', status: 'In Progress', priority: 'Medium', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
];

export function InspectionProvider({ children }) {
  // Current draft session (Step 1 & Step 2)
  const [draft, setDraft] = useState({
    vendorAlias: '',
    stallCode: '',
    category: 'Fresh Produce',
    contactNumber: '',
    riskLevel: 'Low',
    consent: false,
    imageUri: null,
  });

  // Recorded list (in-memory)
  const [records, setRecords] = useState([
    {
      id: 'REC-01',
      groupCode: GROUP_CODE,
      vendorAlias: 'Vendor Alpha',
      stallCode: 'A-001',
      category: 'Fresh Produce',
      contactNumber: '0781234567',
      riskLevel: 'Low',
      consent: true,
      timestamp: '30 Sep 2026, 14:35',
      imageUri: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400'
    }
  ]);

  const resetDraft = () => {
    setDraft({
      vendorAlias: '',
      stallCode: '',
      category: 'Fresh Produce',
      contactNumber: '',
      riskLevel: 'Low',
      consent: false,
      imageUri: null,
    });
  };

  const commitRecord = () => {
    const newEntry = {
      ...draft,
      id: `REC-${Date.now()}`,
      groupCode: GROUP_CODE,
      timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    setRecords([newEntry, ...records]);
    resetDraft();
  };

  return (
    <InspectionContext.Provider value={{ draft, setDraft, records, commitRecord, resetDraft }}>
      {children}
    </InspectionContext.Provider>
  );
}