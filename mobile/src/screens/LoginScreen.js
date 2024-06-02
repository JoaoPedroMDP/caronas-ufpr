import React, { useContext, useState } from "react";
import { View } from "react-native";
import Screen from "../components/layout/Screen";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import TextButton from '../components/inputs/TextButton';
import gs from "../globalStyles";
import { AuthContext } from "../contexts/authContext";
import { SnackbarContext } from "../contexts/snackbarContext";

const LoginScreen = ({ route, navigation }) => {
  const { doLogin } = useContext(AuthContext);
  const {showSnackbar} = useContext(SnackbarContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSignIn() {
    try{
      await doLogin(email, password);
      showSnackbar("Login efetuado com sucesso!", 2000);
    }catch(error){
      console.log("Erro no login: ", error);
      showSnackbar("Erro ao efetuar login!", 2000);
    }
  }

  return (
      <Screen title="Login" centralized>
          <CustomTextInput text={email} setText={setEmail} placeholder="Email"/>
          <CustomTextInput text={password} setText={setPassword} placeholder="Senha" secureTextEntry={true}/>
          <View style={gs.flexRow}>
            <View style={[gs.flexCol, gs.justifyCenter]}>
              <TextButton text="Cadastre-se!" onPressHandler={() => {navigation.navigate("Cadastrar-se")}}/>
              <TextButton text="Esqueceu a senha?" onPressHandler={() => {navigation.navigate("Resetar senha")}}/>
            </View>
            <CustomButton label="Entrar" onClickHandler={handleSignIn} alignment="end" disabled={email === "" || password === "" }/>
          </View>
      </Screen>
  );
}

export default LoginScreen;
