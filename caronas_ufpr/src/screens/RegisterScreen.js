import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cadastro</Text>
            <CustomTextInput
                placeholder={"Email Institucional"}
            />
            <CustomTextInput
                placeholder={"WhatsApp"}
            />
            <CustomTextInput
                placeholder={"Senha"}
            />
            <CustomTextInput
                placeholder={"Confirmar Senha"}
            />
            <View style={styles.button}>
                <CustomButton
                    char={"Cadastrar"}
                    onClickHandler={() => { }}
                />
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
});

export default RegisterScreen;
