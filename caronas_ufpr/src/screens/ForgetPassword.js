import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import SubTitle from "../components/textual/Subtitle";
import Comment from "../components/textual/Comment";
import TextButton from "../components/inputs/TextButton";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);

  const auth = getAuth();
  function passwordReset() {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setValidationMessage("Email enviado para a redefinição de senha!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setValidationMessage(`${errorCode} ${errorMessage}`);
        });
    } else {
      setValidationMessage("Por favor, insira um endereço de email válido.");
    }
  }

  return (
    <Screen title="Recuperar senha" centralized>
      <SubTitle subtitle="Acontece nas melhores famílias" centralized={true} />
      <Comment
        centralized={true}
        comment="Faz assim: conte para gente qual endereço de email você usou para se cadastrar aqui, e te enviaremos um email de recuperação de senha ;)"
      />
      <CustomTextInput
        placeholder={"Email"}
        setText={(value) => {
          setEmail(value);
        }}
        value={email}
      />
      <View style={styles.buttons}>
        <TextButton onPressHandler={passwordReset} text="Ih, lembrei!" />
        <CustomButton
          label={"Recuperar"}
          onClickHandler={passwordReset}
          alignment="end"
        />
      </View>
      <Text>{validationMessage}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ForgetPassword;
