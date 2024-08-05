import { StyleSheet, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { Black, LightGray, MediumGray, White } from '../../../assets/colors';
import gs from '../../globalStyles';

const styles = StyleSheet.create({
    button: {
        ...gs.flexRow,
        ...gs.alignCenter,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    regularButton: {
        borderRadius: 10,
        minWidth: 70,
        minHeight: 40,
    },
    smallButton: {
        borderRadius: 8,
        minWidth: 30,
    },
    text: {
        fontFamily: "InterBold",
        margin: 10,
        fontSize: 17
    },
    smallText: {
        fontFamily: "InterBold",
        margin: 5,
        fontSize: 14
    }
})

const CustomButton = ({ label, onClickHandler, disabled, inverted, small, bgColor, txColor }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(false);
        onClickHandler(clicked);
    }

    let textColor = txColor ?? White;
    let backgroundColor = bgColor ?? Black;

    if (clicked || inverted != undefined) {
      textColor = LightGray;
      backgroundColor = Black; 
    }

    return (
        <Pressable
            disabled={disabled}
            onPressIn={() => setClicked(true)}
            onPressOut={clickButton}
            style={[
                small ? styles.smallButton : styles.regularButton, 
                styles.button, 
                {
                    backgroundColor: backgroundColor,
                    opacity: disabled ? 0.5 : 1
                }]}
        >
            <Text style={[small ? styles.smallText : styles.text, { color: textColor }]}>{label}</Text>
        </Pressable>
    );
}

export default CustomButton;
