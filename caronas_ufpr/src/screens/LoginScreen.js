import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/layout/Screen";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";
import TextButton from '../components/inputs/TextButton';
import { Snackbar, Portal } from "react-native-paper";
import gs from "../globalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [signInWithEmailAndPassword, user] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn() {
    signInWithEmailAndPassword(email, password).then((userCredential) => {
      console.log(userCredential)
      if (!userCredential) {
        setValidationMessage("Email ou senha inválidos!");
        setShowSnackbar(true);
      }
    });
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
