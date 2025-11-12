import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface WithdrawModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'amount' | 'account' | 'confirm'>('amount');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const savedAccounts = [
    { id: '1', bank: 'GTBank', accountNumber: '1234567890', accountName: 'John Doe', type: 'Savings' },
    { id: '2', bank: 'Access Bank', accountNumber: '0987654321', accountName: 'John Doe', type: 'Current' },
    { id: '3', bank: 'Zenith Bank', accountNumber: '1122334455', accountName: 'John Doe', type: 'Savings' },
  ];

  const handleWithdraw = async () => {
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
        description: `₦${amount} withdrawal to ${selectedAccount.bank} was successful!`,
        type: 'success',
      });
      
      onDismiss();
      resetForm();
    } catch (error) {
      showMessage({
        message: 'Withdrawal Failed',
        description: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('amount');
    setAmount('');
    setSelectedAccount(null);
    setPin('');
  };

  const renderStep = () => {
    switch (step) {
      case 'amount':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Withdraw Amount
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

            <View style={{ marginBottom: 16 }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                Quick Amounts:
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {[1000, 5000, 10000, 20000, 50000].map((quickAmount) => (
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

            <Button
              mode="contained"
              onPress={() => setStep('account')}
              disabled={!amount || parseFloat(amount) <= 0}
              style={{ backgroundColor: theme.colors.primary }}
            >
              Continue
            </Button>
          </View>
        );

      case 'account':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Bank Account
            </Text>

            <View style={{ gap: 12 }}>
              {savedAccounts.map((account) => (
                <Surface
                  key={account.id}
                  style={{
                    borderRadius: 12,
                    padding: 16,
                    elevation: selectedAccount?.id === account.id ? 4 : 1,
                    backgroundColor: selectedAccount?.id === account.id ? theme.colors.primary + '20' : undefined,
                  }}
                  onTouchStart={() => {
                    setSelectedAccount(account);
                    setStep('confirm');
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon
                      size={40}
                      icon="bank"
                      style={{ backgroundColor: theme.colors.surfaceVariant, marginRight: 12 }}
                      color={theme.colors.primary}
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{account.bank}</Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        {account.accountNumber}
                      </Text>
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {account.accountName} • {account.type}
                      </Text>
                    </View>
                    {selectedAccount?.id === account.id && (
                      <Icon source="check-circle" size={24} color={theme.colors.primary} />
                    )}
                  </View>
                </Surface>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={() => setStep('confirm')}
              disabled={!selectedAccount}
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
              Confirm Withdrawal
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Withdrawal Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Amount</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>₦{parseFloat(amount).toLocaleString()}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Bank</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedAccount?.bank}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedAccount?.accountNumber}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Name</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{selectedAccount?.accountName}</Text>
              </View>
              
              <Divider style={{ marginVertical: 12 }} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Total Amount</Text>
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
                onPress={() => setStep('account')}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={handleWithdraw}
                loading={isLoading}
                disabled={isLoading || !pin}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Withdraw
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
              Withdraw Funds
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