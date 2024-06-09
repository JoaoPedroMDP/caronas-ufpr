
import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "@/components/inputs/CustomTextInput";
import CustomButton from "@/components/inputs/CustomButton";
import Screen from "@/components/layout/Screen";
import SubTitle from "@/components/textual/Subtitle";
import { resetPassword } from "../../cruds/auth";
import { SnackbarContext } from "@contexts/snackbarContext";
import gs from "../../globalStyles";


const NewPasswordScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const { showSnackbar } = useContext(SnackbarContext);

    async function passwordReset() {
        if (password && passwordConfirmation) {
            try {
                let response = await resetPassword(token, password, passwordConfirmation);
                if (response.status) {
                    navigation.navigate("Início");
                }
            } catch (e) {
                showSnackbar(e.message);
            }
        } else {
            showSnackbar("A senha e a confirmação de senha devem ser iguais");
        }
    }

    return (
        <Screen title="Defina sua nova senha" centTitle>
            <SubTitle subtitle="Lembre-se de escolher uma senha bem segura ;)" />
            <CustomTextInput
                placeholder={"Nova senha"}
                setText={(value) => {
                    setPassword(value);
                }}
                value={password}
                secureTextEntry
                mandatory
            />
            <CustomTextInput
                placeholder={"Confirme a nova senha"}
                setText={(value) => {
                    setPasswordConfirmation(value);
                }}
                value={passwordConfirmation}
                secureTextEntry
                mandatory
            />
            <CustomTextInput
                placeholder={"Token de confirmação recebido por email"}
                setText={(value) => {
                    setToken(value);
                }}
                value={token}
                mandatory
            />
            <View style={styles.buttons}>
                <CustomButton
                    label={"Redefinir"}
                    onClickHandler={passwordReset}
                />
            </View>
        </Screen>
    );      
};

let styles = StyleSheet.create({
    buttons: {
        ...gs.flexRow,
        ...gs.justifyEnd,
        marginTop: 20,
    },
});
export default NewPasswordScreen;