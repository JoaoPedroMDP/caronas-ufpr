import { TextInput, StyleSheet, View } from 'react-native';
import { LightGray, PlaceholderGray } from '../../../assets/colors';

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

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: LightGray,
        fontFamily: "InterRegular",
        height: 35,
        padding: 10
    },
    inputView: {
        padding: 10
    }
})

export default CustomTextInput;