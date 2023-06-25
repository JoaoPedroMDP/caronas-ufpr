import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../inputs/CustomButton";

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Erro ao remover itens do AsyncStorage:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <CustomButton
        label="Sair"
        onClickHandler={handleLogout}
        containerStyle={styles.buttonContainer}
        alignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
});

export default LogoutButton;
