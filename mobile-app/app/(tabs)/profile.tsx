import React, { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { Text, Card, Button, Icon, Surface, Avatar, TouchableRipple, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { BiometricSetupModal } from '@/components/BiometricSetupModal';
import { ReferralModal } from '@/components/ReferralModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { expoPushToken } = useNotifications();
  
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const profileSections = [
    {
      title: 'Account',
      items: [
        {
          title: 'Personal Information',
          subtitle: 'Update your profile details',
          icon: 'account-edit',
          onPress: () => {},
        },
        {
          title: 'KYC Verification',
          subtitle: user?.isVerified ? 'Verified' : 'Complete your verification',
          icon: 'shield-check',
          onPress: () => {},
          badge: user?.isVerified ? 'Verified' : 'Pending',
          badgeColor: user?.isVerified ? '#059669' : '#d97706',
        },
        {
          title: 'Bank Accounts',
          subtitle: 'Manage linked bank accounts',
          icon: 'bank',
          onPress: () => {},
        },
        {
          title: 'Cards',
          subtitle: 'Manage debit/credit cards',
          icon: 'credit-card',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          title: 'Change PIN',
          subtitle: 'Update your transaction PIN',
          icon: 'lock-reset',
          onPress: () => {},
        },
        {
          title: 'Biometric Settings',
          subtitle: 'Fingerprint & Face ID',
          icon: 'fingerprint',
          onPress: () => setShowBiometricModal(true),
          hasSwitch: true,
          switchValue: biometricsEnabled,
          onSwitchChange: setBiometricsEnabled,
        },
        {
          title: 'Two-Factor Authentication',
          subtitle: 'Add extra security',
          icon: 'two-factor-authentication',
          onPress: () => {},
        },
        {
          title: 'Login Activity',
          subtitle: 'View recent login attempts',
          icon: 'history',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          title: 'Notifications',
          subtitle: 'Transaction alerts & updates',
          icon: 'bell',
          onPress: () => {},
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled,
        },
        {
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: 'brightness-6',
          onPress: () => {},
          hasSwitch: true,
          switchValue: isDark,
          onSwitchChange: toggleTheme,
        },
        {
          title: 'Language',
          subtitle: 'English',
          icon: 'translate',
          onPress: () => {},
        },
        {
          title: 'Currency',
          subtitle: 'Nigerian Naira (₦)',
          icon: 'currency-ngn',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          subtitle: 'Get help & support',
          icon: 'help-circle',
          onPress: () => {},
        },
        {
          title: 'Contact Us',
          subtitle: 'Chat with support team',
          icon: 'message-text',
          onPress: () => {},
        },
        {
          title: 'FAQs',
          subtitle: 'Frequently asked questions',
          icon: 'frequently-asked-questions',
          onPress: () => {},
        },
        {
          title: 'Report Issue',
          subtitle: 'Report a problem',
          icon: 'alert-circle',
          onPress: () => {},
        },
      ],
    },
  ];

  const quickStats = [
    { label: 'Total Transactions', value: '1,234', icon: 'swap-horizontal' },
    { label: 'Referrals', value: '56', icon: 'account-multiple' },
    { label: 'Rewards Earned', value: '₦12,500', icon: 'gift' },
    { label: 'Savings', value: '₦85,000', icon: 'piggy-bank' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Surface style={{ padding: 16, elevation: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Avatar.Text
              size={60}
              label={user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
              style={{ backgroundColor: theme.colors.primary, marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
                {user?.name || 'User'}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {user?.email || 'user@example.com'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Icon
                  source={user?.isVerified ? 'check-circle' : 'clock'}
                  size={16}
                  color={user?.isVerified ? '#059669' : '#d97706'}
                />
                <Text
                  variant="bodySmall"
                  style={{
                    color: user?.isVerified ? '#059669' : '#d97706',
                    marginLeft: 4,
                    fontWeight: 'bold',
                  }}
                >
                  {user?.isVerified ? 'Verified' : 'Pending Verification'}
                </Text>
              </View>
            </View>
            <IconButton
              icon="cog"
              size={24}
              onPress={() => setShowSettingsModal(true)}
            />
          </View>

          {/* Quick Stats */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {quickStats.map((stat, index) => (
              <Surface
                key={index}
                style={{
                  flex: 1,
                  minWidth: '48%',
                  borderRadius: 12,
                  padding: 12,
                  elevation: 1,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Icon source={stat.icon} size={16} color={theme.colors.primary} />
                  <Text variant="bodySmall" style={{ marginLeft: 4, color: theme.colors.onSurfaceVariant }}>
                    {stat.label}
                  </Text>
                </View>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Text>
              </Surface>
            ))}
          </View>
        </Surface>

        {/* Account Details */}
        <Surface style={{ margin: 16, borderRadius: 12, padding: 16, elevation: 1 }}>
          <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 12 }}>
            Account Details
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Number</Text>
            <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{user?.accountNumber || 'Loading...'}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Account Type</Text>
            <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{user?.tier || 'Tier 1'}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Daily Limit</Text>
            <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>₦{(user?.tier === 'Tier 3' ? 5000000 : user?.tier === 'Tier 2' ? 200000 : 50000).toLocaleString()}</Text>
          </View>
        </Surface>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              mode="contained"
              onPress={() => setShowReferralModal(true)}
              style={{ flex: 1, backgroundColor: theme.colors.primary }}
              icon="gift"
            >
              Refer & Earn
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={{ flex: 1 }}
              icon="qrcode"
            >
              My QR Code
            </Button>
          </View>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: 16 }}>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', marginHorizontal: 16, marginBottom: 8 }}>
              {section.title}
            </Text>
            
            <Surface style={{ elevation: 1 }}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <TouchableRipple onPress={item.onPress}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                      <Avatar.Icon
                        size={40}
                        icon={item.icon}
                        style={{ backgroundColor: theme.colors.surfaceVariant, marginRight: 12 }}
                        color={theme.colors.primary}
                      />
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                          {item.subtitle}
                        </Text>
                      </View>
                      
                      {item.hasSwitch ? (
                        <Switch
                          value={item.switchValue}
                          onValueChange={item.onSwitchChange}
                          color={theme.colors.primary}
                        />
                      ) : item.badge ? (
                        <View
                          style={{
                            backgroundColor: item.badgeColor,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 12,
                          }}
                        >
                          <Text variant="bodySmall" style={{ color: 'white', fontWeight: 'bold' }}>
                            {item.badge}
                          </Text>
                        </View>
                      ) : (
                        <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
                      )}
                    </View>
                  </TouchableRipple>
                  {itemIndex < section.items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Surface>
          </View>
        ))}

        {/* Logout Button */}
        <View style={{ padding: 16 }}>
          <Button
            mode="outlined"
            onPress={logout}
            icon="logout"
            textColor={theme.colors.error}
            style={{ borderColor: theme.colors.error }}
          >
            Sign Out
          </Button>
        </View>

        {/* App Version */}
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Addis Mobile v1.0.0
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Push Token: {expoPushToken ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </ScrollView>

      {/* Modals */}
      <BiometricSetupModal
        visible={showBiometricModal}
        onDismiss={() => setShowBiometricModal(false)}
      />
      <ReferralModal
        visible={showReferralModal}
        onDismiss={() => setShowReferralModal(false)}
      />
      <SettingsModal
        visible={showSettingsModal}
        onDismiss={() => setShowSettingsModal(false)}
      />
    </SafeAreaView>
  );
}