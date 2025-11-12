import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Icon, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export const BalanceCard: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Surface className="rounded-2xl overflow-hidden" elevation={4}>
      <LinearGradient
        colors={['#1e3a8a', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="flex-row justify-between items-start mb-4">
          <View>
            <Text className="text-white/80 text-sm mb-1">Available Balance</Text>
            <View className="flex-row items-center">
              <Text className="text-white text-3xl font-bold mr-2">
                {showBalance ? `₦${user?.balance?.toLocaleString() || '0.00'}` : '****'}
              </Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Icon
                  source={showBalance ? 'eye-off' : 'eye'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white/20 rounded-full p-2">
            <Icon source="wallet" size={24} color="white" />
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white/80 text-xs">Account Number</Text>
            <Text className="text-white font-semibold">
              {user?.accountNumber || 'Loading...'}
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-1">
            <Text className="text-white text-xs font-medium">
              {user?.tier || 'Tier 1'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Surface>
  );
};