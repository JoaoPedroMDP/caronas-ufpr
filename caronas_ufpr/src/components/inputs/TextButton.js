import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Blue } from '../../../assets/colors';
const styles = StyleSheet.create({
    option: {
        color: Blue,
        marginLeft: 5
    },
});

const TextButton = ({ text, onPressHandler }) => {
    return (
        <TouchableOpacity onPress={onPressHandler}>
            <Text style={styles.option}>{text}</Text>
        </TouchableOpacity>
    );
}

export default TextButton;