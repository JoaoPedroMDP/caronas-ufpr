import { Pressable, StyleSheet, Text } from "react-native";
import { Black, Blue, White } from '../../../assets/colors';
const styles = StyleSheet.create({
    option: {
        marginLeft: 5,
        fontFamily: 'InterRegular',
        fontSize: 14,
        color: Blue
    },
    button: {
        alignSelf: 'flex-start',
        borderRadius: 5,
        paddingVertical: 5
    }
});

const TextButton = ({ text, onPressHandler }) => {

    function getStyles(pressed) {
        console.log(pressed);
        return [
            styles.button,
            pressed == true ? {backgroundColor: White, color: Black} : {color: Blue}
        ];
    }

    return (
        <Pressable style={({pressed}) => getStyles(pressed)} onPress={onPressHandler}>
            <Text style={styles.option}>{text}</Text>
        </Pressable>
    );
}

export default TextButton;