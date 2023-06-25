import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: name
      });
      navigation.navigate("LoginScreen");
    } catch (errorCatch) {
      console.log(errorCatch.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastro</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.input2}
          placeholder={"Nome"}
          value={name}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.input2}
          placeholder={"Email"}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.input2}
          placeholder={"Senha"}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={styles.button}>
        <Button title={"Cadastrar"} onPress={handleRegister} />
      </View>
    </View>
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
