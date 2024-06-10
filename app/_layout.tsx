import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {VeeContextProvider} from '@/components/Veecontext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { Appearance, ColorSchemeName } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    OutfitLight: require('../assets/fonts/Outfit-Light.ttf'),
    OutfitRegular: require('../assets/fonts/Outfit-Regular.ttf'),
    OutfitBold: require('../assets/fonts/Outfit-Bold.ttf'),
    OutfitExtrabold: require('../assets/fonts/Outfit-ExtraBold.ttf'),
    SpaceGroteskBold: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
    SpaceGroteskRegular: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
    NunitoSansRegular: require('../assets/fonts/NunitoSans_10pt-Regular.ttf'),
    SpaceGroteskMedium: require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
    NunitoSanslight: require('../assets/fonts/NunitoSans_10pt-Light.ttf'),
    
    
    
    
    
  });
  
  // const getMyTheme = async (): Promise<void> => {
  //   try {
  //     let customTheme = await SecureStore.getItemAsync('appearance');
  //     if (customTheme) {
  //       Appearance.setColorScheme(customTheme === 'dark' ? 'dark' : 'light');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving theme:', error);
  //   }
  // };
  const getMyTheme = async (): Promise<void> => {
    try {
      let customTheme = await SecureStore.getItemAsync('appearance');
      if (customTheme) {
        const theme: ColorSchemeName = customTheme === 'dark' ? 'dark' : 'light';
        Appearance.setColorScheme(theme);
      }
    } catch (error) {
      console.error('Error retrieving theme:', error);
    }
  };
  useEffect(() => {
    if (loaded) {
      getMyTheme(); 
      SplashScreen.hideAsync();
   
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
<VeeContextProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)"  options={{ headerShown: false }} />
      {/* <Stack.Screen name="onboarding" options={{ headerShown: false }} /> */}
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />


        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
    </VeeContextProvider>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
