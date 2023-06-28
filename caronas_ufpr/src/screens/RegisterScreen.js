import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/FireBaseConfig";
import CustomTextInput from "../components/inputs/CustomTextInput";
import Screen from "../components/layout/Screen";
import CustomButton from "../components/inputs/CustomButton";
import { Portal, Snackbar } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  async function handleRegister() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (credential) => {
        await updateProfile(credential.user, {
          displayName: name,
        });
        navigation.navigate("Login");
      })
      .catch((error) => {
        let errorMessage;
        if (error.code === "auth/invalid-email") {
          errorMessage = "Email inválido!";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "A senha deve conter no mínimo 6 caracteres!";
        } else if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email já cadastrado!";
        }
        setValidationMessage(errorMessage);
        setShowSnackbar(true);
      });
  }

  return (
    <Screen title="Cadastro" centralized>
      <CustomTextInput
        placeholder="Nome"
        text={name}
        setText={(value) => setName(value)}
      />
      <CustomTextInput
        placeholder="Email"
        text={email}
        setText={(value) => setEmail(value)}
      />
      <CustomTextInput
        placeholder="Senha"
        text={password}
        setText={(value) => setPassword(value)}
        secureTextEntry
      />
      <View>
        <CustomButton
          label="Cadastrar"
          onClickHandler={handleRegister}
          alignment="end"
          disabled={email === "" || password === "" || name === ""}
        />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
  },
  button: {
    left: 83,
  },
  input2: {
    borderRadius: 8,
    backgroundColor: "LightGray",
    fontFamily: "InterRegular",
    height: 35,
    padding: 10,
  },
});

export default RegisterScreen;
