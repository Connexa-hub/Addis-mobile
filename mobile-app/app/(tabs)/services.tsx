import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Icon, Surface, Avatar, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { AirtimeModal } from '@/components/AirtimeModal';
import { DataModal } from '@/components/DataModal';
import { ElectricityModal } from '@/components/ElectricityModal';
import { CableTVModal } from '@/components/CableTVModal';

export default function ServicesScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [showAirtimeModal, setShowAirtimeModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showElectricityModal, setShowElectricityModal] = useState(false);
  const [showCableTVModal, setShowCableTVModal] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Refresh services data
    setTimeout(() => setRefreshing(false), 2000);
  };

  const serviceCategories = [
    {
      title: 'Mobile Services',
      services: [
        {
          name: 'Buy Airtime',
          icon: 'phone',
          color: '#1e3a8a',
          description: 'Instant airtime for all networks',
          onPress: () => setShowAirtimeModal(true),
        },
        {
          name: 'Buy Data',
          icon: 'wifi',
          color: '#0891b2',
          description: 'Data bundles for all networks',
          onPress: () => setShowDataModal(true),
        },
        {
          name: 'SMS Bundle',
          icon: 'message',
          color: '#059669',
          description: 'Bulk SMS services',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Utility Bills',
      services: [
        {
          name: 'Electricity',
          icon: 'lightning-bolt',
          color: '#d97706',
          description: 'Pay electricity bills',
          onPress: () => setShowElectricityModal(true),
        },
        {
          name: 'Cable TV',
          icon: 'television',
          color: '#dc2626',
          description: 'DSTV, GOTV, Startimes',
          onPress: () => setShowCableTVModal(true),
        },
        {
          name: 'Internet',
          icon: 'web',
          color: '#7c3aed',
          description: 'Smile, Spectranet',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Government & Education',
      services: [
        {
          name: 'WAEC',
          icon: 'school',
          color: '#be185d',
          description: 'WAEC exam pins',
          onPress: () => {},
        },
        {
          name: 'NECO',
          icon: 'book',
          color: '#0d9488',
          description: 'NECO exam pins',
          onPress: () => {},
        },
        {
          name: 'JAMB',
          icon: 'certificate',
          color: '#c2410c',
          description: 'JAMB e-Pins',
          onPress: () => {},
        },
      ],
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      service: 'MTN Airtime',
      amount: 1000,
      phone: '08012345678',
      date: '2025-11-12',
      status: 'completed',
    },
    {
      id: '2',
      service: 'DSTV Subscription',
      amount: 18500,
      phone: '1098765432',
      date: '2025-11-11',
      status: 'completed',
    },
    {
      id: '3',
      service: 'IKEDC Electricity',
      amount: 5000,
      phone: '5412345678',
      date: '2025-11-10',
      status: 'completed',
    },
    {
      id: '4',
      service: 'GLO Data',
      amount: 1500,
      phone: '08098765432',
      date: '2025-11-09',
      status: 'completed',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16 }}>
          {/* Header */}
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 8 }}>
            VTU Services
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 24 }}>
            Pay bills, buy airtime & data, and more
          </Text>

          {/* Service Categories */}
          {serviceCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={{ marginBottom: 24 }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
                {category.title}
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {category.services.map((service, serviceIndex) => (
                  <Surface
                    key={serviceIndex}
                    style={{
                      width: '48%',
                      borderRadius: 12,
                      padding: 16,
                      elevation: 2,
                    }}
                  >
                    <TouchableRipple
                      onPress={service.onPress}
                      style={{ borderRadius: 12 }}
                    >
                      <View>
                        <Avatar.Icon
                          size={48}
                          icon={service.icon}
                          style={{ backgroundColor: service.color + '20', marginBottom: 12 }}
                          color={service.color}
                        />
                        <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                          {service.name}
                        </Text>
                        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                          {service.description}
                        </Text>
                      </View>
                    </TouchableRipple>
                  </Surface>
                ))}
              </View>
            </View>
          ))}

          {/* Quick Actions */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <Surface
              style={{
                width: '48%',
                borderRadius: 12,
                padding: 16,
                elevation: 1,
              }}
            >
              <TouchableRipple
                onPress={() => setShowAirtimeModal(true)}
                style={{ borderRadius: 12 }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Avatar.Icon
                    size={40}
                    icon="phone"
                    style={{ backgroundColor: '#1e3a8a20', marginBottom: 8 }}
                    color="#1e3a8a"
                  />
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Quick Airtime</Text>
                </View>
              </TouchableRipple>
            </Surface>

            <Surface
              style={{
                width: '48%',
                borderRadius: 12,
                padding: 16,
                elevation: 1,
              }}
            >
              <TouchableRipple
                onPress={() => setShowDataModal(true)}
                style={{ borderRadius: 12 }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Avatar.Icon
                    size={40}
                    icon="wifi"
                    style={{ backgroundColor: '#0891b220', marginBottom: 8 }}
                    color="#0891b2"
                  />
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Quick Data</Text>
                </View>
              </TouchableRipple>
            </Surface>
          </View>

          {/* Recent VTU Transactions */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            Recent Transactions
          </Text>
          
          <View style={{ gap: 12 }}>
            {recentTransactions.map((transaction) => (
              <Surface
                key={transaction.id}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  elevation: 1,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Avatar.Icon
                        size={32}
                        icon="receipt"
                        style={{ backgroundColor: theme.colors.surfaceVariant, marginRight: 8 }}
                        color={theme.colors.primary}
                      />
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                        {transaction.service}
                      </Text>
                    </View>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
                      {transaction.phone}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      {transaction.date}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text
                      variant="bodyLarge"
                      style={{
                        fontWeight: 'bold',
                        color: theme.colors.primary,
                        marginBottom: 4,
                      }}
                    >
                      ₦{transaction.amount?.toLocaleString()}
                    </Text>
                    <View
                      style={{
                        backgroundColor: transaction.status === 'completed' ? '#d1fae5' : '#fef3c7',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        variant="bodySmall"
                        style={{
                          color: transaction.status === 'completed' ? '#059669' : '#d97706',
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </Surface>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <AirtimeModal
        visible={showAirtimeModal}
        onDismiss={() => setShowAirtimeModal(false)}
      />
      <DataModal
        visible={showDataModal}
        onDismiss={() => setShowDataModal(false)}
      />
      <ElectricityModal
        visible={showElectricityModal}
        onDismiss={() => setShowElectricityModal(false)}
      />
      <CableTVModal
        visible={showCableTVModal}
        onDismiss={() => setShowCableTVModal(false)}
      />
    </SafeAreaView>
  );
}