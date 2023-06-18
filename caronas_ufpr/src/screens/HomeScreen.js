import Screen from '../components/layout/Screen';
import ListPicker from '../components/inputs/ListPicker';
import { useFocusEffect } from '@react-navigation/native';
import { getRoutes } from '../components/apis/caronasApi';
import { useCallback, useState } from 'react';
import { Text } from 'react-native';


const HomeScreen = ({navigation}) => {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useFocusEffect(
        useCallback(() => {
          let isActive = true;
      
          const fetchData = async () => {
            let allRoutes = await getRoutes();
            allRoutes = allRoutes.map((route) => {
                route.label = route.name;
                route.key = route.id;
                return route;
            })
            setRoutes(allRoutes);
            console.log(routes);
          };
      
          fetchData();
      
          return () => {
            isActive = false;
          };
        }, [])
      );
    
    function fetchRouteUsers(route) {
      setSelectedRoute(route);
      
    }

    return(
        <Screen title={"Olá, Fulano!"}>
            <ListPicker items={routes} returnValue={fetchRouteUsers}/>
            <Text>{selectedRoute?.name}</Text>
        </Screen>
    );
}


export default HomeScreen;