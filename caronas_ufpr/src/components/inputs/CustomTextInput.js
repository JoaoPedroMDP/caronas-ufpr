import { TextInput, StyleSheet } from 'react-native';
import { LightGray, PlaceholderGray } from '../../../assets/colors';

const CustomTextInput = ({placeholder, text, setText}) => {
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

const styles = StyleSheet.create({
    input: {
        borderRadius: '8px',
        backgroundColor: LightGray,
        fontFamily: "InterRegular",
        height: '35px',
        padding: 10
    }
})

export default CustomTextInput;