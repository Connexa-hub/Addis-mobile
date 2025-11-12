import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, Surface, Icon, Switch, Divider } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onDismiss }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [crashReportingEnabled, setCrashReportingEnabled] = useState(true);

  const settingsSections = [
    {
      title: 'App Preferences',
      items: [
        {
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          icon: 'brightness-6',
          hasSwitch: true,
          switchValue: isDark,
          onSwitchChange: toggleTheme,
        },
        {
          title: 'Notifications',
          subtitle: 'Transaction alerts & updates',
          icon: 'bell',
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled,
        },
        {
          title: 'Location Services',
          subtitle: 'Use location for better services',
          icon: 'map-marker',
          hasSwitch: true,
          switchValue: locationEnabled,
          onSwitchChange: setLocationEnabled,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          title: 'Crash Reporting',
          subtitle: 'Help improve the app',
          icon: 'bug',
          hasSwitch: true,
          switchValue: crashReportingEnabled,
          onSwitchChange: setCrashReportingEnabled,
        },
        {
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          icon: 'shield-account',
          onPress: () => {},
        },
        {
          title: 'Terms of Service',
          subtitle: 'Read our terms',
          icon: 'file-document',
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
          title: 'Contact Support',
          subtitle: 'Chat with our team',
          icon: 'message-text',
          onPress: () => {},
        },
        {
          title: 'Rate App',
          subtitle: 'Rate us on app store',
          icon: 'star',
          onPress: () => {},
        },
      ],
    },
  ];

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
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            Settings
          </Text>

          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 16 }}>
              <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                {section.title}
              </Text>
              
              <Surface style={{ borderRadius: 12, elevation: 1 }}>
                {section.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                      <Icon source={item.icon} size={24} color={theme.colors.primary} style={{ marginRight: 12 }} />
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
                      ) : (
                        <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
                      )}
                    </View>
                    {itemIndex < section.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Surface>
            </View>
          ))}

          <Button
            mode="contained"
            onPress={onDismiss}
            style={{ backgroundColor: theme.colors.primary }}
          >
            Done
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};