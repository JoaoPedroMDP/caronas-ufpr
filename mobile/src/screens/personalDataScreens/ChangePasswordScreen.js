import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "@/components/inputs/CustomTextInput";
import CustomButton from "@/components/inputs/CustomButton";
import Screen from "@/components/layout/Screen";
import SubTitle from "@/components/textual/Subtitle";
import { requestPasswordReset } from "@cruds/auth";
import { SnackbarContext } from "@contexts/snackbarContext";
import gs from "../../globalStyles";


const ChangePasswordScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const { showSnackbar } = useContext(SnackbarContext);

  async function requestPasswordChange() {
    if (email) {
      try{
        let response = await requestPasswordReset(email.toLowerCase());
        console.log(response.status);
        if(response.status == 200){
          showSnackbar("Pedido feito com sucesso! Redirecionando para a alteração de senha...")
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
    <Screen title="Trocar senha" centTitle>
      <SubTitle subtitle="Insira o email que usou para se cadastrar" />
      <CustomTextInput
        placeholder={"Email"}
        setText={(value) => {
          setEmail(value);
        }}
        value={email}
        mandatory
      />
      <View style={[gs.flexRow, gs.alignCenter, gs.justifyEnd, {marginTop: 10}]}>
        <CustomButton
          label={"Recuperar"}
          onClickHandler={requestPasswordChange}
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

export default ChangePasswordScreen;
