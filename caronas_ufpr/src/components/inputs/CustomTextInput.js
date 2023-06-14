import { TextInput, StyleSheet, View } from 'react-native';
import { LightGray, PlaceholderGray } from '../../../assets/colors';

<<<<<<< HEAD
const CustomTextInput = ({ placeholder, text, setText }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={PlaceholderGray}
        />
    )
}

=======
>>>>>>> 3004c573115a0e6a061db6952082c7b6f70fd8d2
const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: LightGray,
        fontFamily: "InterRegular",
<<<<<<< HEAD
        height: 35,
=======
        height: 45,
>>>>>>> 3004c573115a0e6a061db6952082c7b6f70fd8d2
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