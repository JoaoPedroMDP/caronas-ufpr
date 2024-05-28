import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/layout/Screen";
import { useCallback } from "react";
import { getUserByFirebaseId } from "../components/apis/caronasApi";
import { useState } from "react";
import CustomSnackbar from "../components/layout/CustomSnackbar";
import { Image, View, StyleSheet} from "react-native";
import { getImage, updateUser } from "../components/apis/caronasApi";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import Comment from "../components/textual/Comment";
import { vw } from "../consts";

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
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [validationMessage, setValidationMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [contact, setContact] = useState("");
    // Photo é o que vem do backend
    const [photo, setPhoto] = useState(null);
    const [newPhoto, setNewPhoto] = useState(null);

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = await getUserByFirebaseId();
                setUser(user);
                setName(user.name);
                setBio(user.bio);
                setContact(user.contact);
                setPhoto(user.photo);
            } catch (error) {
                setValidationMessage(error.message);
                setShowSnackbar(true);
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
            setNewPhoto(result.assets[0].uri);
        }
    }

    function sourceImage(){
        if(newPhoto){
            return {uri: newPhoto};
        } else if(photo) {
            return {uri: getImage(photo)};
        }else {
            return require("../../assets/images/profile.png");
        }
    }

    async function update(){
        let user_data = {
            name: name,
            bio: bio,
            contact: contact,
        };

        if(newPhoto){
            user_data.photo = newPhoto;
        }

        try {
            await updateUser(user_data, user.id);
            setValidationMessage("Perfil atualizado!!");
            setShowSnackbar(true);
        } catch (error) {
            console.log("Erro ao atualizar usuário:" + error);
            setValidationMessage(error.message);
            setShowSnackbar(true);
        }
    }

    return(
        <Screen title="Alterar cadastro" centralized>
            <View style={styles.imageSection}>
                <Image source={sourceImage()} style={styles.image} />
                <CustomButton alignment="center" label="Alterar foto" onClickHandler={selectImage} />
            </View>

            <CustomTextInput placeholder="Nome" text={name} setText={setName} />
            <CustomTextInput placeholder="Contato" text={contact} setText={setContact} />
            <CustomTextInput placeholder="Biografia" text={bio} setText={setBio} bigText />
            <Comment comment="Para alterar a senha, clique em 'Esqueci a senha' na tela de login :D"/>
            <View>
                <CustomButton alignment="end" label="Alterar" onClickHandler={update} />
            </View>
            <CustomSnackbar 
                externalOpen={showSnackbar}
                message={validationMessage}
                timeout={5000}
            />
        </Screen>
    );
}

export default EditProfileScreen;