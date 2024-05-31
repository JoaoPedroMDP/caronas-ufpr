import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPassword from '../screens/ForgetPassword';

const Drawer = createDrawerNavigator();

const AuthRoutes = () => (
  <Drawer.Navigator>
        <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
        <Drawer.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: "Recuperar Senha" }} />
  </Drawer.Navigator>
);

export default AuthRoutes;