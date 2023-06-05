import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    title: {
        fontFamily: "InterBold",
        fontSize: 35,
        maxWidth: 175
    }
})

const PageTitle = ({ title }) => {
    return (
        <Text style={style.title}>{title}</Text>
    )
}

export default PageTitle;