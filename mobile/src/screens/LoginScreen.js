import React, { useContext, useState } from "react";
import { View } from "react-native";
import Screen from "../components/layout/Screen";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import TextButton from '../components/inputs/TextButton';
import { Snackbar, Portal } from "react-native-paper";
import gs from "../globalStyles";
import { AuthContext } from "../contexts/authContext";

const LoginScreen = ({ route, navigation }) => {
  const { doLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  async function handleSignIn() {
    try{
      await doLogin(email, password);
      console.log("Login efetuado.");
    }catch(error){
      console.log("Erro no login: ", error.message);
      setValidationMessage(error.message);
      setShowSnackbar(true);
    }
  }

  return (
      <Screen title="Login" centralized>
          <CustomTextInput text={email} setText={setEmail} placeholder="Email"/>
          <CustomTextInput text={password} setText={setPassword} placeholder="Senha" secureTextEntry={true}/>
          <View style={gs.flexRow}>
            <View style={[gs.flexCol, gs.justifyCenter]}>
              <TextButton text="Cadastre-se!" onPressHandler={() => {navigation.navigate("RegisterScreen")}}/>
              <TextButton text="Esqueceu a senha?" onPressHandler={() => {navigation.navigate("ForgetPassword")}}/>
            </View>
            <CustomButton label="Entrar" onClickHandler={handleSignIn} alignment="end" disabled={email === "" || password === "" }/>
          </View>
          <Portal>
            <Snackbar
              visible={showSnackbar}
              onDismiss={() => setShowSnackbar(false)}
              duration={5000}
              action={{
                label: "Fechar",
              }}
            >
              {validationMessage}
            </Snackbar>
          </Portal>
      </Screen>
  );
}

export default LoginScreen;
