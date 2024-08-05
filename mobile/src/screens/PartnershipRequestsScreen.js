import { useContext, useEffect, useState } from 'react';
import { listPartnershipRequests } from '../cruds/partnership';
import Screen from '@/components/layout/Screen';
import { Text, Pressable, StyleSheet, View, UIManager, Platform, FlatList} from 'react-native';
import { Black, DarkGray, LightGray, MediumGray} from '../../assets/colors';
import CustomButton from '@/components/inputs/CustomButton';
import { changePartnershipStatus } from '../cruds/partnership';
import { SnackbarContext } from '@contexts/snackbarContext';
import RouteCard from '@/components/layout/RouteCard';
import gs from '@/globalStyles';


const PartnershipRequest = ({ request, changeStatusHandler }) => {
    function convertIntentions() {
        let converted = [];
        let dictionary = {
            'receive_ride': 'Pede carona',
            'offer_ride': 'Oferece carona',
            'split_app': 'Divide aplicativo',
            'bus_pal': 'Companhia de busão',
        }

        request.route.intentions.forEach((intention) => {
            converted.push(dictionary[intention]);
        });

        return converted;
    }

    if(!request) {
        return;
    }

    return (
        <RouteCard 
            route={request.route}
            title={request.requestant.name}
            buttons={
                <View style={styles.buttons}>
                    <CustomButton label="Recusar" onClickHandler={() => {changeStatusHandler(request, 'REJECTED')}} bgColor={MediumGray} txColor={Black}/>
                    <CustomButton label="Aceitar" onClickHandler={() => {changeStatusHandler(request, 'ACCEPTED')}}/>
                </View>
            }
            intentions={convertIntentions()}
        />
    );
}

const PartnershipRequestsScreen = ({ navigation }) => {
    const [refresh, setRefresh] = useState(false);
    const [requests, setRequests] = useState([]);
    const { showSnackbar } = useContext(SnackbarContext);

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
            showSnackbar("Status da parceria atualizado com sucesso!");
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
            showSnackbar(error.message);
        }
    }

    return(
        <Screen title="Pedidos de parceria">
            <View style={styles.requestsSection}>
                <Text style={gs.regularText}>Sempre que alguém pedir parceria com você, aparecerá aqui</Text>
                {requests.length === 0 && <Text style={gs.regularText}>Você ainda não possui pedidos de parceria 😢</Text>}
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
        </Screen>

    );
};

const styles = StyleSheet.create({
    requestsSection: {
        marginTop: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        gap: 10
    },
});

export default PartnershipRequestsScreen;