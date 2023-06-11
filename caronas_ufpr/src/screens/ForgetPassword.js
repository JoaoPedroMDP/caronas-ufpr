import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";

const ForgetPassword = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recuperar Senha</Text>
            <Text style={styles.text2}>Acontece nas melhores famílias</Text>
            <Text>
                Faz assim: conte para gente qual endereço de email você usou para se `{"\n"}`
                cadastrar aqui, e te enviaremos um email de recuperação de senha ;)
            </Text>
            <View style={styles.input}>
                <CustomTextInput
                    placeholder={"Email"}
                />
            </View>
            <View style={styles.button}>
                <CustomButton
                    label={"Recuperar"}
                    onClickHandler={() => { }}
                />
            </View>
            <View style={styles.buttons2}>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}><Text>Ih lembrei a senha</Text></TouchableOpacity>
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
    text2: {
        fontSize: 20,
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

export default ForgetPassword;
