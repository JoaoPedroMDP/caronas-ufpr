import Screen from '../components/layout/Screen';
import ListPicker from '../components/inputs/ListPicker';
import { useFocusEffect } from '@react-navigation/native';
import { getRoutes, getUsersByRoute } from '../components/apis/caronasApi';
import { useCallback, useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Section from '../components/layout/Section';
import CustomButton from '../components/inputs/CustomButton';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '../firebase/FireBaseConfig';

const Drawer = createDrawerNavigator();

const IntentionSection = ({intention, users, navigation}) => {
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
                  navigation.navigate("ResultProfile", {user: item.user});
                }}
              />
          );
        }}
      />
    </Section>
  );
}

const HomeScreen = ({navigation}) => {
    const [routes, setRoutes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [intentions, setIntentions] = useState([]);
    
    useFocusEffect(
        useCallback(() => {
          async function fetchData () {
            let allRoutes = [];
            try{
                allRoutes = await getRoutes();
            }catch(error){
                activateSnackbar(error.message, 5000);
            }
            let formatted = [];
            allRoutes.forEach((route) => {
              formatted.push({
                ...route,
                label: route.name,
                key: route.id,
              });
            });
            setRoutes(formatted);
          };

          fetchData();
        }, []));
    
    function fetchRouteUsers(route) {
      setSelectedRoute(route);
      
    }

    useEffect(() => {
      async function getRouteUsers(){
        let users = await getUsersByRoute(selectedRoute.id);
        setUsers(users);
      }
      
      if(selectedRoute) {
        getRouteUsers();
      }

    }, [selectedRoute]);

    const user = auth.currentUser;
    const displayName = user.displayName;

    if(displayName === null){
      auth.signOut();
    }

    return(
        <Screen title={`Olá, ${displayName}`}>
            <ListPicker value={selectedRoute?.name} list={routes} returnValue={fetchRouteUsers}/>
            {users.length > 0 && 
              <View>
                <IntentionSection 
                  intention="Oferecem carona"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("offer_ride"))}
                />
                <IntentionSection
                  intention="Precisam de carona"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("receive_ride"))}
                />
                <IntentionSection
                  intention="Racham aplicativo"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("split_app"))}
                />
                <IntentionSection
                  intention="Companhia de busão"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("bus_pal"))}
                />
              </View>
            }
        </Screen>
    );
}


export default HomeScreen;