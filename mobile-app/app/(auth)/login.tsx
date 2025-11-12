import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { showMessage } from 'react-native-flash-message';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        message: 'Error',
        description: 'Please fill in all fields',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
      showMessage({
        message: 'Success',
        description: 'Login successful!',
        type: 'success',
      });
    } catch (error: any) {
      showMessage({
        message: 'Login Failed',
        description: error.message || 'Invalid credentials',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 60 }}>
            
            {/* Header */}
            <View style={{ marginBottom: 40 }}>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                Welcome Back
              </Text>
              <Text variant="bodyLarge" style={{ color: '#64748b' }}>
                Sign in to your Addis account
              </Text>
            </View>

            {/* Login Form */}
            <View style={{ marginBottom: 32 }}>
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 16, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!isPasswordVisible}
                style={{ marginBottom: 16, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />

              <Button
                mode="text"
                onPress={() => router.push('/(auth)/forgot-password')}
                textColor="#1e3a8a"
                style={{ alignSelf: 'flex-end', marginBottom: 24 }}
              >
                Forgot Password?
              </Button>

              <LinearGradient colors={['#1e3a8a', '#0891b2']} style={{ borderRadius: 12 }}>
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={isLoading}
                  disabled={isLoading}
                  style={{ backgroundColor: 'transparent', paddingVertical: 12 }}
                  labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                >
                  Sign In
                </Button>
              </LinearGradient>
            </View>

            {/* Social Login */}
            <View style={{ marginBottom: 32 }}>
              <Divider style={{ marginBottom: 24 }}>
                <Text variant="bodySmall" style={{ color: '#64748b' }}>
                  Or continue with
                </Text>
              </Divider>

              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
                <IconButton
                  icon="google"
                  size={32}
                  style={{ backgroundColor: '#f8fafc', borderRadius: 12 }}
                  onPress={() => {}}
                />
                <IconButton
                  icon="facebook"
                  size={32}
                  style={{ backgroundColor: '#f8fafc', borderRadius: 12 }}
                  onPress={() => {}}
                />
                <IconButton
                  icon="apple"
                  size={32}
                  style={{ backgroundColor: '#f8fafc', borderRadius: 12 }}
                  onPress={() => {}}
                />
              </View>
            </View>

            {/* Sign Up Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text variant="bodyMedium" style={{ color: '#64748b' }}>
                Don't have an account?
              </Text>
              <Button
                mode="text"
                onPress={() => router.push('/(auth)/register')}
                textColor="#1e3a8a"
                style={{ marginLeft: 4 }}
                labelStyle={{ fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}