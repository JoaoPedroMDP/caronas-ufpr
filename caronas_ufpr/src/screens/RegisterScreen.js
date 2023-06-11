import React from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Title from "../components/textual/Title";

const styles = StyleSheet.create({});

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
            <View>
                <CustomButton
                    label={"Cadastrar"}
                    alignment="end"
                />
            </View>
        </Screen>
    );
}

export default RegisterScreen;
