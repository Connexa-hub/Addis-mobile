import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Icon, Surface, Avatar } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 5000,
    description: 'Salary Payment',
    date: '2025-11-12',
    category: 'income',
    status: 'completed',
  },
  {
    id: '2',
    type: 'debit',
    amount: 1500,
    description: 'MTN Airtime',
    date: '2025-11-11',
    category: 'airtime',
    status: 'completed',
  },
  {
    id: '3',
    type: 'debit',
    amount: 2500,
    description: 'DSTV Subscription',
    date: '2025-11-10',
    category: 'tv',
    status: 'completed',
  },
  {
    id: '4',
    type: 'credit',
    amount: 3000,
    description: 'Transfer from John',
    date: '2025-11-09',
    category: 'transfer',
    status: 'completed',
  },
];

export const RecentTransactions: React.FC = () => {
  const { theme } = useTheme();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'income':
        return 'cash-multiple';
      case 'airtime':
        return 'phone';
      case 'tv':
        return 'television';
      case 'transfer':
        return 'bank-transfer';
      default:
        return 'circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.tertiary;
      case 'pending':
        return theme.colors.warning;
      case 'failed':
        return theme.colors.error;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Surface
      className="mb-3 rounded-xl p-4"
      elevation={1}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <TouchableOpacity className="flex-row items-center">
        <Avatar.Icon
          size={40}
          icon={getCategoryIcon(item.category)}
          style={{
            backgroundColor:
              item.type === 'credit'
                ? theme.colors.tertiaryContainer
                : theme.colors.errorContainer,
          }}
          color={
            item.type === 'credit'
              ? theme.colors.tertiary
              : theme.colors.error
          }
        />
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="font-semibold text-sm mb-1" style={{ color: theme.colors.onSurface }}>
                {item.description}
              </Text>
              <Text className="text-xs" style={{ color: theme.colors.onSurfaceVariant }}>
                {item.date}
              </Text>
            </View>
            <View className="items-end">
              <Text
                className={`font-semibold text-sm ${
                  item.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.type === 'credit' ? '+' : '-'}₦{item.amount.toLocaleString()}
              </Text>
              <View
                className="px-2 py-1 rounded-full mt-1"
                style={{
                  backgroundColor: getStatusColor(item.status) + '20',
                }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{ color: getStatusColor(item.status) }}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );

  return (
    <View>
      <FlatList
        data={mockTransactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      <TouchableOpacity className="mt-4 p-4 rounded-xl border border-dashed"
        style={{ borderColor: theme.colors.outline }}
      >
        <Text className="text-center font-medium" style={{ color: theme.colors.primary }}>
          View All Transactions
        </Text>
      </TouchableOpacity>
    </View>
  );
};