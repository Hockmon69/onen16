import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { COLORS } from './theme';
import { InspectionProvider } from './InspectionContext';

import SplashScreen from './screens/SplashScreen';
import CatalogScreen from './screens/CatalogScreen';
import InspectionFormScreen from './screens/InspectionFormScreen';
import AddEvidenceScreen from './screens/AddEvidenceScreen';
import ReviewScreen from './screens/ReviewScreen';
import { RecordsScreen, InspectionDetailsScreen } from './screens/RecordsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for New Inspection: Form -> Add Evidence -> Review
function InspectionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InspectionForm" component={InspectionFormScreen} />
      <Stack.Screen name="AddEvidence" component={AddEvidenceScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}

// Stack for Records: List -> Inspection Details
function RecordsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordsList" component={RecordsScreen} />
      <Stack.Screen name="InspectionDetails" component={InspectionDetailsScreen} />
    </Stack.Navigator>
  );
}

// Main 3-Tab Navigator matching requirements
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ focused }) => {
          let icon = '🏠';
          if (route.name === 'New Inspection') icon = '➕';
          if (route.name === 'Records') icon = '📋';
          return <Text style={{ fontSize: focused ? 20 : 17 }}>{icon}</Text>;
        }
      })}
    >
      <Tab.Screen name="Home" component={CatalogScreen} />
      <Tab.Screen name="New Inspection" component={InspectionStack} />
      <Tab.Screen name="Records" component={RecordsStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <InspectionProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </InspectionProvider>
  );
}