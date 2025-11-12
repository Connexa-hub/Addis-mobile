import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  People,
  Receipt,
  Phone,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  AccountBalance,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useQuery } from 'react-query';
import { dashboardAPI } from '../../services/api';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useQuery('dashboard-stats', dashboardAPI.getStats);
  const { data: chartData, isLoading: chartLoading } = useQuery('dashboard-chart', dashboardAPI.getChartData);
  const { data: recentTransactions, isLoading: transactionsLoading } = useQuery('recent-transactions', dashboardAPI.getRecentTransactions);

  const StatCard = ({ title, value, icon, color, trend, trendValue }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {trend === 'up' ? (
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                ) : (
                  <TrendingDown color="error" sx={{ mr: 1 }} />
                )}
                <Typography variant="body2" color={trend === 'up' ? 'success.main' : 'error.main'}>
                  {trendValue}%
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  if (statsLoading || chartLoading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || '0'}
            icon={<People />}
            color="#1e3a8a"
            trend="up"
            trendValue={12.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Transactions"
            value={stats?.totalTransactions || '0'}
            icon={<Receipt />}
            color="#0891b2"
            trend="up"
            trendValue={8.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="VTU Transactions"
            value={stats?.vtuTransactions || '0'}
            icon={<Phone />}
            color="#059669"
            trend="down"
            trendValue={3.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue (₦)"
            value={`₦${(stats?.revenue || 0).toLocaleString()}`}
            icon={<AttachMoney />}
            color="#d97706"
            trend="up"
            trendValue={15.3}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Transaction Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="transactions" stroke="#1e3a8a" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#0891b2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Service Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.serviceDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e3a8a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Recent Transactions
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e0e0e0' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Service</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions?.map((transaction: any) => (
                  <tr key={transaction.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f5f5f5' }}>
                      {transaction.user?.name || 'Unknown'}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f5f5f5' }}>
                      {transaction.service}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f5f5f5' }}>
                      ₦{transaction.amount?.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f5f5f5' }}>
                      <Chip
                        label={transaction.status}
                        size="small"
                        color={transaction.status === 'completed' ? 'success' : 'warning'}
                      />
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f5f5f5' }}>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;