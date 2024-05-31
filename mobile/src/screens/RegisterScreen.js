import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import Screen from "../components/layout/Screen";
import CustomButton from "../components/inputs/CustomButton";
import { Portal, Snackbar } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { vw } from "../consts";
import { createUser } from "../cruds/user";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmal, setPasswordConfirmal] = useState("");
  const [name, setName] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState(null);

  async function handleRegister() {
    if(!name || !email || !password || !passwordConfirmal || !contact){
      setValidationMessage("Preencha todos os campos obrigatórios.");
      setShowSnackbar(true);
      return;
    }

    if(password != passwordConfirmal){
      setValidationMessage("As senhas não coincidem.");
      setShowSnackbar(true);
      return;
    }
    
    let user_data = {
      name: name,
      email: email,
      password: password,
      contact: contact,
      bio: bio,
      photo: photo
    }

    try {
      await createUser(user_data);
      setValidationMessage("Cadastro realizado com sucesso!");
      setShowSnackbar(true);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro no cadastro" + error);
      setValidationMessage(error.message);
      setShowSnackbar(true);
    }
  }

  async function selectImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
        setPhoto(result.assets[0].uri);
    }
  }

  function sourceImage(){
    if(photo){
        return {uri: photo};
    }else {
        return require("../../assets/images/profile.png");
    }
  }

  return (
    <Screen title="Cadastro" centralized>
      <View style={styles.imageSection}>
        <Image source={sourceImage()} style={styles.image} />
        <CustomButton alignment='center' label="Cadastrar foto" onClickHandler={selectImage} />
      </View>
      <CustomTextInput placeholder="Nome" text={name} setText={(value) => setName(value)} />
      <CustomTextInput placeholder="Email" text={email} setText={(value) => setEmail(value)} />
      <CustomTextInput 
        placeholder="Senha" 
        text={password} 
        setText={(value) => setPassword(value)}
        secureTextEntry
      />
      <CustomTextInput 
        placeholder="Confirme a senha" 
        text={passwordConfirmal} 
        setText={(value) => setPasswordConfirmal(value)}
        secureTextEntry
      />

      <CustomTextInput placeholder="Contato" text={contact} setText={setContact} />
      <CustomTextInput placeholder="Biografia" text={bio} setText={setBio} bigText/>
      <View>
        <CustomButton
          label="Cadastrar"
          onClickHandler={handleRegister}
          alignment="end"
          disabled={email === "" || password === "" || name === "" || contact === ""}
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  imageSection: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});

export default RegisterScreen;
