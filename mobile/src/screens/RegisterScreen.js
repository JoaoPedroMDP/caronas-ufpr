import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import Screen from "../components/layout/Screen";
import CustomButton from "../components/inputs/CustomButton";
import { Portal, Snackbar } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { createUser } from "../cruds/user";
import { sanitizeString } from "../contrib";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("email@email.com");
  const [password, setPassword] = useState("senha");
  const [passwordConfirmal, setPasswordConfirmal] = useState("senha");
  const [name, setName] = useState("joao pedro");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [bio, setBio] = useState("bio");
  const [contact, setContact] = useState("contato");
  const [photo, setPhoto] = useState({});

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
    
    let user_data = new FormData();
    user_data.append("name", name);
    user_data.append("email", email);
    user_data.append("password", password);
    user_data.append("contact", contact);
    user_data.append("bio", bio);
    user_data.append('photo', {
      uri: photo.uri,
      name: sanitizeString(name) + "." + sanitizeString(photo.fileName.split(".").at(-1)),
      type: photo.mimeType
    });

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
        setPhoto(result.assets[0]);
    }
  }

  function sourceImage(){
    if('uri' in photo){
        return {uri: photo.uri};
    }else {
        return require("../../assets/images/profile.png");
    }
  }

  return (
    <Screen title="Cadastro" centralized>
      <View style={styles.imageSection}>
        <Image source={sourceImage()} style={styles.image} />
        <CustomButton alignment='center' label="Selecionar foto" onClickHandler={selectImage} />
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
