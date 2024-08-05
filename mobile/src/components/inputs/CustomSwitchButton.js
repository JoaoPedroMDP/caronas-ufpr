import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';
import gs from '../../globalStyles';

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
            style={[styles.container, containerStyle]}
        >
            <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }, containerStyle]}>
                <Text style={[styles.text, { color: clicked ? LightGray : Black }]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        ...gs.alignCenter,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 5,
        width: "auto",
        minWidth: 30,
    },
    text: {
        fontFamily: "InterBold",
        padding: 10
    },
    container: {
        width: "auto"
    }
})

export default CustomSwitchButton;
