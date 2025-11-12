import React, { useState } from 'react';
import { View, ScrollView, Share } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton, Avatar } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface DepositModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'method' | 'account' | 'card'>('method');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const depositMethods = [
    {
      name: 'Bank Transfer',
      subtitle: 'Transfer to your Addis account',
      icon: 'bank-transfer',
      color: '#1e3a8a',
    },
    {
      name: 'Debit Card',
      subtitle: 'Pay with your card',
      icon: 'credit-card',
      color: '#0891b2',
    },
    {
      name: 'USSD',
      subtitle: 'Use USSD code',
      icon: 'dialpad',
      color: '#059669',
    },
  ];

  const handleDeposit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showMessage({
        message: 'Success',
        description: `₦${amount} deposit initiated successfully!`,
        type: 'success',
      });
      
      onDismiss();
      resetForm();
    } catch (error) {
      showMessage({
        message: 'Deposit Failed',
        description: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('method');
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardName('');
  };

  const shareAccountDetails = async () => {
    try {
      await Share.share({
        message: 'Addis Account Details:\nBank: Wema Bank\nAccount Number: 1234567890\nAccount Name: Your Name',
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Could not share account details',
        type: 'danger',
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'method':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Choose Deposit Method
            </Text>
            
            <View style={{ gap: 12 }}>
              {depositMethods.map((method, index) => (
                <Surface
                  key={index}
                  style={{
                    borderRadius: 12,
                    padding: 16,
                    elevation: 2,
                  }}
                  onTouchStart={() => {
                    if (method.name === 'Bank Transfer') {
                      setStep('account');
                    } else if (method.name === 'Debit Card') {
                      setStep('card');
                    }
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon
                      size={48}
                      icon={method.icon}
                      style={{ backgroundColor: method.color + '20', marginRight: 12 }}
                      color={method.color}
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        {method.name}
                      </Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        {method.subtitle}
                      </Text>
                    </View>
                    <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
                  </View>
                </Surface>
              ))}
            </View>
          </View>
        );

      case 'account':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Bank Transfer
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Account Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Bank Name</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Wema Bank</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>1234567890</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Name</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Your Name</Text>
              </View>
              
              <Divider style={{ marginVertical: 12 }} />
              
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                Transfer to this account and your Addis wallet will be credited instantly
              </Text>
            </Surface>

            <Button
              mode="contained"
              onPress={shareAccountDetails}
              icon="share"
              style={{ backgroundColor: theme.colors.primary, marginBottom: 12 }}
            >
              Share Account Details
            </Button>

            <Button
              mode="outlined"
              onPress={() => setStep('method')}
            >
              Back
            </Button>
          </View>
        );

      case 'card':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Card Payment
            </Text>

            <TextInput
              label="Amount (₦)"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              left={<TextInput.Icon icon="currency-ngn" />}
            />

            <TextInput
              label="Card Number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim())}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 16 }}
              placeholder="1234 5678 9012 3456"
            />

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <TextInput
                label="Expiry Date"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2'))}
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                placeholder="MM/YY"
                maxLength={5}
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                mode="outlined"
                keyboardType="numeric"
                style={{ flex: 1 }}
                secureTextEntry
                maxLength={4}
              />
            </View>

            <TextInput
              label="Cardholder Name"
              value={cardName}
              onChangeText={setCardName}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />

            <Button
              mode="contained"
              onPress={handleDeposit}
              loading={isLoading}
              disabled={isLoading || !amount || !cardNumber || !expiryDate || !cvv || !cardName}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Pay ₦{parseFloat(amount || '0').toLocaleString()}
            </Button>
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
              Add Money
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