import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Icon, Avatar, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { QuickActionButton } from '@/components/QuickActionButton';
import { BalanceCard } from '@/components/BalanceCard';
import { RecentTransactions } from '@/components/RecentTransactions';
import { CarouselBanner } from '@/components/CarouselBanner';

export default function HomeScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Refresh data here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const quickActions = [
    { icon: 'send', label: 'Send Money', onPress: () => {} },
    { icon: 'download', label: 'Withdraw', onPress: () => {} },
    { icon: 'upload', label: 'Deposit', onPress: () => {} },
    { icon: 'phone', label: 'Airtime', onPress: () => {} },
    { icon: 'wifi', label: 'Data', onPress: () => {} },
    { icon: 'receipt', label: 'Bills', onPress: () => {} },
    { icon: 'television', label: 'TV', onPress: () => {} },
    { icon: 'lightning-bolt', label: 'Electricity', onPress: () => {} },
  ];

  const banners = [
    {
      id: '1',
      image: 'https://via.placeholder.com/400x200/1e3a8a/ffffff?text=Welcome+to+Addis',
      title: 'Welcome to Addis',
      subtitle: 'Your digital banking solution',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/400x200/0891b2/ffffff?text=Instant+Transfers',
      title: 'Instant Transfers',
      subtitle: 'Send money in seconds',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/400x200/059669/ffffff?text=VTU+Services',
      title: 'VTU Services',
      subtitle: 'Airtime, Data & Bills',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Avatar.Text
                size={40}
                label={user?.name?.charAt(0) || 'A'}
                style={{ backgroundColor: theme.colors.primary }}
              />
              <View className="ml-3">
                <Text className="text-lg font-semibold" style={{ color: theme.colors.onBackground }}>
                  Hello, {user?.name || 'User'}
                </Text>
                <Text className="text-sm" style={{ color: theme.colors.onSurfaceVariant }}>
                  Welcome back
                </Text>
              </View>
            </View>
            <Icon source="bell-outline" size={24} color={theme.colors.onBackground} />
          </View>

          {/* Balance Card */}
          <BalanceCard />

          {/* Quick Actions */}
          <Text className="text-xl font-semibold mt-6 mb-4" style={{ color: theme.colors.onBackground }}>
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => (
              <QuickActionButton
                key={index}
                icon={action.icon}
                label={action.label}
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>

        {/* Promotional Banners */}
        <View className="px-4 mb-6">
          <CarouselBanner banners={banners} />
        </View>

        {/* Recent Transactions */}
        <View className="px-4">
          <Text className="text-xl font-semibold mb-4" style={{ color: theme.colors.onBackground }}>
            Recent Transactions
          </Text>
          <RecentTransactions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}