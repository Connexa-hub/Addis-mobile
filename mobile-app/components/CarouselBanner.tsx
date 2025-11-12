import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

interface CarouselBannerProps {
  banners: Banner[];
}

const { width } = Dimensions.get('window');

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 32));
    setCurrentIndex(index);
  };

  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="rounded-2xl overflow-hidden"
      >
        {banners.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            onPress={() => {}}
            className="mr-4"
            style={{ width: width - 32 }}
          >
            <Surface className="rounded-2xl overflow-hidden" elevation={2}>
              <View className="relative">
                <Image
                  source={{ uri: banner.image }}
                  style={{ width: '100%', height: 120 }}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                  className="absolute inset-0 justify-end p-4"
                >
                  <Text className="text-white text-lg font-bold mb-1">
                    {banner.title}
                  </Text>
                  <Text className="text-white/90 text-sm">
                    {banner.subtitle}
                  </Text>
                </LinearGradient>
              </View>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View className="flex-row justify-center mt-3">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
};