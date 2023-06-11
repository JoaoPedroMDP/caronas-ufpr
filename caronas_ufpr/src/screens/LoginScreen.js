import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Title from "../components/textual/Title";
import { Blue } from "../../assets/colors";
import TextButton from "../components/inputs/TextButton";

const LoginScreen = ({ navigation }) => {
    return (
        <Screen>
            <Title title="Login" centralized={true} />
            <CustomTextInput
                placeholder={"Email Institucional"}
            />
            <CustomTextInput
                placeholder={"Senha"}
            />
            <View style={styles.buttons}>
                <View>
                    <TextButton onPressHandler={() => { navigation.navigate("Login") }} text={"Não possui conta? Cadastre-se!"} />
                    <TextButton onPressHandler={() => { navigation.navigate("Login") }} text={"Esqueceu a senha?"} />
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
        alignSelf: "flex-end"
    },
    option: {
        color: Blue
    },
});

export default LoginScreen;
