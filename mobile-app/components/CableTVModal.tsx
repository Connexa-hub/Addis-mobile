import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface CableTVModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const CableTVModal: React.FC<CableTVModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'provider' | 'plan' | 'card' | 'confirm'>('provider');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [smartCardNumber, setSmartCardNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const providers = [
    { name: 'DSTV', code: 'dstv', icon: 'television', color: '#1e3a8a' },
    { name: 'GOTV', code: 'gotv', icon: 'television', color: '#0891b2' },
    { name: 'Startimes', code: 'startimes', icon: 'television', color: '#059669' },
  ];

  const cablePlans = {
    dstv: [
      { name: 'DSTV Premium', amount: 21000, validity: 'Monthly', code: 'dstv_premium' },
      { name: 'DSTV Compact Plus', amount: 14250, validity: 'Monthly', code: 'dstv_compact_plus' },
      { name: 'DSTV Compact', amount: 9000, validity: 'Monthly', code: 'dstv_compact' },
      { name: 'DSTV Confam', amount: 5300, validity: 'Monthly', code: 'dstv_confam' },
      { name: 'DSTV Yanga', amount: 2950, validity: 'Monthly', code: 'dstv_yanga' },
    ],
    gotv: [
      { name: 'GOTV Supa', amount: 6400, validity: 'Monthly', code: 'gotv_supa' },
      { name: 'GOTV Max', amount: 4150, validity: 'Monthly', code: 'gotv_max' },
      { name: 'GOTV Jolli', amount: 2800, validity: 'Monthly', code: 'gotv_jolli' },
      { name: 'GOTV Jinja', amount: 1900, validity: 'Monthly', code: 'gotv_jinja' },
      { name: 'GOTV Smallie', amount: 1100, validity: 'Monthly', code: 'gotv_smallie' },
    ],
    startimes: [
      { name: 'Startimes Nova', amount: 900, validity: 'Monthly', code: 'startimes_nova' },
      { name: 'Startimes Basic', amount: 1850, validity: 'Monthly', code: 'startimes_basic' },
      { name: 'Startimes Classic', amount: 2700, validity: 'Monthly', code: 'startimes_classic' },
      { name: 'Startimes Super', amount: 4900, validity: 'Monthly', code: 'startimes_super' },
    ],
  };

  const handlePayment = async () => {
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
        description: `${selectedPlan.name} subscription for ${smartCardNumber} was successful!`,
        type: 'success',
      });
      
      onDismiss();
      resetForm();
    } catch (error) {
      showMessage({
        message: 'Payment Failed',
        description: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('provider');
    setSelectedProvider('');
    setSelectedPlan(null);
    setSmartCardNumber('');
    setCustomerName('');
    setPin('');
  };

  const renderStep = () => {
    switch (step) {
      case 'provider':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Cable TV Provider
            </Text>
            
            <View style={{ gap: 12 }}>
              {providers.map((provider) => (
                <Surface
                  key={provider.code}
                  style={{
                    borderRadius: 12,
                    padding: 16,
                    elevation: selectedProvider === provider.code ? 4 : 1,
                    backgroundColor: selectedProvider === provider.code ? provider.color + '20' : undefined,
                  }}
                  onTouchStart={() => {
                    setSelectedProvider(provider.code);
                    setStep('plan');
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon
                      size={40}
                      icon={provider.icon}
                      style={{ backgroundColor: provider.color, marginRight: 12 }}
                      color="white"
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{provider.name}</Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        Cable TV subscription
                      </Text>
                    </View>
                    {selectedProvider === provider.code && (
                      <Icon source="check-circle" size={24} color={provider.color} />
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
              Select Package
            </Text>

            <View style={{ gap: 12 }}>
              {cablePlans[selectedProvider as keyof typeof cablePlans]?.map((plan: any) => (
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
              onPress={() => setStep('card')}
              disabled={!selectedPlan}
              style={{ backgroundColor: theme.colors.primary, marginTop: 16 }}
            >
              Continue
            </Button>
          </View>
        );

      case 'card':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Smart Card Details
            </Text>

            <TextInput
              label="Smart Card Number"
              value={smartCardNumber}
              onChangeText={setSmartCardNumber}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="card-account-details" />}
            />

            <TextInput
              label="Customer Name (Optional)"
              value={customerName}
              onChangeText={setCustomerName}
              mode="outlined"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="account" />}
            />

            <Button
              mode="contained"
              onPress={() => setStep('confirm')}
              disabled={!smartCardNumber}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Continue
            </Button>
          </View>
        );

      case 'confirm':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Confirm Payment
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Subscription Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Provider</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {providers.find(p => p.code === selectedProvider)?.name}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Package</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedPlan?.name}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Smart Card</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{smartCardNumber}</Text>
              </View>
              
              {customerName && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Customer</Text>
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{customerName}</Text>
                </View>
              )}
              
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
                onPress={() => setStep('card')}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={handlePayment}
                loading={isLoading}
                disabled={isLoading || !pin}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Pay Now
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
              Cable TV Subscription
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