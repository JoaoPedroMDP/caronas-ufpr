import HomeScreen from "../HomeScreen";
import RegisterScreen from "../RegisterScreen";
import FirstAccessScreen from "../FirstAccessScreen";
import ForgetPassword from "../ForgetPassword";
import LoginScreen from "../LoginScreen";
import RegisterRouteScreen from "../RegisterRouteScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import EditProfileScreen from "../EditProfileScreen";
import LogoutButton from '../../components/logout/LogoutButton';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const RootNavigator = ({ route }) => {
  const [isLogged, setIsLogged] = useState(null);

  const headerButton = () => {
    return (
      <LogoutButton />
    );
  };

  useEffect(() => {
    async function getToken(){
      let _token = await AsyncStorage.getItem('token');
      setIsLogged(_token != null);
    }

    getToken();
  }, [isLogged]);

  return (
      <Drawer.Navigator>
        {isLogged ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} options={{headerRight: headerButton, title: "Início"}}/>
            <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} options={{headerRight: headerButton, title: "Instruções"}} />
            <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} options={{headerRight: headerButton, title: "Cadastrar Rota"}}/>
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{headerRight: headerButton, title: "Alterar Cadastro"}}/>
            </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
            <Drawer.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: "Recuperar Senha" }} />
          </>
        )}
      </Drawer.Navigator>
  );
}

export default RootNavigator;