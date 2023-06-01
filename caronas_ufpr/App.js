import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import RoundSquareButton from './src/components/inputs/RoundSquareButton';
import CustomSwitch from './src/components/inputs/CustomSwitch';
import { useFonts } from 'expo-font'
import CustomTextInput from './src/components/inputs/CustomTextInput';
import RegisterRouteScreen from './src/screens/RegisterRouteScreen';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  const [fontsLoaded] = useFonts({
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
        <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <RoundSquareButton char="A" onClickHandler={setClicked}/>
    //   <CustomSwitch switchValue={clicked} onSwitchHandler={setClicked} />
    //   <Text>{clicked ? "Clicado" : "Não clicado"}</Text>
    //   <CustomTextInput text={text} setText={setText} placeholder={"Digite o texto"} />
    //   <Text>{text}</Text>
    // </View>
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
