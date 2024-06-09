import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Black, PlaceholderGray, White } from '../../../assets/colors';
import gs from '@/globalStyles';

const CustomTextInput = ({ label, placeholder, text, setText, secureTextEntry, bigText, mandatory}) => {
    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{
                    (mandatory ? label + "*" : label) ?? placeholder
                }</Text>
            </View>
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
        marginVertical: 5,
        top: -15
    },
    label: {
        flexShrink: 1,
        position: 'relative',
        backgroundColor: White,
        color: Black,
        paddingHorizontal: 3,
        marginHorizontal: 10,
        fontFamily: "InterBold",
    },
    labelContainer: {
        ...gs.flexRow,
        zIndex: 1

    }
})


export default CustomTextInput;