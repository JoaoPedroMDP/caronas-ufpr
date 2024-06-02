
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import CustomButton from "../../components/inputs/CustomButton";
import Screen from "../../components/layout/Screen";
import SubTitle from "../../components/textual/Subtitle";
import TextButton from "../../components/inputs/TextButton";
import { Snackbar, Portal } from "react-native-paper";
import { resetPassword } from "../../cruds/auth";


const ResetPassword = ({ navigation }) => {
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [validationMessage, setValidationMessage] = useState(null);

    async function passwordReset() {
        if (password && passwordConfirmation) {
            try {
                let response = await resetPassword(token, password, passwordConfirmation);
                if (response.status) {
                    navigation.navigate("Login");
                }
            } catch (e) {
                setValidationMessage(e.message);
                setShowSnackbar(true);
            }
        } else {
            setValidationMessage("A senha e a confirmação de senha devem ser iguais");
            setShowSnackbar(true);
        }
    }

    return (
        <Screen title="Defina sua nova senha" centralized>
            <SubTitle subtitle="Agora é só escolher uma senha bem segura!" centralized={true} />
            <CustomTextInput
                placeholder={"Nova senha"}
                setText={(value) => {
                    setPassword(value);
                }}
                value={password}
                secureTextEntry
            />
            <CustomTextInput
                placeholder={"Confirme a nova senha"}
                setText={(value) => {
                    setPasswordConfirmation(value);
                }}
                value={passwordConfirmation}
                secureTextEntry
            />
            <CustomTextInput
                placeholder={"Token de confirmação recebido por email"}
                setText={(value) => {
                    setToken(value);
                }}
                value={token}
                secureTextEntry
            />
            <View style={styles.buttons}>
                <TextButton onPressHandler={() => { navigation.navigate("Login") }} text="Cancelar" />
                <CustomButton
                    label={"Redefinir"}
                    onClickHandler={passwordReset}
                    alignment="end"
                />
            </View>
            <Portal>
                <Snackbar
                    visible={showSnackbar}
                    onDismiss={() => setShowSnackbar(false)}
                    duration={5000}
                    action={{
                        label: "Fechar",
                    }}
                >
                    {validationMessage}
                </Snackbar>
            </Portal>
        </Screen>
    );      
};

let styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});
export default ResetPassword;