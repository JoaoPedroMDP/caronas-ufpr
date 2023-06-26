import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/FireBaseConfig"; 
import CustomTextInput from "../components/inputs/CustomTextInput";
import Screen from "../components/layout/Screen";
import CustomButton from "../components/inputs/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  async function handleRegister() {
    try {
      const { user } = await createUserWithEmailAndPassword(email, password);
      await updateProfile(user,{
        displayName: name
      });
      navigation.navigate("Login");
    } catch (errorCatch) {
      console.log(errorCatch.message);
    }
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
      />
      <View>
        <CustomButton
          label="Cadastrar"
          onClickHandler={handleRegister}
          alignment="end"
        />
      </View>
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
