import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <CustomTextInput
                placeholder={"Email Institucional"}
            />
            <CustomTextInput
                placeholder={"Senha"}
            />
            <View style={styles.button}>
                <CustomButton
                    char={"Entrar"}
                    onClickHandler={() => { navigation.navigate("RegisterRoute") }}
                />
            </View>
            <View style={styles.buttons2}>
                <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}><Text>Não possui conta? Cadastre-se!</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword") }}><Text>Esqueceu a senha?</Text></TouchableOpacity>
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
    }
});

export default LoginScreen;
