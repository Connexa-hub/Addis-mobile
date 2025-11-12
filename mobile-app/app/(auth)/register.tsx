import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { showMessage } from 'react-native-flash-message';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage({
        message: 'Error',
        description: 'Please fill in all fields',
        type: 'danger',
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Error',
        description: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: 'Error',
        description: 'Password must be at least 6 characters',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      router.replace('/(tabs)');
      showMessage({
        message: 'Success',
        description: 'Account created successfully!',
        type: 'success',
      });
    } catch (error: any) {
      showMessage({
        message: 'Registration Failed',
        description: error.message || 'Something went wrong',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }}>
            
            {/* Header */}
            <View style={{ marginBottom: 32 }}>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                Create Account
              </Text>
              <Text variant="bodyLarge" style={{ color: '#64748b' }}>
                Join thousands of users enjoying seamless banking
              </Text>
            </View>

            {/* Registration Form */}
            <View style={{ marginBottom: 32 }}>
              <TextInput
                label="Full Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                mode="outlined"
                style={{ marginBottom: 16, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="account" />}
              />

              <TextInput
                label="Email Address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 16, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Phone Number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                mode="outlined"
                keyboardType="phone-pad"
                style={{ marginBottom: 16, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="phone" />}
              />

              <TextInput
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
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

              <TextInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                mode="outlined"
                secureTextEntry={!isConfirmPasswordVisible}
                style={{ marginBottom: 24, backgroundColor: '#f8fafc' }}
                outlineStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  />
                }
              />

              <LinearGradient colors={['#1e3a8a', '#0891b2']} style={{ borderRadius: 12 }}>
                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                  style={{ backgroundColor: 'transparent', paddingVertical: 12 }}
                  labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                >
                  Create Account
                </Button>
              </LinearGradient>
            </View>

            {/* Terms and Privacy */}
            <View style={{ marginBottom: 24 }}>
              <Text variant="bodySmall" style={{ color: '#64748b', textAlign: 'center', lineHeight: 20 }}>
                By creating an account, you agree to our{' '}
                <Text style={{ color: '#1e3a8a', fontWeight: 'bold' }}>Terms of Service</Text> and{' '}
                <Text style={{ color: '#1e3a8a', fontWeight: 'bold' }}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Sign In Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text variant="bodyMedium" style={{ color: '#64748b' }}>
                Already have an account?
              </Text>
              <Button
                mode="text"
                onPress={() => router.push('/(auth)/login')}
                textColor="#1e3a8a"
                style={{ marginLeft: 4 }}
                labelStyle={{ fontWeight: 'bold' }}
              >
                Sign In
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}