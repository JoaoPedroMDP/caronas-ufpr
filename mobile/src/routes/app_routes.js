import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import FirstAccessScreen from "../screens/FirstAccessScreen";
import RegisterRouteScreen from "../screens/RegisterRouteScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ResultProfileScreen from '../screens/ResultProfileScreen';
import PartnershipsScreen from '../screens/PartnershipsScreen';
import PartnershipRequestsScreen from '../screens/PartnershipRequestsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import MyRoutesScreen from '../screens/MyRoutesScreen';
import { Image, Pressable, StyleSheet } from 'react-native';
import env from '../../env';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
  
const AppRoutes = () => {
  const {user, doLogout} = useContext(AuthContext);
  var screenTitles = "Olá, " + user.name + "!";

  const handleLogout = async () => {
    try {
      await doLogout();
      console.log('Logout realizado com sucesso.');
    } catch (error) {
      console.log('Erro ao realizar logout:', error);
    }
  };

  function drawerContent(props){
    return(
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sair" onPress={handleLogout} />
      </DrawerContentScrollView>
    )
  }
  
  function sourceImage(){
    if(user.photo){
      return {uri: env.back_end+user.photo};
    }else {
      return require("../../assets/images/profile.png");
    }
  }
  
  const profile = () => (
    <Image source={sourceImage()} style={styles.image} />
  );
  
  function Home(){
    return(
      <Drawer.Navigator initialRouteName="Home" drawerContent={drawerContent}>
          <Drawer.Screen name="Início" component={HomeScreen} options={{
            headerTitle: "",
            headerRight: profile
          }} />
          
          <Drawer.Screen name='Cadastrar Rota' component={RegisterRouteScreen} options={{
            headerTitle: screenTitles,
            headerRight: profile
          }} />
          <Drawer.Screen name="Minhas rotas" component={MyRoutesScreen} options={{
            headerTitle: screenTitles,
            headerRight: profile
          }} />
          
          <Drawer.Screen name='Parcerias' component={PartnershipsScreen} options={{
            headerTitle: screenTitles,
            headerRight: profile
          }} />
          <Drawer.Screen name='Pedidos de Parceria' component={PartnershipRequestsScreen} options={{
            headerTitle: screenTitles,
            headerRight: profile
          }} />
          
          <Drawer.Screen name="Perfil" component={ProfileScreen} options={{
            headerTitle: screenTitles,
          }} />

          
          <Drawer.Screen name="Instruções" component={FirstAccessScreen} options={{
            headerTitle: screenTitles,
            headerRight: profile
          }} />
      </Drawer.Navigator>
    );
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name="HomeRoutes" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Resultado" component={ResultProfileScreen} options={{title: "Resultado"}} />
      <Stack.Screen name="Parceiro" component={ProfileScreen} options={{title: "Parceiro"}} />
      <Stack.Screen name="Editar Perfil" component={EditProfileScreen} options={{title: "Editar Perfil"}}/>
    </Stack.Navigator>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 42,
    height: 42,
    marginRight: 15,
    borderRadius: 21,
  },
});

export default AppRoutes;