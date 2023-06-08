import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const CustomButton = ({ label, onClickHandler, disabled }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(false);
        onClickHandler(clicked);
    }

    return (
        <Pressable
            disabled={disabled}
            onPressIn={() => setClicked(true)}
            onPressOut={clickButton}
        >
            <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }]}>
                <Text style={[styles.text, { color: clicked ? LightGray : Black }]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: "fit-content",
        minWidth: 45,
    },
    text: {
        fontFamily: "InterBold",
        margin: 10
    }
})

export default CustomButton;
