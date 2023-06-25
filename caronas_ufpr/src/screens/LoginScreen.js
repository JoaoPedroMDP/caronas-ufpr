import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";
import CustomTextInput from "../components/inputs/CustomTextInput";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        firebaseError,
    ] = useSignInWithEmailAndPassword(auth);

    function handleSignIn() {
        try {
            signInWithEmailAndPassword(email, password);
        } catch (errorCatch) {
            console.log(errorCatch);
        }
    }

    if (firebaseError) {
        return <Text>Error: {firebaseError.message}</Text>
    }

    if (loading) {
        return (
            <Text>Entrando...</Text>
        );
    }

    return (
        <Screen title="Login" centralized>
            <CustomTextInput
                placeholder={"Email"}
                value={email}
                onChangeText={(value) => setEmail(value)}
            />
            <CustomTextInput
                placeholder={"Senha"}
                value={password}
                onChangeText={(value) => setPassword(value)}
            />
            <View>
                <CustomButton
                    label={"Entrar"}
                    onClickHandler={handleSignIn}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
    },
    button: {
        left: 83
    },
    buttons2: {
        fontSize: 11,
        right: 50,
        top: -30,
        color: 'blue'
    },
    input2: {
        borderRadius: 8,
        backgroundColor: 'LightGray',
        fontFamily: "InterRegular",
        height: 35,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default LoginScreen;
