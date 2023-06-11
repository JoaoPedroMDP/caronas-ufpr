import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    title: {
        fontFamily: "InterBold",
        fontSize: 35,
        maxWidth: 175
    }
})

const PageTitle = ({ title, centralized }) => {
    return (
        <Text style={[style.title, { alignSelf: (centralized != null) && centralized ? "center" : null }]}>{title}</Text>
    )
}

export default PageTitle;