import { Image, Text, StyleSheet, View } from 'react-native';
import Screen from '../components/layout/Screen';
import { getImage } from '../components/apis/caronasApi';
import Title from '../components/textual/Title';
import Subtitle from '../components/textual/Subtitle';
import { LightGray } from '../../assets/colors';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

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
});

const ProfileScreen = ({ route, navigation }) => {
    const {user} = useContext(AuthContext);

    return(
        <Screen full>
            {route.params?.user.photo != null && 
                <Image source={{ uri: getImage(route.params?.user.photo) }} style={styles.image} />
            }
            <Title title={route.params?.user.name} centralized expand />
            <Subtitle subtitle={"Contato: " + route.params?.user.contact} centralized />
            <View style={styles.bioBox}>
                <Text>{route.params?.user.bio ?? "Este usuário não possui bio"}</Text>
            </View>
        </Screen>
    );
}

export default ProfileScreen;