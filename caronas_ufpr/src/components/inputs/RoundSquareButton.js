import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const RoundSquareButton = ({ label, onClickHandler }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(!clicked);
        onClickHandler(clicked);
    }

    return (
        <Pressable onPressOut={clickButton} >
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
        alignItems: 'center'
    },
    text: {
        fontFamily: "InterBold",
        margin: 10
    }
})

export default RoundSquareButton;
