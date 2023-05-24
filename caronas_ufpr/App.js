import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import RoundSquareButton from './src/components/RoundSquareButton';
import CustomSwitch from './src/components/CustomSwitch';
import {useFonts} from 'expo-font'


export default function App() {
  const [clicked, setClicked] = useState(false);

  const [fontsLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CustomSwitch switchValue={clicked} onSwitchHandler={setClicked}/>
      <Text>{clicked ? "Clicado" : "Não clicado"}</Text>
    </View>
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
