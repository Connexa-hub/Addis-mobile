import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Surface, IconButton, Avatar } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';

interface TransferModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'recipient' | 'amount' | 'confirm'>('recipient');
  const [recipient, setRecipient] = useState({
    name: '',
    accountNumber: '',
    bank: '',
    saved: false,
  });
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const banks = [
    'Access Bank', 'Citibank', 'Diamond Bank', 'Ecobank Nigeria',
    'Fidelity Bank', 'First Bank of Nigeria', 'First City Monument Bank',
    'Guaranty Trust Bank', 'Heritage Bank', 'Keystone Bank',
    'Mainstreet Bank', 'Skye Bank', 'Stanbic IBTC Bank',
    'Standard Chartered Bank', 'Sterling Bank', 'Union Bank of Nigeria',
    'United Bank for Africa', 'Unity Bank', 'Wema Bank', 'Zenith Bank'
  ];

  const savedBeneficiaries = [
    { id: '1', name: 'John Doe', accountNumber: '1234567890', bank: 'GTBank' },
    { id: '2', name: 'Jane Smith', accountNumber: '0987654321', bank: 'Access Bank' },
    { id: '3', name: 'Mike Johnson', accountNumber: '1122334455', bank: 'Zenith Bank' },
  ];

  const handleTransfer = async () => {
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
      // Simulate transfer
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showMessage({
        message: 'Success',
        description: `Transfer of ₦${parseFloat(amount).toLocaleString()} to ${recipient.name} was successful!`,
        type: 'success',
      });
      
      onDismiss();
      resetForm();
    } catch (error) {
      showMessage({
        message: 'Transfer Failed',
        description: 'Something went wrong. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('recipient');
    setRecipient({ name: '', accountNumber: '', bank: '', saved: false });
    setAmount('');
    setDescription('');
    setPin('');
  };

  const renderStep = () => {
    switch (step) {
      case 'recipient':
        return (
          <View>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Select Recipient
            </Text>
            
            {/* Saved Beneficiaries */}
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>Saved Beneficiaries</Text>
            {savedBeneficiaries.map((beneficiary) => (
              <Surface
                key={beneficiary.id}
                style={{ marginBottom: 8, borderRadius: 8, padding: 12 }}
                onTouchStart={() => {
                  setRecipient({
                    name: beneficiary.name,
                    accountNumber: beneficiary.accountNumber,
                    bank: beneficiary.bank,
                    saved: true,
                  });
                  setStep('amount');
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar.Text size={40} label={beneficiary.name.split(' ').map(n => n[0]).join('')} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{beneficiary.name}</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                      {beneficiary.accountNumber} • {beneficiary.bank}
                    </Text>
                  </View>
                </View>
              </Surface>
            ))}

            <Divider style={{ marginVertical: 16 }} />

            {/* New Recipient */}
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>New Recipient</Text>
            <TextInput
              label="Account Number"
              value={recipient.accountNumber}
              onChangeText={(text) => setRecipient({ ...recipient, accountNumber: text })}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 12 }}
            />
            <TextInput
              label="Bank Name"
              value={recipient.bank}
              onChangeText={(text) => setRecipient({ ...recipient, bank: text })}
              mode="outlined"
              style={{ marginBottom: 12 }}
            />
            <TextInput
              label="Recipient Name"
              value={recipient.name}
              onChangeText={(text) => setRecipient({ ...recipient, name: text })}
              mode="outlined"
              style={{ marginBottom: 16 }}
            />

            <Button
              mode="contained"
              onPress={() => setStep('amount')}
              disabled={!recipient.name || !recipient.accountNumber || !recipient.bank}
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
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Avatar.Text size={40} label={recipient.name.split(' ').map(n => n[0]).join('')} />
                <View style={{ marginLeft: 12 }}>
                  <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>{recipient.name}</Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {recipient.accountNumber} • {recipient.bank}
                  </Text>
                </View>
              </View>
            </Surface>

            <TextInput
              label="Amount (₦)"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginBottom: 12 }}
              left={<TextInput.Icon icon="currency-ngn" />}
            />
            <TextInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={{ marginBottom: 16 }}
            />

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                mode="outlined"
                onPress={() => setStep('recipient')}
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
              Confirm Transfer
            </Text>

            <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Transfer Details</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Recipient</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{recipient.name}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Number</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{recipient.accountNumber}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Bank</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{recipient.bank}</Text>
              </View>
              
              {description && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Description</Text>
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{description}</Text>
                </View>
              )}
              
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
                onPress={handleTransfer}
                loading={isLoading}
                disabled={isLoading || !pin}
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
              >
                Send Money
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
          {renderStep()}
        </ScrollView>
      </Modal>
    </Portal>
  );
};