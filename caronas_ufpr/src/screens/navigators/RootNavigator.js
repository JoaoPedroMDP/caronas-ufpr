import HomeScreen from "../HomeScreen";
import RegisterScreen from "../RegisterScreen";
import NewPasswordScreen from "../NewPasswordScreen";
import FirstAccessScreen from "../FirstAccessScreen";
import ForgetPassword from "../ForgetPassword";
import LoginScreen from "../LoginScreen";
import RegisterRouteScreen from "../RegisterRouteScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfileScreen from "../EditProfileScreen";

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
            <Drawer.Screen name="NewPassword" component={NewPasswordScreen} />
            <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} />
            <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} />
        </Drawer.Navigator>
    );
}

export default RootNavigator;