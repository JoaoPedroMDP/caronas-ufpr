import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "../inputs/CustomButton";
import auth from '../../firebase/FireBaseConfig';

const LogoutButton = () => {

  const handleLogout = async () => {
    try {
      auth.signOut();
    } catch (error) {
      console.log('Erro ao realizar logout:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <CustomButton
        label="Sair"
        onClickHandler={handleLogout}
        alignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export default LogoutButton;
