import { TextInput, StyleSheet } from 'react-native';
import { LightGray, PlaceholderGray } from '../../../assets/colors';

const CustomTextInput = ({ placeholder, text, setText, secureTextEntry, bigText}) => {
    return (
        <TextInput
            style={[styles.input, bigText ? {height: 100} : 35]}
            onChangeText={setText}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={PlaceholderGray}
            secureTextEntry={secureTextEntry ?? false}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: LightGray,
        fontFamily: "InterRegular",
        padding: 10,
        marginVertical: 5
    },
    inputView: {
        paddingVertical: 10
    }
})


export default CustomTextInput;