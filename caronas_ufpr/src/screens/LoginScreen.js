import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import PageTitle from "../components/textual/PageTitle";
import { Blue } from "../../assets/colors";

const LoginScreen = ({ navigation }) => {
    return (
        <Screen>
            <PageTitle title="Login" centralized={true} />
            <CustomTextInput
                placeholder={"Email Institucional"}
            />
            <CustomTextInput
                placeholder={"Senha"}
            />
            <View style={styles.buttons}>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}><Text style={styles.option}>Não possui conta? Cadastre-se!</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword") }}><Text style={styles.option}>Esqueceu a senha?</Text></TouchableOpacity>
                </View>
                <CustomButton
                    label={"Entrar"}
                    onClickHandler={() => { navigation.navigate("RegisterRoute") }}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: "flex-end",
        paddingHorizontal: 10
    },
    option: {
        color: Blue
    },
});

export default LoginScreen;
