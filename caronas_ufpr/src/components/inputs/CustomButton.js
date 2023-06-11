import { StyleSheet, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const CustomButton = ({ label, onClickHandler, disabled, containerStyle, alignment }) => {
    const [clicked, setClicked] = useState(false);
    const alignmentStyle = alignment != null ? "flex-" + alignment : null;
    let aligStyle = {
        justifyContent: alignmentStyle
    };

    function clickButton() {
        setClicked(false);
        onClickHandler(clicked);
    }

    return (
        <View style={[styles.teste, aligStyle]}>
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
        </View>
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
    },
    teste: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row'
    }
})

export default CustomButton;
