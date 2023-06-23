import { Text } from 'react-native';
import Screen from '../components/layout/Screen';

const ResultProfileScreen = ({ route, navigation }) => {
    return(
        <Screen title={route.params?.user.name}>
            <Text>{route.params?.user.bio ?? "Este usuário não possui bio"}</Text>
        </Screen>
    );
}

export default ResultProfileScreen;