import Screen from '../components/layout/Screen';
import ListPicker from '../components/inputs/ListPicker';
import { useFocusEffect } from '@react-navigation/native';
import { getUsersByRoute } from '../components/apis/caronasApi';
import { useCallback, useState, useEffect, useContext } from 'react';
import { FlatList, View } from 'react-native';
import Section from '../components/layout/Section';
import CustomButton from '../components/inputs/CustomButton';
import CustomSnackbar from '../components/layout/CustomSnackbar';
import { AuthContext } from '../contexts/authContext';
import { getRoutes } from '../cruds/route';



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
                  navigation.navigate("ResultProfileScreen", {user: item.user});
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
    const [intentions, setIntentions] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [validationMessage, setValidationMessage] = useState(null);

    useEffect(() => {
      async function fetchUserRoutes(){
        await getRoutes()
      }

      fetchUserRoutes();
    }, []);

    return(
        <Screen title={`Olá, ${user.name}`}>
            <ListPicker value={selectedRoute?.name} list={routes} returnValue={setSelectedRoute}/>
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
            <CustomSnackbar 
                externalOpen={showSnackbar}
                message={validationMessage}
                timeout={5000}
            />
        </Screen>
    );
}


export default HomeScreen;