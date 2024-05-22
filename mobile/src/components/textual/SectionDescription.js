import { StyleSheet, Text } from 'react-native';
import { PlaceholderGray } from '../../../assets/colors';

const style = StyleSheet.create({
    description: {
        fontFamily: "InterBold",
        fontSize: 12,
        marginBottom: 5,
        color: PlaceholderGray
    },

})

const SectionDescription = ({ description, centralized, expand }) => {
    return (
        <Text style={[
            style.description,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { maxWidth: (expand != null) && expand ? "100%" : null }
        ]}>{description}</Text>
    )
}

export default SectionDescription;