import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Black, PlaceholderGray, White } from '../../../assets/colors';

const CustomTextInput = ({ label, placeholder, text, setText, secureTextEntry, bigText, mandatory}) => {
    return (
        <View>
            <Text style={styles.label}>{
                (mandatory ? label + "*" : label) ?? placeholder
            }</Text>
            <TextInput
                style={[styles.input, bigText ? {height: 100} : 35]}
                onChangeText={setText}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={PlaceholderGray}
                secureTextEntry={secureTextEntry ?? false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: White,
        borderColor: Black,
        borderWidth: 2,
        fontFamily: "InterRegular",
        padding: 10,
        marginVertical: 5
    },
    label: {
        position: 'absolute',
        backgroundColor: White,
        top: -4,
        color: Black,
        paddingHorizontal: 3,
        marginLeft: 10,
        fontFamily: "InterBold",
        zIndex: 1
    }
})


export default CustomTextInput;