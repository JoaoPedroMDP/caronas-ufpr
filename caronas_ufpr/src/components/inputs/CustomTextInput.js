import { TextInput, StyleSheet, View } from 'react-native';
import { LightGray, PlaceholderGray } from '../../../assets/colors';

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: LightGray,
        fontFamily: "InterRegular",
        height: 45,
        padding: 10
    },
    inputView: {
        paddingVertical: 10
    }
})

const CustomTextInput = ({ placeholder, text, setText }) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={PlaceholderGray}
            />
        </View>
    )
}

export default CustomTextInput;