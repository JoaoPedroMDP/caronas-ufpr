import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import CustomButton from "../../components/inputs/CustomButton";
import Screen from "../../components/layout/Screen";
import SubTitle from "../../components/textual/Subtitle";
import Comment from "../../components/textual/Comment";
import TextButton from "../../components/inputs/TextButton";
import { requestPasswordReset } from "../../cruds/auth";
import { SnackbarContext } from "../../contexts/snackbarContext";
import gs from "../../globalStyles";


const RequestPasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { showSnackbar } = useContext(SnackbarContext);

  async function passwordReset() {
    if (email) {
      try{
        let response = await requestPasswordReset(email);
        console.log(response.status);
        if(response.status == 200){
          navigation.navigate("Definir nova senha");
        }
      }catch(e){
        showSnackbar(e.message);
      }
    } else {
      showSnackbar("Por favor, insira um endereço de email válido.");
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
      <View style={[gs.flexRow, gs.alignCenter, gs.justifyBetween, {marginTop: 10}]}>
        <TextButton onPressHandler={() => {navigation.navigate("Login")}} text="Lembrei!" />
        <CustomButton
          label={"Recuperar"}
          onClickHandler={passwordReset}
        />
      </View>
    </Screen>
  );

};

const styles = StyleSheet.create({
  validation: {
    color: "red",
  }
});

export default RequestPasswordReset;
