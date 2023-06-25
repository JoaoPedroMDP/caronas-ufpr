import React from "react";
import { View, StyleSheet} from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import SubTitle from "../components/textual/Subtitle";
import Comment from "../components/textual/Comment";
import TextButton from "../components/inputs/TextButton";

const ForgetPassword = ({ navigation }) => {
    return (
        <Screen title="Recuperar senha" centralized>
            <SubTitle subtitle="Acontece nas melhores famílias" centralized={true} />
            <Comment
                centralized={true}
                comment="Faz assim: conte para gente qual endereço de email você usou para se cadastrar aqui, e te enviaremos um email de recuperação de senha ;)"
            />
            <CustomTextInput
                placeholder={"Email"}
            />
            <View style={styles.buttons}>
                <TextButton onPressHandler={() => { navigation.navigate("RegisterRoute") }} text="Ih, lembrei!" />
                <CustomButton label={"Recuperar"} onClickHandler={() => { navigation.navigate("RegisterRoute") }} alignment="end" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ForgetPassword;
