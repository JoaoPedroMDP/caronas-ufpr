import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sectionTitle: {
        fontFamily: "InterBold",
        fontSize: "15px"
    },
    section: {
        marginTop: "20px"
    }
})

const Section = ({children, title}) => {
    return(
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    )
}

export default Section;