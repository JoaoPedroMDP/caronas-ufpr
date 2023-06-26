import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Screen from '../components/layout/Screen';
import CustomTextInput from '../components/inputs/CustomTextInput';
import CustomButton from '../components/inputs/CustomButton';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [
        signInWithEmailAndPassword,
        user
    ] = useSignInWithEmailAndPassword(auth);

    function handleSignIn() {
        try {
            signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Screen title="Login" centralized>
            <CustomTextInput text={email} setText={setEmail} placeholder="Email"/>
            <CustomTextInput text={password} setText={setPassword} placeholder="Senha" secureTextEntry={true}/>
            <View style={{display: "flex"}}>
                <CustomButton label="Entrar" onClickHandler={handleSignIn} alignment="end" grow={0.5}/>
                <CustomButton label="Criar cadastro" onClickHandler={() => {navigation.navigate("RegisterScreen")}} alignment="start" grow={0.5}/>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
    },
    button: {
        flexShrink: "shrink"
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
    },
});

export default LoginScreen;
