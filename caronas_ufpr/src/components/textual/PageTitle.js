import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
    title: {
        fontFamily: "InterBold",
        fontSize: "35px",
        maxWidth: "175px"
    }
})

const PageTitle = ({title}) => {
    return(
        <Text style={style.title}>{title}</Text>
    )
}

export default PageTitle;