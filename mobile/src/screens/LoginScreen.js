import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "@/components/layout/Screen";
import CustomTextInput from "@/components/inputs/CustomTextInput";
import CustomButton from "@/components/inputs/CustomButton";
import TextButton from '@/components/inputs/TextButton';
import gs from "../globalStyles";
import { AuthContext } from "@contexts/authContext";
import { SnackbarContext } from "@contexts/snackbarContext";

const LoginScreen = ({ route, navigation }) => {
  const { doLogin } = useContext(AuthContext);
  const {showSnackbar} = useContext(SnackbarContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSignIn() {
    try{
      await doLogin(email, password);
      showSnackbar("Login efetuado com sucesso!");
    }catch(error){
      console.log("Erro no login: ", error);
      showSnackbar(error.message);
    }
  }

  return (
      <Screen title="Login" centralized>
          <CustomTextInput text={email} setText={setEmail} placeholder="Email"/>
          <CustomTextInput text={password} setText={setPassword} placeholder="Senha" secureTextEntry={true}/>
          <View style={[gs.flexRow, styles.buttons]}>
            <View style={[gs.flexCol, gs.justifyCenter, styles.textButtons]}>
              <TextButton text="Cadastre-se!" onPressHandler={() => {navigation.navigate("Instruções")}}/>
              <TextButton text="Esqueceu a senha?" onPressHandler={() => {navigation.navigate("Resetar senha")}}/>
            </View>
            <View style={[gs.flexRow, styles.loginButton]}>
              <CustomButton label="Entrar" onClickHandler={handleSignIn} disabled={email === "" || password === "" }/>
            </View>
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  textButtons: {
    gap: 2
  },
  buttons: {
    marginTop: 10
  }
});

export default LoginScreen;
