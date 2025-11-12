import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface ElectricityModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ElectricityModal: React.FC<ElectricityModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'provider' | 'meter' | 'amount' | 'confirm'>('provider');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const providers = [
    { name: 'IKEDC', code: 'ikeja-electric', icon: 'lightning-bolt', color: '#1e3a8a' },
    { name: 'EKEDC', code: 'eko-electric', icon: 'lightning-bolt', color: '#0891b2' },
    { name: 'AEDC', code: 'abuja-electric', icon: 'lightning-bolt', color: '#059669' },
    { name: 'KEDCO', code: 'kano-electric', icon: 'lightning-bolt', color: '#d97706' },
    { name: 'PHED', code: 'ph-electric', icon: 'lightning-bolt', color: '#dc2626' },
    { name: 'JED', code: 'jos-electric', icon: 'lightning-bolt', color: '#7c3aed' },
    { name: 'EEDC', code: 'enugu-electric', icon: 'lightning-bolt', color: '#be185d' },
  ];

  const meterTypes = [
    { name: 'Prepaid', code: 'prepaid' },
    { name: 'Postpaid', code: 'postpaid' },
  ];

  const quickAmounts = [1000, 2000, 5000, 10000, 15000, 20000];

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
        description: `₦${amount} electricity payment for ${meterNumber} was successful!`,
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
    setMeterNumber('');
    setMeterType('');
    setAmount('');
    setPin('');
  };

  const renderStep = () => {
    switch (step) {
      case 'provider':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Electricity Provider
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
                    setStep('meter');
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
                        Electricity bill payment
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

      case 'meter':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Meter Information
            </Text>

            <View style={{ marginBottom: 16 }}>
              <Text variant="bodyMedium" style={{ marginBottom: 8 }}>Meter Type</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {meterTypes.map((type) => (
                  <Button
                    key={type.code}
                    mode={meterType === type.code ? 'contained' : 'outlined'}
                    onPress={() => setMeterType(type.code)}
                    style={{ flex: 1 }}
                  >
                    {type.name}
                  </Button>
                ))}
              </View>
            </View>

            <TextInput
              label="Meter Number"
              value={meterNumber}
              onChangeText={setMeterNumber}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="lightning-bolt" />}
            />

            <Button
              mode="contained"
              onPress={() => setStep('amount')}
              disabled={!meterNumber || !meterType}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Continue
            </Button>
          </View>
        );

      case 'amount':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Enter Amount
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Meter Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Provider</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {providers.find(p => p.code === selectedProvider)?.name}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Meter Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{meterNumber}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Meter Type</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {meterTypes.find(t => t.code === meterType)?.name}
                </Text>
              </View>
            </Surface>

            <TextInput
              label="Amount (₦)"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="currency-ngn" />}
            />

            <View style={{ marginBottom: 16 }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                Quick Amounts:
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    mode={amount === quickAmount.toString() ? 'contained' : 'outlined'}
                    onPress={() => setAmount(quickAmount.toString())}
                  >
                    ₦{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                mode="outlined"
                onPress={() => setStep('meter')}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={() => setStep('confirm')}
                disabled={!amount || parseFloat(amount) <= 0}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Continue
              </Button>
            </View>
          </View>
        );

      case 'confirm':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Confirm Payment
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Payment Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Provider</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {providers.find(p => p.code === selectedProvider)?.name}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Meter Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{meterNumber}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Meter Type</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                  {meterTypes.find(t => t.code === meterType)?.name}
                </Text>
              </View>
              
              <Divider style={{ marginVertical: 12 }} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Amount</Text>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                  ₦{parseFloat(amount).toLocaleString()}
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
                onPress={() => setStep('amount')}
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
                Pay Bill
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
              Pay Electricity Bill
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