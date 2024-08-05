import {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getRoutes } from '@cruds/route';
import Screen from '@/components/layout/Screen';
import { Red, White } from '@assets/colors';
import CustomButton from '@/components/inputs/CustomButton';
import { deleteRoute } from '@cruds/route';
import gs from '@/globalStyles';
import { SnackbarContext } from '@contexts/snackbarContext';
import RouteCard from '@/components/layout/RouteCard';
import { useIsFocused } from '@react-navigation/native';

const Route = ({route, deleteHandler}) => {
    function convertIntentions() {
        let converted = [];
        let dictionary = {
            'receive_ride': 'Recebe carona',
            'offer_ride': 'Oferece carona',
            'split_app': 'Divide aplicativo',
            'bus_pal': 'Companhia de busão',
        }

        route.intentions.forEach((intention) => {
            converted.push(dictionary[intention]);
        });

        return converted;
    }

    return (
        <RouteCard
            route={route}
            intentions={convertIntentions()}
            buttons={
                <View style={styles.button}>
                    <CustomButton label="Remover rota" onClickHandler={() => deleteHandler(route)} bgColor={Red} txColor={White}/>
                </View>
            }
        />
    );
}

const RoutesScreen = ({ navigation }) => {
    const [routes, setRoutes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { showSnackbar } = useContext(SnackbarContext);
    const isFocused = useIsFocused();

    // Carrega as rotas de um usuário quando a tela é focada
    useEffect(() => {
        if(!isFocused){
            setRoutes([]);
            return;
        }
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
      }, [isFocused, refresh]);
  

    async function handleDelete(route) {
        try{
            await deleteRoute(route);
            showSnackbar("Rota removida!");
            setRefresh(!refresh);
        } catch (error) {
            console.log("Erro ao atualizar status da parceria" + error);
            showSnackbar(error.message);
        }
    }

    return (
        <Screen title={"Minhas rotas"}>
            <Text style={gs.regularText}>Clique nas rotas para ver mais detalhes</Text>
            <View style={styles.mainContent}>
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
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        gap: 10
    },
    mainContent: {
        paddingTop: 20
    }
});

export default RoutesScreen;