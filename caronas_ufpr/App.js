// import 'react-native-gesture-handler';
import { StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import ResultProfileScreen from './src/screens/ResultProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './src/screens/navigators/RootNavigator';

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
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RootNavigator" component={RootNavigator} options={{headerShown: false}}/>
          <Stack.Screen name="ResultProfileScreen" component={ResultProfileScreen} />
        </Stack.Navigator>
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
