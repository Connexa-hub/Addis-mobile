import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface AirtimeModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const AirtimeModal: React.FC<AirtimeModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'network' | 'amount' | 'confirm'>('network');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const networks = [
    { name: 'MTN', code: 'mtn', icon: 'signal', color: '#ffcc00' },
    { name: 'Airtel', code: 'airtel', icon: 'signal', color: '#e41e26' },
    { name: 'GLO', code: 'glo', icon: 'signal', color: '#00a859' },
    { name: '9mobile', code: 'etisalat', icon: 'signal', color: '#0066cc' },
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

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
        description: `₦${amount} airtime purchased successfully for ${phoneNumber}!`,
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
    setAmount('');
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
                    setStep('amount');
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
                        Instant airtime top-up
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

      case 'amount':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Enter Details
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

            <Text variant="titleMedium" style={{ marginBottom: 12 }}>Amount</Text>
            
            {/* Quick Amount Buttons */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  mode={amount === quickAmount.toString() ? 'contained' : 'outlined'}
                  onPress={() => setAmount(quickAmount.toString())}
                  style={{ minWidth: 80 }}
                >
                  ₦{quickAmount}
                </Button>
              ))}
            </View>

            <TextInput
              label="Custom Amount (₦)"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="currency-ngn" />}
            />

            <Button
              mode="contained"
              onPress={() => setStep('confirm')}
              disabled={!phoneNumber || !amount || phoneNumber.length < 11}
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
                onPress={handlePurchase}
                loading={isLoading}
                disabled={isLoading || !pin}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Buy Airtime
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
              Buy Airtime
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