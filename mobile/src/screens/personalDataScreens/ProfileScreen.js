import { Image, Text, StyleSheet, View } from 'react-native';
import Screen from '@/components/layout/Screen';
import { getImage } from '../../contrib';
import Title from '@/components/textual/Title';
import Subtitle from '@/components/textual/Subtitle';
import { LightGray } from '../../../assets/colors';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@contexts/authContext';
import CustomButton from '@/components/inputs/CustomButton';

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center",
        marginBottom: 20,
    },
    bioBox: {
        borderRadius: 10,
        backgroundColor: LightGray,
        padding: 10,
        marginTop: 20,
    },
    editProfileButton: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 10
    }
});

const ProfileScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    let photo = user ? user.photo : getImage(user.photo)
    let bio = user.bio == null || user.bio == "" ? "Você não possui bio" : user.bio;
    return(
        <Screen full>
            {user.photo != null && 
                <Image source={{ uri: photo }} style={styles.image} />
            }
            <Title title={user.name} centralized expand />
            <Subtitle subtitle={"Contato: " + user.contact} centralized />
            <View style={styles.bioBox}>
                <Text>{bio}</Text>
            </View>
            <View style={styles.editProfileButton}>
                <CustomButton label={"Editar perfil"} onClickHandler={() => navigation.navigate("Editar Perfil")} />
            </View>
        </Screen>
    );
}

export default ProfileScreen;