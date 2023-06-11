import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Title from "../components/textual/Title";

const RegisterScreen = ({ navigation }) => {
    return (
        <Screen>
            <Title title="Cadastro" centralized={true} />
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
                    label={"Cadastrar"}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: "flex-end"
    },
});

export default RegisterScreen;
