import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const CustomButton = ({ label, onClickHandler, disabled, containerStyle }) => {
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
            style={[styles.container, containerStyle]}
        >
            <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }]}>
                <Text style={[styles.text, { color: clicked ? LightGray : Black }]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: "flex-start",
        marginVertical: 5,
    },
    button: {
        borderRadius: 10,
        minWidth: 45,
    },
    text: {
        fontFamily: "InterBold",
        margin: 10
    }
})

export default CustomButton;
