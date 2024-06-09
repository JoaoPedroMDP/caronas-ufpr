import React, { useContext, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomTextInput from "@/components/inputs/CustomTextInput";
import Screen from "@/components/layout/Screen";
import CustomButton from "@/components/inputs/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import { createUser } from "../cruds/user";
import { sanitizeString } from "../contrib";
import { SnackbarContext } from "@contexts/snackbarContext";
import gs from "../globalStyles";
import CustomScrollView from "@/components/layout/CustomScrollView";
import TextButton from "@/components/inputs/TextButton";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmal, setPasswordConfirmal] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState({});
  const {showSnackbar} = useContext(SnackbarContext);

  async function handleRegister() {
    if(!name || !email || !password || !passwordConfirmal || !contact){
      showSnackbar("Preencha todos os campos obrigatórios.");
      return;
    }

    if(password != passwordConfirmal){
      showSnackbar("As senhas não coincidem.");
      return;
    }
    
    let user_data = new FormData();
    user_data.append("name", name);
    user_data.append("email", email);
    user_data.append("password", password);
    user_data.append("contact", contact);
    user_data.append("bio", bio);
    if(photo.uri != undefined){
      user_data.append('photo', {
        uri: photo.uri,
        name: sanitizeString(name) + "." + sanitizeString(photo.fileName.split(".").at(-1)),
        type: photo.mimeType
      });
    }

    try {
      await createUser(user_data);
      showSnackbar("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro no cadastro" + error);
      showSnackbar(error.message);
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
    <CustomScrollView>
      <Screen title="Cadastro" centralized>
        <View style={styles.imageSection}>
          <Image source={sourceImage()} style={styles.image} />
          <CustomButton alignment='center' label="Selecionar foto" onClickHandler={selectImage} />
        </View>
        <CustomTextInput label="Nome" placeholder="Fulano da Silva" text={name} setText={(value) => setName(value)} mandatory/>
        <CustomTextInput label="Email" placeholder="fulano@ufpr.br" text={email} setText={(value) => setEmail(value)} mandatory/>
        <CustomTextInput 
          label="Senha" 
          text={password} 
          setText={(value) => setPassword(value)}
          secureTextEntry
          mandatory
        />
        <CustomTextInput 
          label="Confirme a senha" 
          text={passwordConfirmal} 
          setText={(value) => setPasswordConfirmal(value)}
          secureTextEntry
          mandatory
        />

        <CustomTextInput label="Contato" placeholder="Instagram: @foo.lano" text={contact} setText={setContact} mandatory/>
        <CustomTextInput label="Biografia" placeholder="Curso Engenharia da pesca e amo peixes (deer)" text={bio} setText={setBio} bigText/>
        <View style={[gs.flexRow, styles.button]}>
          <TextButton text={"Cancelar"} onPressHandler={() => navigation.navigate("Login")} />
          <CustomButton
            label="Cadastrar"
            onClickHandler={handleRegister}
            disabled={email === "" || password === "" || name === "" || contact === ""}
          />
        </View>
      </Screen>
    </CustomScrollView>
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
    ...gs.flexRow,
    ...gs.alignCenter,
    ...gs.justifyBetween,
    flexWrap: "wrap",
  },
  button: {
    ...gs.justifyBetween
  }
});

export default RegisterScreen;
