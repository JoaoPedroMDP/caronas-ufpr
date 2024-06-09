import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import RequestPasswordResetScreen from '@screens/passwordResetScreens/RequestPasswordResetScreen';
import ResetPasswordScreen from '@screens/passwordResetScreens/ResetPasswordScreen';
import FirstAccessScreen from '@screens/FirstAccessScreen';

const Stack = createStackNavigator();

const AuthRoutes = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
        <Stack.Screen name="Resetar senha" component={RequestPasswordResetScreen} options={{ title: "Recuperar Senha" }} />
        <Stack.Screen name="Definir nova senha" component={ResetPasswordScreen} options={{ title: "Definir nova senha" }} />
        <Stack.Screen name="Cadastrar-se" component={RegisterScreen} options={{ title: "Cadastrar" }}/>
        <Stack.Screen name="Instruções" component={FirstAccessScreen} options={{ title: "Cadastrar" }}/>
  </Stack.Navigator>
);

export default AuthRoutes;