import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import RoundSquareButton from "../components/inputs/RoundSquareButton";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";

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
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.input}>
                <TextInput
                    style={styles.input2}
                    placeholder={"Email"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.input2}
                    placeholder={"Senha"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <View style={styles.button}>
                <RoundSquareButton
                    char={"Entrar"}
                    onClickHandler={handleSignIn}
                />
            </View>
            <View style={styles.buttons2}>
                <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}>Não possui conta? Cadastre-se!</TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword") }}>Esqueceu a senha?</TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 10
    }
});

export default LoginScreen;
