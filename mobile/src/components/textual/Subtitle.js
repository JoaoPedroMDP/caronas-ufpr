import { StyleSheet, Text } from 'react-native';
import gs from '../../globalStyles';

const style = StyleSheet.create({
    subtitle: {
        fontFamily: "InterBold",
        fontSize: 15
    }
})

const SubTitle = ({ subtitle, centralized, justify }) => {
    return (
        <Text style={[
            gs.regularText,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { textAlign: justify != null ? "justify" : null }
        ]}>{subtitle}</Text>
    )
}

export default SubTitle;