import Screen from '../components/layout/Screen';
import ListPicker from '../components/inputs/ListPicker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useEffect, useContext } from 'react';
import { FlatList, View } from 'react-native';
import Section from '../components/layout/Section';
import CustomButton from '../components/inputs/CustomButton';
import { AuthContext } from '../contexts/authContext';
import { getRoutes } from '../cruds/route';
import { getUsersByRoute } from '../cruds/user';
import SubTitle from '../components/textual/Subtitle';


const IntentionSection = ({intention, users, navigation, route}) => {
  if(users.length == 0) return null;

  return(
    <Section title={intention}>
      <FlatList
        horizontal={true}
        data={users}
        keyExtractor={(item) => item.user.id.toString()}
        ItemSeparatorComponent={() => <View style={{width: 10}}/>}
        renderItem={({item}) => {
          return(
              <CustomButton 
                label={item.user.name}
                onClickHandler={() => {
                  navigation.navigate("Resultado", {user: item.user, route: route});
                }}
              />
          );
        }}
      />
    </Section>
  );
}

const HomeScreen = ({navigation}) => {
    const { user } = useContext(AuthContext);
    const [routes, setRoutes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

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
    }, []));

    // Carrega os usuários que fazem a mesma rota que o usuário quando este seleciona uma rota no ListPicker
    useEffect(() => {
      async function getRouteUsers(){
        let users = await getUsersByRoute(selectedRoute.id);
        setUsers(users);
      }
      
      if(selectedRoute) {
        getRouteUsers();
      }

    }, [selectedRoute]);

    return(
        <Screen title={`Olá, ${user.name}`}>
            {routes.length > 0 ? 
                <ListPicker value={selectedRoute?.name} list={routes} returnValue={setSelectedRoute}/>
                : <SubTitle subtitle={"Você ainda não cadastrou nenhuma rota! 😱"} />
            }
            {users.length > 0 && 
              <View>
                <IntentionSection 
                  intention="Oferecem carona"
                  navigation={navigation}
                  route={selectedRoute}
                  users={users.filter((user) => user.intentions.includes("offer_ride"))}
                />
                <IntentionSection
                  intention="Precisam de carona"
                  navigation={navigation}
                  route={selectedRoute}
                  users={users.filter((user) => user.intentions.includes("receive_ride"))}
                />
                <IntentionSection
                  intention="Racham aplicativo"
                  navigation={navigation}
                  route={selectedRoute}
                  users={users.filter((user) => user.intentions.includes("split_app"))}
                />
                <IntentionSection
                  intention="Companhia de busão"
                  navigation={navigation}
                  route={selectedRoute}
                  users={users.filter((user) => user.intentions.includes("bus_pal"))}
                />
              </View>
            }
        </Screen>
    );
}

export default HomeScreen;