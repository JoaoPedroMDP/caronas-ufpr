import { Pressable, StyleSheet, Text } from "react-native";
import { Blue } from '../../../assets/colors';
const styles = StyleSheet.create({
    option: {
        color: Blue,
        marginLeft: 5,
        fontFamily: 'InterRegular',
        fontSize: 14
    },
    button: {
      alignSelf: 'flex-start'
    }
});

const TextButton = ({ text, onPressHandler }) => {
    return (
        <Pressable style={styles.button} onPress={onPressHandler}>
            <Text style={styles.option}>{text}</Text>
        </Pressable>
    );
}

export default TextButton;