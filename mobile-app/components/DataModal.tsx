import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface DataModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const DataModal: React.FC<DataModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'network' | 'plan' | 'confirm'>('network');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const networks = [
    { name: 'MTN', code: 'mtn', icon: 'signal', color: '#ffcc00' },
    { name: 'Airtel', code: 'airtel', icon: 'signal', color: '#e41e26' },
    { name: 'GLO', code: 'glo', icon: 'signal', color: '#00a859' },
    { name: '9mobile', code: 'etisalat', icon: 'signal', color: '#0066cc' },
  ];

  const dataPlans = {
    mtn: [
      { name: '1GB Daily', amount: 350, validity: '1 day', code: 'mtn_1gb_1d' },
      { name: '2GB Weekly', amount: 1200, validity: '7 days', code: 'mtn_2gb_7d' },
      { name: '3GB Monthly', amount: 1500, validity: '30 days', code: 'mtn_3gb_30d' },
      { name: '10GB Monthly', amount: 3500, validity: '30 days', code: 'mtn_10gb_30d' },
      { name: '20GB Monthly', amount: 6500, validity: '30 days', code: 'mtn_20gb_30d' },
    ],
    airtel: [
      { name: '1.5GB Daily', amount: 500, validity: '1 day', code: 'airtel_1_5gb_1d' },
      { name: '6GB Weekly', amount: 1500, validity: '7 days', code: 'airtel_6gb_7d' },
      { name: '1.5GB Monthly', amount: 1000, validity: '30 days', code: 'airtel_1_5gb_30d' },
      { name: '4.5GB Monthly', amount: 2000, validity: '30 days', code: 'airtel_4_5gb_30d' },
      { name: '11GB Monthly', amount: 4000, validity: '30 days', code: 'airtel_11gb_30d' },
    ],
    glo: [
      { name: '1.35GB Daily', amount: 500, validity: '1 day', code: 'glo_1_35gb_1d' },
      { name: '7GB Weekly', amount: 1500, validity: '7 days', code: 'glo_7gb_7d' },
      { name: '3.9GB Monthly', amount: 1500, validity: '30 days', code: 'glo_3_9gb_30d' },
      { name: '7.8GB Monthly', amount: 2500, validity: '30 days', code: 'glo_7_8gb_30d' },
      { name: '15.6GB Monthly', amount: 4000, validity: '30 days', code: 'glo_15_6gb_30d' },
    ],
    etisalat: [
      { name: '500MB Daily', amount: 300, validity: '1 day', code: 'etisalat_500mb_1d' },
      { name: '1GB Weekly', amount: 500, validity: '7 days', code: 'etisalat_1gb_7d' },
      { name: '1GB Monthly', amount: 1000, validity: '30 days', code: 'etisalat_1gb_30d' },
      { name: '4GB Monthly', amount: 3000, validity: '30 days', code: 'etisalat_4gb_30d' },
      { name: '11GB Monthly', amount: 4000, validity: '30 days', code: 'etisalat_11gb_30d' },
    ],
  };

  const handlePurchase = async () => {
    if (!pin || pin.length !== 4) {
      showMessage({
        message: 'Error',
        description: 'Please enter a valid 4-digit PIN',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showMessage({
        message: 'Success',
        description: `${selectedPlan.name} data bundle purchased successfully for ${phoneNumber}!`,
        type: 'success',
      });
      
      onDismiss();
      resetForm();
    } catch (error) {
      showMessage({
        message: 'Purchase Failed',
        description: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('network');
    setSelectedNetwork('');
    setPhoneNumber('');
    setSelectedPlan(null);
    setPin('');
  };

  const renderStep = () => {
    switch (step) {
      case 'network':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Network
            </Text>
            
            <View style={{ gap: 12 }}>
              {networks.map((network) => (
                <Surface
                  key={network.code}
                  style={{
                    borderRadius: 12,
                    padding: 16,
                    elevation: selectedNetwork === network.code ? 4 : 1,
                    backgroundColor: selectedNetwork === network.code ? network.color + '20' : undefined,
                  }}
                  onTouchStart={() => {
                    setSelectedNetwork(network.code);
                    setStep('plan');
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon
                      size={40}
                      icon={network.icon}
                      style={{ backgroundColor: network.color, marginRight: 12 }}
                      color="white"
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{network.name}</Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        Data bundles available
                      </Text>
                    </View>
                    {selectedNetwork === network.code && (
                      <Icon source="check-circle" size={24} color={network.color} />
                    )}
                  </View>
                </Surface>
              ))}
            </View>
          </View>
        );

      case 'plan':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Data Plan
            </Text>

            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="phone" />}
            />

            <View style={{ gap: 12 }}>
              {dataPlans[selectedNetwork as keyof typeof dataPlans]?.map((plan: any) => (
                <Surface
                  key={plan.code}
                  style={{
                    borderRadius: 12,
                    padding: 16,
                    elevation: selectedPlan?.code === plan.code ? 4 : 1,
                    backgroundColor: selectedPlan?.code === plan.code ? theme.colors.primary + '20' : undefined,
                  }}
                  onTouchStart={() => setSelectedPlan(plan)}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        {plan.name}
                      </Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        Validity: {plan.validity}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                        ₦{plan.amount.toLocaleString()}
                      </Text>
                      {selectedPlan?.code === plan.code && (
                        <Icon source="check-circle" size={20} color={theme.colors.primary} style={{ marginTop: 4 }} />
                      )}
                    </View>
                  </View>
                </Surface>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={() => setStep('confirm')}
              disabled={!phoneNumber || !selectedPlan || phoneNumber.length < 11}
              style={{ backgroundColor: theme.colors.primary, marginTop: 16 }}
            >
              Continue
            </Button>
          </View>
        );

      case 'confirm':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Confirm Purchase
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Purchase Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Network</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {networks.find(n => n.code === selectedNetwork)?.name}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Phone Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{phoneNumber}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Data Plan</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedPlan?.name}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Validity</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedPlan?.validity}</Text>
              </View>
              
              <Divider style={{ marginVertical: 12 }} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Amount</Text>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                  ₦{selectedPlan?.amount?.toLocaleString()}
                </Text>
              </View>
            </Surface>

            <TextInput
              label="Enter PIN"
              value={pin}
              onChangeText={setPin}
              mode="outlined"
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="lock" />}
            />

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                mode="outlined"
                onPress={() => setStep('plan')}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={handlePurchase}
                loading={isLoading}
                disabled={isLoading || !pin}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Buy Data
              </Button>
            </View>
          </View>
        );
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          margin: 20,
          borderRadius: 12,
          padding: 20,
          maxHeight: '80%',
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
              Buy Data Bundle
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={onDismiss}
            />
          </View>
          
          {renderStep()}
        </ScrollView>
      </Modal>
    </Portal>
  );
};