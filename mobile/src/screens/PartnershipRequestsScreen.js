import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { listPartnershipRequests } from '../cruds/partnership';
import Screen from '../components/layout/Screen';
import { Text, Pressable, StyleSheet, View, UIManager, Platform, FlatList} from 'react-native';
import { Black, DarkGray, LightGray, MediumGray} from '../../assets/colors';
import CustomButton from '../components/inputs/CustomButton';
import { getFormattedTime } from '../contrib';
import { changePartnershipStatus } from '../cruds/partnership';
import { Snackbar, Portal } from 'react-native-paper';


const PartnershipRequest = ({ request, changeStatusHandler }) => {
    const [pressed, setPressed] = useState(false);

    function handlePress() {
        setPressed(!pressed);
    }

    function convertIntentions(intentions) {
        let converted = [];
        let dictionary = {
            'receive_ride': 'Receber carona',
            'offer_ride': 'Oferecer carona',
            'split_app': 'Dividir aplicativo',
            'bus_pal': 'Companhia de busão',
        }

        intentions.forEach((intention) => {
            converted.push(dictionary[intention]);
        });

        return converted;
    }

    if(!request) {
        return;
    }

    let intentions_str = convertIntentions(request.route.intentions).join(', ');

    return (
        <Pressable onPress={handlePress} style={styles.requests}>
            <Text style={styles.requestantName}> {request.requestant.name} </Text>
            {pressed &&
                <View>
                    <Text style={styles.regularText}>{request.route.name}</Text>
                    <View style={styles.infos}>
                        <Text style={[styles.intentions]}>{intentions_str}</Text>
                        <Text style={[styles.regularText]}>{getFormattedTime(request.route.arrive_time)}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <CustomButton label="Recusar" onClickHandler={() => {changeStatusHandler(request, 'REJECTED')}} small={true} bgColor={MediumGray} txColor={Black}/>
                        <CustomButton label="Aceitar" onClickHandler={() => {changeStatusHandler(request, 'ACCEPTED')}} small={true}/>
                    </View>
                </View> 
            }
        </Pressable>
    );
}

const PartnershipRequestsScreen = ({ navigation }) => {
    const [refresh, setRefresh] = useState(false);
    const [validationMessage, setValidationMessage] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchRequests() {
            let result = await listPartnershipRequests();
            setRequests(result);
        }
        fetchRequests();
    }, [refresh]);

    async function changeStatus(request, status) {
        try{
            await changePartnershipStatus(request, status);
            setValidationMessage("Status da parceria atualizado com sucesso!");
            setShowSnackbar(true);
            setRefresh(!refresh);
        } catch (error) {
            console.log("Erro ao atualizar status da parceria" + error);
            setValidationMessage(error.message);
            setShowSnackbar(true);
        }
    }

    return(
        <Screen title="Pedidos de parceria">
            <View style={styles.requestsSection}>
                {requests.length === 0 && <Text style={styles.regularText}>Você ainda não possui pedidos de parcerias</Text>}
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return(
                            <PartnershipRequest request={item} changeStatusHandler={changeStatus} />
                        );
                    }}
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
    requests: {
        backgroundColor: LightGray,
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    requestsSection: {
        marginTop: 20,
    },
    requestantName: {
        fontFamily: "InterBold",
        fontSize: 20,
        textAlign: 'center'
    },
    intentions: {
        fontFamily: "InterRegular",
        fontSize: 15,
        color: DarkGray,
        marginTop: 10,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        gap: 10
    },
    regularText: {
        fontFamily: "InterRegular",
        fontSize: 20,
        marginTop: 10,
        color: DarkGray
    },
    infos: {
        display: 'flex',
        flexDirection: 'row', 
        flexGrow: 1,
        justifyContent: 'space-between',
    }
});

export default PartnershipRequestsScreen;