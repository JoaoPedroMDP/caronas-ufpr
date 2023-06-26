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
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{headerRight: headerButton}}/>
            <Drawer.Screen name="NewPassword" component={NewPasswordScreen} />
            <Drawer.Screen name="FirstAccessScreen" component={FirstAccessScreen} options={{headerRight: headerButton}}/>
            <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
            <Drawer.Screen name="RegisterRoute" component={RegisterRouteScreen} options={{headerRight: headerButton}}/>
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Drawer.Navigator>
  );
}

export default RootNavigator;