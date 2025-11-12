import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Image } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to Addis',
    subtitle: 'Your complete digital banking solution',
    description: 'Experience seamless banking with instant transfers, bill payments, and more.',
    image: 'https://via.placeholder.com/300x300/1e3a8a/ffffff?text=Welcome',
  },
  {
    id: 2,
    title: 'Send Money Instantly',
    subtitle: 'Transfer money to anyone, anywhere',
    description: 'Send money to friends, family, or businesses with just a few taps.',
    image: 'https://via.placeholder.com/300x300/0891b2/ffffff?text=Send+Money',
  },
  {
    id: 3,
    title: 'Pay Bills Easily',
    subtitle: 'Airtime, Data, TV, Electricity',
    description: 'Pay all your bills in one place. Never miss a payment again.',
    image: 'https://via.placeholder.com/300x300/059669/ffffff?text=Pay+Bills',
  },
  {
    id: 4,
    title: 'Secure & Reliable',
    subtitle: 'Your money is safe with us',
    description: 'Bank-grade security with biometric authentication and encryption.',
    image: 'https://via.placeholder.com/300x300/dc2626/ffffff?text=Secure',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {onboardingData.map((slide) => (
          <View key={slide.id} style={{ width, paddingHorizontal: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: slide.image }}
                style={{ width: 280, height: 280, marginBottom: 40 }}
                resizeMode="contain"
              />
              
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
                {slide.title}
              </Text>
              
              <Text variant="titleMedium" style={{ color: '#0891b2', marginBottom: 16, textAlign: 'center' }}>
                {slide.subtitle}
              </Text>
              
              <Text variant="bodyLarge" style={{ color: '#64748b', textAlign: 'center', lineHeight: 24, marginBottom: 40 }}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={{
              width: currentIndex === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentIndex === index ? '#1e3a8a' : '#cbd5e1',
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      {/* Action buttons */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {currentIndex === onboardingData.length - 1 ? (
          <LinearGradient
            colors={['#1e3a8a', '#0891b2']}
            style={{ borderRadius: 12 }}
          >
            <Button
              mode="contained"
              onPress={handleNext}
              style={{ backgroundColor: 'transparent', paddingVertical: 12 }}
              labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Get Started
            </Button>
          </LinearGradient>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              mode="text"
              onPress={handleSkip}
              textColor="#64748b"
              style={{ paddingHorizontal: 16 }}
            >
              Skip
            </Button>
            
            <LinearGradient
              colors={['#1e3a8a', '#0891b2']}
              style={{ borderRadius: 12 }}
            >
              <Button
                mode="contained"
                onPress={handleNext}
                style={{ backgroundColor: 'transparent', paddingVertical: 8, paddingHorizontal: 24 }}
                labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
              >
                Next
              </Button>
            </LinearGradient>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}