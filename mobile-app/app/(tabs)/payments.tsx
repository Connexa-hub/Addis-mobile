import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Icon, Surface, Avatar, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { BalanceCard } from '@/components/BalanceCard';
import { TransferModal } from '@/components/TransferModal';
import { WithdrawModal } from '@/components/WithdrawModal';
import { DepositModal } from '@/components/DepositModal';

export default function PaymentsScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Refresh user data
    setTimeout(() => setRefreshing(false), 2000);
  };

  const quickActions = [
    {
      title: 'Send Money',
      subtitle: 'Transfer to anyone',
      icon: 'send',
      color: '#1e3a8a',
      onPress: () => setShowTransferModal(true),
    },
    {
      title: 'Withdraw',
      subtitle: 'Cash withdrawal',
      icon: 'download',
      color: '#0891b2',
      onPress: () => setShowWithdrawModal(true),
    },
    {
      title: 'Deposit',
      subtitle: 'Add funds',
      icon: 'upload',
      color: '#059669',
      onPress: () => setShowDepositModal(true),
    },
    {
      title: 'QR Payment',
      subtitle: 'Scan to pay',
      icon: 'qrcode',
      color: '#d97706',
      onPress: () => {},
    },
  ];

  const recentBeneficiaries = [
    { id: '1', name: 'John Doe', accountNumber: '1234567890', bank: 'GTBank', avatar: 'JD' },
    { id: '2', name: 'Jane Smith', accountNumber: '0987654321', bank: 'Access Bank', avatar: 'JS' },
    { id: '3', name: 'Mike Johnson', accountNumber: '1122334455', bank: 'Zenith Bank', avatar: 'MJ' },
    { id: '4', name: 'Sarah Williams', accountNumber: '5566778899', bank: 'First Bank', avatar: 'SW' },
  ];

  const savedAccounts = [
    { id: '1', bank: 'GTBank', accountNumber: '1234567890', type: 'Savings' },
    { id: '2', bank: 'Access Bank', accountNumber: '0987654321', type: 'Current' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16 }}>
          {/* Balance Card */}
          <BalanceCard />

          {/* Quick Actions */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginTop: 24, marginBottom: 16 }}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {quickActions.map((action, index) => (
              <Surface
                key={index}
                style={{
                  width: '48%',
                  borderRadius: 12,
                  padding: 16,
                  elevation: 2,
                }}
              >
                <TouchableRipple
                  onPress={action.onPress}
                  style={{ borderRadius: 12 }}
                >
                  <View>
                    <Avatar.Icon
                      size={48}
                      icon={action.icon}
                      style={{ backgroundColor: action.color + '20', marginBottom: 12 }}
                      color={action.color}
                    />
                    <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      {action.title}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      {action.subtitle}
                    </Text>
                  </View>
                </TouchableRipple>
              </Surface>
            ))}
          </View>

          {/* Recent Beneficiaries */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginTop: 24, marginBottom: 16 }}>
            Recent Beneficiaries
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
            {recentBeneficiaries.map((beneficiary) => (
              <Surface
                key={beneficiary.id}
                style={{
                  width: 120,
                  marginRight: 12,
                  borderRadius: 12,
                  padding: 12,
                  alignItems: 'center',
                  elevation: 1,
                }}
              >
                <TouchableRipple
                  onPress={() => setShowTransferModal(true)}
                  style={{ borderRadius: 12 }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Avatar.Text
                      size={48}
                      label={beneficiary.avatar}
                      style={{ marginBottom: 8, backgroundColor: theme.colors.primaryContainer }}
                    />
                    <Text variant="bodySmall" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {beneficiary.name}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                      {beneficiary.bank}
                    </Text>
                  </View>
                </TouchableRipple>
              </Surface>
            ))}
          </ScrollView>

          {/* Saved Bank Accounts */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 16 }}>
            My Bank Accounts
          </Text>
          
          <View style={{ gap: 12 }}>
            {savedAccounts.map((account) => (
              <Surface
                key={account.id}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  elevation: 1,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon
                      size={40}
                      icon="bank"
                      style={{ backgroundColor: theme.colors.surfaceVariant, marginRight: 12 }}
                      color={theme.colors.primary}
                    />
                    <View>
                      <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                        {account.bank}
                      </Text>
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        {account.accountNumber}
                      </Text>
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {account.type} Account
                      </Text>
                    </View>
                  </View>
                  <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
                </View>
              </Surface>
            ))}
          </View>

          {/* Transaction History */}
          <Text variant="titleLarge" style={{ fontWeight: 'bold', marginTop: 24, marginBottom: 16 }}>
            Recent Transactions
          </Text>
          
          <View style={{ gap: 12 }}>
            {[
              { id: '1', type: 'debit', amount: 5000, description: 'Transfer to John Doe', date: '2025-11-12', status: 'completed' },
              { id: '2', type: 'credit', amount: 10000, description: 'Salary Payment', date: '2025-11-11', status: 'completed' },
              { id: '3', type: 'debit', amount: 2500, description: 'Airtime Purchase', date: '2025-11-10', status: 'completed' },
              { id: '4', type: 'debit', amount: 15000, description: 'DSTV Subscription', date: '2025-11-09', status: 'pending' },
            ].map((transaction) => (
              <Surface
                key={transaction.id}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  elevation: 1,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Avatar.Icon
                      size={40}
                      icon={transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'}
                      style={{
                        backgroundColor: transaction.type === 'credit' ? '#d1fae5' : '#fee2e2',
                        marginRight: 12,
                      }}
                      color={transaction.type === 'credit' ? '#059669' : '#dc2626'}
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 2 }}>
                        {transaction.description}
                      </Text>
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {transaction.date}
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text
                      variant="bodyLarge"
                      style={{
                        fontWeight: 'bold',
                        color: transaction.type === 'credit' ? '#059669' : '#dc2626',
                        marginBottom: 4,
                      }}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount?.toLocaleString()}
                    </Text>
                    <View
                      style={{
                        backgroundColor: transaction.status === 'completed' ? '#d1fae5' : '#fef3c7',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        variant="bodySmall"
                        style={{
                          color: transaction.status === 'completed' ? '#059669' : '#d97706',
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </Surface>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <TransferModal
        visible={showTransferModal}
        onDismiss={() => setShowTransferModal(false)}
      />
      <WithdrawModal
        visible={showWithdrawModal}
        onDismiss={() => setShowWithdrawModal(false)}
      />
      <DepositModal
        visible={showDepositModal}
        onDismiss={() => setShowDepositModal(false)}
      />
    </SafeAreaView>
  );
}