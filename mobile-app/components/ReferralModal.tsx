import React from 'react';
import { View, Share } from 'react-native';
import { Modal, Portal, Text, Button, Surface, Icon, IconButton, Avatar } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { showMessage } from 'react-native-flash-message';
import QRCode from 'react-native-qrcode-svg';

interface ReferralModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ visible, onDismiss }) => {
  const { theme } = useTheme();
  const referralCode = 'ADDIS123';
  const referralLink = 'https://addis.com/referral/ADDIS123';

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join Addis Digital Banking and get rewarded! Use my referral code: ${referralCode} or click: ${referralLink}`,
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Could not share referral code',
        type: 'danger',
      });
    }
  };

  const copyToClipboard = () => {
    // Implement clipboard functionality
    showMessage({
      message: 'Copied!',
      description: 'Referral code copied to clipboard',
      type: 'success',
    });
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
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Avatar.Icon
              size={80}
              icon="gift"
              style={{ backgroundColor: theme.colors.primary, marginBottom: 16 }}
              color="white"
            />
            <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 8 }}>
              Refer & Earn
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
              Invite friends to join Addis and earn rewards for every successful referral
            </Text>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            <Surface style={{ flex: 1, padding: 16, borderRadius: 12, marginRight: 8, elevation: 1 }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
                Total Referrals
              </Text>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>56</Text>
            </Surface>
            <Surface style={{ flex: 1, padding: 16, borderRadius: 12, marginLeft: 8, elevation: 1 }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
                Rewards Earned
              </Text>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>₦12,500</Text>
            </Surface>
          </View>

          {/* Referral Code */}
          <Surface style={{ padding: 16, borderRadius: 12, marginBottom: 16, elevation: 1 }}>
            <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 12 }}>Your Referral Code</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Surface style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: theme.colors.surfaceVariant }}>
                <Text variant="bodyLarge" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {referralCode}
                </Text>
              </Surface>
              <IconButton
                icon="content-copy"
                size={24}
                onPress={copyToClipboard}
                style={{ marginLeft: 8 }}
              />
            </View>
            
            {/* QR Code */}
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <QRCode
                value={referralLink}
                size={150}
                color={theme.colors.primary}
                backgroundColor="white"
              />
            </View>

            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
              Scan QR code or share your referral link
            </Text>
          </Surface>

          {/* Action Buttons */}
          <View style={{ gap: 12 }}>
            <Button
              mode="contained"
              onPress={shareReferral}
              icon="share"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Share Referral Link
            </Button>
            <Button
              mode="outlined"
              onPress={onDismiss}
            >
              Close
            </Button>
          </View>

          {/* Terms */}
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: 16 }}>
            Terms: Both you and your referral get ₦500 when they complete their first transaction
          </Text>
        </ScrollView>
      </Modal>
    </Portal>
  );
};