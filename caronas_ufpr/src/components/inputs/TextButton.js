import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Blue } from '../../../assets/colors';
const styles = StyleSheet.create({
    option: {
        color: Blue,
        marginLeft: 5,
        fontFamily: 'InterRegular',
        fontSize: '12px'
    },
    button: {
      alignSelf: 'flex-start'
    }
});

const TextButton = ({ text, onPressHandler }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPressHandler}>
            <Text style={styles.option}>{text}</Text>
        </TouchableOpacity>
    );
}

export default TextButton;