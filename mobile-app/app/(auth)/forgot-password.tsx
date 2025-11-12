import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      showMessage({
        message: 'Error',
        description: 'Please enter your email address',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSent(true);
      showMessage({
        message: 'Success',
        description: 'Password reset link sent to your email',
        type: 'success',
      });
    } catch (error: any) {
      showMessage({
        message: 'Failed',
        description: error.message || 'Something went wrong',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}>
          <Surface style={{ padding: 40, borderRadius: 16, alignItems: 'center' }} elevation={2}>
            <Surface style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#d1fae5', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
              <IconButton icon="email-check" size={40} iconColor="#059669" />
            </Surface>
            
            <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
              Check Your Email
            </Text>
            
            <Text variant="bodyMedium" style={{ color: '#64748b', textAlign: 'center', marginBottom: 32, lineHeight: 24 }}>
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </Text>
            
            <Button
              mode="contained"
              onPress={() => router.replace('/(auth)/login')}
              style={{ backgroundColor: '#1e3a8a', borderRadius: 12, paddingHorizontal: 32 }}
              labelStyle={{ fontWeight: 'bold' }}
            >
              Back to Login
            </Button>
          </Surface>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 60 }}>
            
            {/* Back Button */}
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => router.back()}
              style={{ alignSelf: 'flex-start', marginBottom: 20 }}
            />
            
            {/* Header */}
            <View style={{ marginBottom: 40 }}>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                Forgot Password
              </Text>
              <Text variant="bodyLarge" style={{ color: '#64748b' }}>
                Enter your email address and we'll send you a reset link
              </Text>
            </View>

            {/* Form */}
            <View style={{ marginBottom: 32 }}>
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 24, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="email" />}
              />

              <LinearGradient colors={['#1e3a8a', '#0891b2']} style={{ borderRadius: 12 }}>
                <Button
                  mode="contained"
                  onPress={handleResetPassword}
                  loading={isLoading}
                  disabled={isLoading}
                  style={{ backgroundColor: 'transparent', paddingVertical: 12 }}
                  labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                >
                  Send Reset Link
                </Button>
              </LinearGradient>
            </View>

            {/* Help Text */}
            <View style={{ alignItems: 'center' }}>
              <Text variant="bodySmall" style={{ color: '#64748b', textAlign: 'center', lineHeight: 20 }}>
                Remember your password?{' '}
                <Text
                  style={{ color: '#1e3a8a', fontWeight: 'bold' }}
                  onPress={() => router.replace('/(auth)/login')}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}