import { Image, Text, StyleSheet, View } from 'react-native';
import Screen from '../components/layout/Screen';
import { getImage } from '../components/apis/caronasApi';
import Title from '../components/textual/Title';
import { LightGray } from '../../assets/colors';
import CustomButton from '../components/inputs/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';

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

const ResultProfileScreen = ({ route, navigation }) => {
    console.log(route.params?.user);
    return(
        <Screen full>
            {route.params?.user.photo != null && 
                <Image source={{ uri: getImage(route.params?.user.photo) }} style={styles.image} />
            }
            <Title title={route.params?.user.name} centralized expand />
            <View style={styles.bioBox}>
                <Text>{route.params?.user.bio ?? "Este usuário não possui bio"}</Text>
            </View>
            <View>
                <CustomButton alignment="end" label="Copiar contato" onClickHandler={() => {Clipboard.setString(route.params?.user.contact);}}/>
            </View>
        </Screen>
    );
}

export default ResultProfileScreen;