import 'react-native-gesture-handler';
import { StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font'
import RegisterRouteScreen from './src/screens/RegisterRouteScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgetPassword from './src/screens/ForgetPassword';
import FirstAccessScreen from './src/screens/FirstAccessScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';

const Drawer = createDrawerNavigator();

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
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        <Drawer.Screen name="NewPassword" component={NewPasswordScreen} />
        <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} />
        <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
        <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
