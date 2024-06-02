import {useState, useCallback, useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { getRoutes } from '../cruds/route';
import Screen from '../components/layout/Screen';
import { DarkGray, LightGray, Red, White } from '../../assets/colors';
import { getFormattedTime } from '../contrib';
import CustomButton from '../components/inputs/CustomButton';
import { deleteRoute } from '../cruds/route';
import gs from '../globalStyles';
import { SnackbarContext } from '../contexts/snackbarContext';

const Route = ({route, deleteHandler}) => {
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

    if(!route) {
        return;
    }

    let intentions_str = convertIntentions(route.intentions).join(', ');

    return (
        <Pressable onPress={handlePress} style={styles.routes}>
            <Text style={styles.routeName}> {route.name} </Text>
            {pressed &&
                <View>
                    <Text style={styles.regularText}>{route.name}</Text>
                    <View style={styles.infos}>
                        <Text style={[styles.intentions]}>{intentions_str}</Text>
                        <Text style={[styles.regularText]}>{getFormattedTime(route.arrive_time)}</Text>
                    </View>
                    <View style={styles.button}>
                        <CustomButton label="Remover rota" onClickHandler={() => deleteHandler(route)} small={true} bgColor={Red} txColor={White}/>
                    </View>
                </View> 
            }
        </Pressable>
    );
}

const MyRoutesScreen = ({ navigation }) => {
    const [routes, setRoutes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { showSnackbar } = useContext(SnackbarContext);

    // Carrega as rotas de um usuário quando a tela é focada
    useFocusEffect(useCallback(() => {
        async function fetchUserRoutes(){
          let allRoutes = await getRoutes();
          let formatted = [];
          allRoutes.forEach((route) => {
            formatted.push({
              ...route,
              label: route.name,
              key: route.id,
            });
          });
          setRoutes(formatted);
        }
  
        fetchUserRoutes();
      }, [refresh]));
  

    async function handleDelete(route) {
        try{
            await deleteRoute(route);
            showSnackbar("Rota removida!", 2000);
            setRefresh(!refresh);
        } catch (error) {
            console.log("Erro ao atualizar status da parceria" + error);
            showSnackbar(error.message, 2000);
        }
    }

    return (
        <Screen title={"Minhas rotas"}>
            <Text style={gs.regularText}>Clique nas rotas para ver mais detalhes</Text>
            <View>
                {routes.length === 0 && <Text style={gs.regularText}>Você ainda não possui rotas cadastradas.</Text>}
                <FlatList
                    data={routes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return(
                            <Route route={item} deleteHandler={handleDelete}/>
                        );
                    }}
                />
            </View>
        </Screen>
    );
};

let styles = StyleSheet.create({
    routeName: {
        fontFamily: "InterBold",
        fontSize: 20,
        textAlign: 'center'
    },
    routes: {
        backgroundColor: LightGray,
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10
    },
    infos: {
        display: 'flex',
        flexDirection: 'row', 
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    intentions: {
        fontFamily: "InterRegular",
        fontSize: 15,
        color: DarkGray,
        marginTop: 10,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        gap: 10
    },
});

export default MyRoutesScreen;