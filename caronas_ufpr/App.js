import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import RoundSquareButton from './src/components/RoundSquareButton';
import CustomSwitch from './src/components/CustomSwitch';
import {useFonts} from 'expo-font'
import CustomTextInput from './src/components/CustomTextInput';


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
    <View style={styles.container}>
      <CustomTextInput text={text} setText={setText} placeholder={"Digite o texto"}/>
      <Text>{text}</Text>
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
