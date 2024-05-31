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

  function Home(){
    return(
      <Drawer.Navigator initialRouteName="Home" drawerContent={drawerContent}>
          <Drawer.Screen name="Minhas rotas" component={MyRoutesScreen} options={{headerTitle: screenTitles}} />
          <Drawer.Screen name='Parcerias' component={PartnershipsScreen} options={{headerTitle: screenTitles}} />
          <Drawer.Screen name='Pedidos de Parceria' component={PartnershipRequestsScreen} options={{headerTitle: screenTitles}} />
          <Drawer.Screen name="Início" component={HomeScreen} options={{headerTitle: ""}} />
          <Drawer.Screen name='Registrar Rota' component={RegisterRouteScreen} options={{headerTitle: screenTitles}} />
          <Drawer.Screen name="Instruções" component={FirstAccessScreen} options={{headerTitle: screenTitles}} />
          <Drawer.Screen name="Editar Perfil" component={EditProfileScreen} options={{headerTitle: screenTitles}} />
      </Drawer.Navigator>
    );
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name="HomeRoutes" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Resultado" component={ResultProfileScreen} options={{title: "Resultado"}} />
      <Stack.Screen name="Perfil" component={ProfileScreen} options={{title: "Perfil"}} />
    </Stack.Navigator>
  );
};

export default AppRoutes;

