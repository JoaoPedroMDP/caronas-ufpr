import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import React from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import CustomButton from "../components/inputs/CustomButton";
import Screen from "../components/layout/Screen";
import Title from "../components/textual/Title";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(0);

    const [
        createUserWithEmailAndPassword,
        loading,
        firebaseError,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleRegister() {
        try {
            createUserWithEmailAndPassword(email, password);
            setSuccess(1);
        } catch (errorCatch) {
            console.log(errorCatch);
        }
    }

    function cadastrado() {
        if (success == 1) {
            return (
                <>
                    <>
                        <Text>Usuário Cadastrado com sucesso</Text>
                    </>
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("LoginScreen");
                            }}
                        ><Text>Ir para Login</Text></TouchableOpacity>
                    </>
                </>
            );
        }
    }

    if (firebaseError) {
        return <Text>Error: {firebaseError.message}</Text>
    }


    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cadastro</Text>
            <View style={styles.input}>
                <TextInput
                    style={styles.input2}
                    placeholder={"Email"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    style={styles.input2}
                    placeholder={"Senha"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <View style={styles.input}>
                <CustomTextInput placeholder={"Confirmar Senha"} />
            </View>
            <View style={styles.button}>
                <RoundSquareButton
                    char={"Cadastrar"}
                    onClickHandler={handleRegister}
                />
            </View>
            <Text>{cadastrado()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    text: {
        fontSize: 40,
        fontWeight: "bold",
    },
    input: {
        padding: 10,
    },
    button: {
        left: 83,
    },
    input2: {
        borderRadius: 8,
        backgroundColor: 'LightGray',
        fontFamily: "InterRegular",
        height: 35,
        padding: 10
    }
});

export default RegisterScreen;
