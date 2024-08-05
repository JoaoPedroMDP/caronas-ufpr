import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "../inputs/CustomButton";
import { useContext } from "react";
import { AuthContext } from "@contexts/authContext";

const LogoutButton = () => {
  const { doLogout } = useContext(AuthContext);
  
  const handleLogout = async () => {
    try {
      await doLogout();
      console.log('Logout realizado com sucesso.');
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
