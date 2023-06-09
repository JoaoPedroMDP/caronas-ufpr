import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/layout/Screen";
import { useCallback } from "react";
import { getUserByFirebaseId } from "../components/apis/caronasApi";
import { useState } from "react";
import CustomSnackbar from "../components/layout/CustomSnackbar";
import { Image, View, StyleSheet, Platform } from "react-native";
import { getImage, updateUser } from "../components/apis/caronasApi";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import auth from '../firebase/FireBaseConfig';

const imageOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    selectionLimit: 1
  }

const styles = StyleSheet.create({
    image: {
        width: "30vw",
        height: "30vw",
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
    const firebaseId = auth.currentUser.uid;

    useFocusEffect(useCallback(() => {
        async function fetchData() {
            try {
                const user = await getUserByFirebaseId(firebaseId);
                console.log(user);
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
            console.log(result);
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
            console.log(error);
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