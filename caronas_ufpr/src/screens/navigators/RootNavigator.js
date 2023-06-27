import HomeScreen from "../HomeScreen";
import RegisterScreen from "../RegisterScreen";
import NewPasswordScreen from "../NewPasswordScreen";
import FirstAccessScreen from "../FirstAccessScreen";
import ForgetPassword from "../ForgetPassword";
import LoginScreen from "../LoginScreen";
import RegisterRouteScreen from "../RegisterRouteScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';
import EditProfileScreen from "../EditProfileScreen";
import LogoutButton from '../../components/logout/LogoutButton';
import auth from '../../firebase/FireBaseConfig';
const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const headerButton = () => {
    return (
      <LogoutButton />
    );
  }

  const [isSignedIn, setIsSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    const userExists = !!user;
    if (userExists !== isSignedIn) {
      setIsSignedIn(userExists);
    }
  });

  return (
      <Drawer.Navigator>
        {isSignedIn ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} options={{headerRight: headerButton}}/>
            <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} options={{headerRight: headerButton, title: "Início"}} />
            <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} options={{headerRight: headerButton, title: "Cadastrar Rota"}}/>
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{headerRight: headerButton, title: "Alterar Cadastro"}}/>
            <Drawer.Screen name="NewPassword" component={NewPasswordScreen} options={{title: "Nova Senha"}}/>
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
            <Drawer.Screen name="ForgetPassword" component={ForgetPassword} options={{title: "Recuperar Senha"}} />
          </>
        )}
      </Drawer.Navigator>
  );
}

export default RootNavigator;