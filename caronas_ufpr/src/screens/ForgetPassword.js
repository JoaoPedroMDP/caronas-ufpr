import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Title from "../components/textual/Title";
import SectionDescription from "../components/textual/SectionDescription";
import SubTitle from "../components/textual/Subtitle";
import Comment from "../components/textual/Comment";
import TextButton from "../components/inputs/TextButton";

const ForgetPassword = ({ navigation }) => {
    return (
        <Screen>
            <Title title="Recuperar Senha" centralized={true} expand />
            <SubTitle subtitle="Acontece nas melhores famílias" centralized={true} />
            <Comment
                centralized={true}
                comment="Faz assim: conte para gente qual endereço de email você usou para se cadastrar aqui, e te enviaremos um email de recuperação de senha ;)"
            />
            <CustomTextInput
                placeholder={"Email"}
            />
            <View style={styles.buttons}>
                <View>
                    <TextButton onPressHandler={() => { navigation.navigate("RegisterRoute") }} text="Ih, lembrei!" />
                </View>
                <CustomButton label={"Recuperar"} onClickHandler={() => { navigation.navigate("RegisterRoute") }} />
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
});

export default ForgetPassword;
