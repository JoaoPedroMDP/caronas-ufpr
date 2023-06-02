import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useState } from 'react';
import { Black, LightGray } from '../../../assets/colors';

const RoundSquareButton = ({ char, onClickHandler }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(!clicked);
        onClickHandler(clicked);
    }

    return (
        <Pressable onPressOut={clickButton} >
            <View style={[styles.button, { backgroundColor: clicked ? Black : LightGray }]}>
                <Text style={[styles.text, { color: clicked ? LightGray : Black }]}>{char}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        height: 35,
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: "InterBold"
    }
})

export default RoundSquareButton;
