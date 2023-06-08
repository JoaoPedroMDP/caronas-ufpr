import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const CustomSwitchButton = ({ label, onClickHandler, disabled, containerStyle }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(!clicked);
        onClickHandler(clicked);
    }

    return (
        <Pressable
            disabled={disabled}
            onPressOut={clickButton}
        >
            <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }, containerStyle]}>
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
        minWidth: 30,
    },
    text: {
        fontFamily: "InterBold",
        padding: 10
    }
})

export default CustomSwitchButton;
