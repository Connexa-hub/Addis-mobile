import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Surface, Icon } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';

interface BiometricSetupModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const BiometricSetupModal: React.FC<BiometricSetupModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();

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
        }}
      >
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            Biometric Settings
          </Text>
          
          <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon source="fingerprint" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={{ marginLeft: 12, fontWeight: 'bold' }}>
                Fingerprint
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Use your fingerprint to unlock the app and authorize transactions
            </Text>
          </Surface>

          <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon source="face-recognition" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={{ marginLeft: 12, fontWeight: 'bold' }}>
                Face ID
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Use facial recognition to unlock the app and authorize transactions
            </Text>
          </Surface>

          <Button
            mode="contained"
            onPress={onDismiss}
            style={{ backgroundColor: theme.colors.primary }}
          >
            Done
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};