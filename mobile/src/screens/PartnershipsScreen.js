import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { listPartnerships } from '../cruds/partnership';
import Screen from '../components/layout/Screen';
import { ScrollView, FlatList, Text, View, StyleSheet } from 'react-native';
import CustomButton from '../components/inputs/CustomButton';
import SubTitle from '../components/textual/Subtitle';
import gs from '../globalStyles';

const RoutePartnerships = ({ currentUser, route, partners, navigation}) => {

  function seePartner(partnership){
    let part = getPartner(partnership);
    navigation.navigate('Perfil', {user: part});
  }

  function getPartner(partnership){
    if(partnership.requested.id == currentUser.id){
      return partnership.requestant;
    }

    return partnership.requested;
  }

  return(
    <View>
      <Text style={styles.routeName}>{route.name}</Text>
      <FlatList
        data={partners}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <CustomButton key={item.id} label={getPartner(item).name} onClickHandler={() => {seePartner(item)}} inverted={true}/>
          );
        }}
      />
    </View>
  );
}



const PartnershipsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [partnerships, setPartnerships] = useState({});
  
  useEffect(() => {
    async function fetchPartnerships() {
      let result = await listPartnerships();
      let segregatedByRoute = {};

      result.forEach((partnership) => {
        const routeId = partnership.route.id;
        if (!segregatedByRoute[routeId]) {
          segregatedByRoute[routeId] = {
            route: partnership.route,
            partners: []
          };
        }
        segregatedByRoute[routeId].partners.push(partnership);
      });

      setPartnerships(segregatedByRoute);
    }

    fetchPartnerships();
  }, []);

  return (
    <Screen title="Parcerias">
      {Object.keys(partnerships).length === 0 ? 
        <SubTitle subtitle="Você ainda não fez nenhuma parceria! 🙁 Cadastre uma rota e a selecione na tela inicial para ver potenciais parcerias :D" />
        : <SubTitle subtitle="Para ver o contato de seus parceiros, é só clicar no nome deles ;)" />}
      <View style={styles.partnerships}>
        {Object.keys(partnerships).map((routeId) => {
          const { route, partners } = partnerships[routeId];
          return <RoutePartnerships key={route.id} currentUser={user} route={route} partners={partners} navigation={navigation} />
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  routeName: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "InterBold"
  },
  partnerText: {
    fontSize: 16,
    marginBottom: 5
  },
  partnerships: {
    marginTop: 20
  }
});

export default PartnershipsScreen;
