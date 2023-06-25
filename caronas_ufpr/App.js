// import 'react-native-gesture-handler';
import { StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font'
import RegisterRouteScreen from './src/screens/RegisterRouteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgetPassword from './src/screens/ForgetPassword';
import FirstAccessScreen from './src/screens/FirstAccessScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import ResultProfileScreen from './src/screens/ResultProfileScreen';

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
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="NewPassword" component={NewPasswordScreen} />
          <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} />
          <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} />
          <Drawer.Screen name="ResultProfile" component={ResultProfileScreen} options={{drawerItemStyle: { height: 0 }}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
