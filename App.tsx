import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Syncopate_400Regular } from "@expo-google-fonts/syncopate/400Regular";
import { Syncopate_700Bold } from "@expo-google-fonts/syncopate/700Bold";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { IBMPlexMono_400Regular } from "@expo-google-fonts/ibm-plex-mono/400Regular";
import Navigation from "./src/navigation";
import config, { DEFAULT_PALETTE } from "./tamagui.config";
import TrackPlayer from "react-native-track-player";
import { setupPlayer, playbackService } from "./src/services/trackPlayer";

TrackPlayer.registerPlaybackService(() => playbackService);

SplashScreen.preventAutoHideAsync().catch((err) => {
  console.error("Splash screen prevention failed:", err);
});

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Syncopate_400Regular,
    Syncopate_700Bold,
    IBMPlexMono_400Regular,
  });

  useEffect(() => {
    if (fontError) {
      console.error("Font loading failed:", fontError);
    }

    if (fontsLoaded || fontError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const setup = async () => {
      try {
        await setupPlayer();
      } catch (err) {
        console.error("Player setup failed:", err);
      }
    };
    setup();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={DEFAULT_PALETTE}>
      <SafeAreaProvider>
        <Theme name={DEFAULT_PALETTE}>
          <StatusBar style="light" />
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </Theme>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
};

export default App;
