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

const ProfileScreen = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);

    let isLoggedUser = route.params?.user == null;
    let userToShow = route.params?.user ?? user;
    let photo = route.params?.user ? route.params?.user.photo : getImage(user.photo) 
    return(
        <Screen full>
            {userToShow.photo != null && 
                <Image source={{ uri: photo }} style={styles.image} />
            }
            <Title title={userToShow.name} centralized expand />
            <Subtitle subtitle={"Contato: " + userToShow.contact} centralized />
            <View style={styles.bioBox}>
                <Text>{userToShow.bio ?? "Este usuário não possui bio"}</Text>
            </View>
            {isLoggedUser && 
            <View style={styles.editProfileButton}>
                <CustomButton label={"Editar perfil"} onClickHandler={() => navigation.navigate("Editar Perfil")} />
            </View>
            }
        </Screen>
    );
}

export default ProfileScreen;