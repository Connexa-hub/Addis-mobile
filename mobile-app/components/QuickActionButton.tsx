import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[22%] mb-4 items-center"
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: 12,
        paddingVertical: 12,
        marginHorizontal: '1%',
      }}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Icon source={icon} size={24} color={theme.colors.primary} />
      </View>
      <Text className="text-xs text-center font-medium" style={{ color: theme.colors.onSurface }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};