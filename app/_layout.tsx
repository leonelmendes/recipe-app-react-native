import {Touchable} from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import RecipeDetail from './recipeDetail';
import Ionicons from '@expo/vector-icons';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { UserProvider } from './context/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <>
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ presentation: "modal"}}/>
        <Stack.Screen name="register" options={{ presentation: "modal"}} />
        <Stack.Screen name="recipeDetail" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
    </Stack>
    <Toast position='bottom' visibilityTime={2000}/>
    </>
    </UserProvider>
  );
}

