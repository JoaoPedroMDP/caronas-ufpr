import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    subtitle: {
        fontFamily: "InterBold",
        fontSize: 15
    }
})

const SubTitle = ({ subtitle, centralized, justify }) => {
    return (
        <Text style={[
            style.subtitle,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { textAlign: justify != null ? "justify" : null }
        ]}>{subtitle}</Text>
    )
}

export default SubTitle;