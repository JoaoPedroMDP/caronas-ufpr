import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/FireBaseConfig";
import CustomTextInput from "../components/inputs/CustomTextInput";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [
        signInWithEmailAndPassword,
        user
    ] = useSignInWithEmailAndPassword(auth);

    function handleSignIn() {
        try {
            signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    }
    
    if(user){
        return console.log(user);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
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
            <View style={styles.button}>
                <Button
                    title={"Entrar"}
                    onPress={handleSignIn}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
    },
    button: {
        left: 83
    },
    input2: {
        borderRadius: 8,
        backgroundColor: 'LightGray',
        fontFamily: "InterRegular",
        height: 35,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginScreen;
