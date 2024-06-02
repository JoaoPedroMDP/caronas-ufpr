import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/layout/Screen";
import { useCallback, useContext } from "react";
import { useState } from "react";
import { Image, View, StyleSheet} from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import { vw } from "../consts";
import { AuthContext } from "../contexts/authContext";
import { updateUser } from "../cruds/user";
import env from "../../env";
import { SnackbarContext } from "../contexts/snackbarContext";

const imageOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    selectionLimit: 1
  }

const styles = StyleSheet.create({
    image: {
        width: vw / 3,
        height: vw / 3,
        borderRadius: 100,
        alignSelf: "center",
        marginBottom: 20,
    },
    imageSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
});

const EditProfileScreen = ({ navigation }) => {
    const {user, refreshUser} = useContext(AuthContext);
    const { showSnackbar } = useContext(SnackbarContext);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    // Photo é o que vem do backend
    const [photo, setPhoto] = useState(null);
    const [newPhoto, setNewPhoto] = useState({});

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                setName(user.name);
                setBio(user.bio);
                setContact(user.contact);
                setPhoto(user.photo);
                setEmail(user.email);
            } catch (error) {
                showSnackbar(error.message, 2000);
            }
        }

        fetchData();
    }, []));

    async function selectImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

        if (!result.canceled) {
            console.log(result)
            setNewPhoto(result.assets[0]);
        }
    }

    function getImage(partialUrl){
        console.log(partialUrl);
        return `${env.back_end}${partialUrl}`;
    }

    function sourceImage(){
        if('uri' in newPhoto){
            return {uri: newPhoto.uri};
        } else if(photo) {
            return {uri: getImage(photo)};
        }else {
            return require("../../assets/images/profile.png");
        }
    }

    async function update(){
        let form_data = new FormData();
        if (name != "") {
            form_data.append('name', name);
        }

        if (bio != "") {
            form_data.append('bio', bio);
        }

        if (contact != "") {
            form_data.append('contact', contact);
        }

        if (email != "") {
            form_data.append('email', email);
        }

        if('uri' in newPhoto){
            form_data.append('photo', {
                uri: newPhoto.uri,
                name: user.name + "." + newPhoto.fileName.split(".").at(-1),
                type: newPhoto.mimeType
            });
        }

        if(newPassword && newPassword != "" && newPassword == newPasswordConfirm){
            form_data.append('password', newPassword);
        }

        try {
            await updateUser(form_data, user.id);
            showSnackbar("Perfil atualizado!!", 2000);
            await refreshUser();
            navigation.navigate("Início");
        } catch (error) {
            console.log("Erro ao atualizar usuário:" + error);
            showSnackbar(error.message, 2000);
        }
    }

    return(
        <Screen title="Alterar cadastro" centralized>
            <View style={styles.imageSection}>
                <Image source={sourceImage()} style={styles.image} />
                <CustomButton alignment="center" label="Alterar foto" onClickHandler={selectImage} />
            </View>

            <CustomTextInput placeholder="Email" text={email} setText={setEmail} />
            <CustomTextInput placeholder="Nome" text={name} setText={setName} />
            <CustomTextInput placeholder="Contato" text={contact} setText={setContact} />
            <CustomTextInput placeholder="Biografia" text={bio} setText={setBio} bigText />
            <CustomTextInput placeholder="Senha" text={newPassword} setText={setNewPassword} />
            <CustomTextInput placeholder="Confirmação de Senha" text={newPasswordConfirm} setText={setNewPasswordConfirm} />
            
            <View>
                <CustomButton alignment="end" label="Alterar" onClickHandler={update} />
            </View>
        </Screen>
    );
}

export default EditProfileScreen;