import "@expo/metro-runtime";
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, PaperProvider, Snackbar } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/contexts/authContext';
import Routes from './src/routes';
import { SnackbarProvider } from "./src/contexts/snackbarContext";
import { SafeAreaView, Platform, StyleSheet, StatusBar } from "react-native";

const Stack = createStackNavigator();
Stack.Group

export default function App() {
  const [fontsLoaded] = useFonts({
    InterExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <AuthProvider>
            <SnackbarProvider>
              <Routes />
            </SnackbarProvider>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});