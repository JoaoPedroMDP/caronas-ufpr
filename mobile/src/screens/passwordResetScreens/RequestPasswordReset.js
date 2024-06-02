import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import CustomButton from "../../components/inputs/CustomButton";
import Screen from "../../components/layout/Screen";
import SubTitle from "../../components/textual/Subtitle";
import Comment from "../../components/textual/Comment";
import TextButton from "../../components/inputs/TextButton";
import { Snackbar, Portal } from "react-native-paper";
import { requestPasswordReset } from "../../cruds/auth";


const RequestPasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);

  async function passwordReset() {
    if (email) {
      try{
        let response = await requestPasswordReset(email);
        console.log(response.status);
        if(response.status == 200){
          navigation.navigate("Definir nova senha");
        }
      }catch(e){
        setValidationMessage(e.message);
        setShowSnackbar(true);
      }
    } else {
      setValidationMessage("Por favor, insira um endereço de email válido.");
      setShowSnackbar(true);
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
        <TextButton onPressHandler={() => {navigation.navigate("Login")}} text="Lembrei!" />
        <CustomButton
          label={"Recuperar"}
          onClickHandler={passwordReset}
          alignment="end"
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  validation: {
    color: "red",
  }
});

export default RequestPasswordReset;
