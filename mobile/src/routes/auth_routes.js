import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RequestPasswordReset from '../screens/passwordResetScreens/RequestPasswordReset';
import ResetPassword from '../screens/passwordResetScreens/ResetPassword';

const Drawer = createDrawerNavigator();

const AuthRoutes = () => (
  <Drawer.Navigator>
        <Drawer.Screen name="RequestPasswordReset" component={RequestPasswordReset} options={{ title: "Recuperar Senha" }} />
        <Drawer.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Definir nova senha" }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
  </Drawer.Navigator>
);

export default AuthRoutes;