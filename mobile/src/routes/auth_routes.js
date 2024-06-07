import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RequestPasswordReset from '../screens/passwordResetScreens/RequestPasswordReset';
import ResetPassword from '../screens/passwordResetScreens/ResetPassword';

const Stack = createStackNavigator();

const AuthRoutes = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
        <Stack.Screen name="Resetar senha" component={RequestPasswordReset} options={{ title: "Recuperar Senha" }} />
        <Stack.Screen name="Definir nova senha" component={ResetPassword} options={{ title: "Definir nova senha" }} />
        <Stack.Screen name="Cadastrar-se" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
  </Stack.Navigator>
);

export default AuthRoutes;