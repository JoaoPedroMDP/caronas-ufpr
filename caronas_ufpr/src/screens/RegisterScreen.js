import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import RoundSquareButton from "../components/inputs/RoundSquareButton";

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cadastro</Text>
            <View style={styles.input}>
                <CustomTextInput
                    placeholder={"Email Institucional"}
                />
            </View>
            <View style={styles.input}>
                <CustomTextInput
                    placeholder={"WhatsApp"}
                />
            </View>
            <View style={styles.input}>
                <CustomTextInput
                    placeholder={"Senha"}
                />
            </View>
            <View style={styles.input}>
                <CustomTextInput
                    placeholder={"Confirmar Senha"}
                />
            </View>
            <View style={styles.button}>
                <RoundSquareButton
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
