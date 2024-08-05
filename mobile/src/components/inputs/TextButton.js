import { Pressable, StyleSheet, Text } from "react-native";
import { Black, Blue, White } from '../../../assets/colors';
const styles = StyleSheet.create({
    option: {
        fontFamily: 'InterRegular',
        fontSize: 14,
        color: Blue
    },
    button: {
        borderRadius: 5,
        paddingVertical: 5
    }
});

const TextButton = ({ text, onPressHandler, alignment }) => {

    function getStyles(pressed) {
        return [
            styles.button,
            pressed == true ? {backgroundColor: White, color: Black} : {color: Blue}
        ];
    }

    return (
        <Pressable style={({pressed}) => getStyles(pressed)} onPress={onPressHandler}>
            <Text style={[styles.option, {textAlign: alignment}]}>{text}</Text>
        </Pressable>
    );
}

export default TextButton;