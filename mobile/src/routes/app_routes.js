import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import FirstAccessScreen from "../screens/FirstAccessScreen";
import RegisterRouteScreen from "../screens/RegisterRouteScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LogoutButton from "../components/logout/LogoutButton";
import ResultProfileScreen from '../screens/ResultProfileScreen';

const Drawer = createDrawerNavigator();

const headerButton = () => {
    return (
      <LogoutButton />
    );
  };

const AppRoutes = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} options={{headerRight: headerButton, title: "Cadastrar Rota"}} />
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerRight: headerButton, title: "Início"}} />
        <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} options={{headerRight: headerButton, title: "Instruções"}} />
        <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{headerRight: headerButton, title: "Alterar Cadastro"}} />
        <Drawer.Screen name="ResultProfileScreen" component={ResultProfileScreen} options={{headerRight: headerButton, title: "Resultado"}} />

    </Drawer.Navigator>
);

export default AppRoutes;

