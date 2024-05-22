import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    title: {
        fontFamily: "InterBold",
        fontSize: 35,
        maxWidth: 175
    }
})

const Title = ({ title, centralized, expand }) => {
    return (
        <Text style={[
            style.title,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { maxWidth: (expand != null) && expand ? "100%" : null }
        ]}>{title}</Text>
    )
}

export default Title;