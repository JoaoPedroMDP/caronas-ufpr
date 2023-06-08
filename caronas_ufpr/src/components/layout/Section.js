import { View, Text, StyleSheet } from "react-native";
import { PlaceholderGray } from "../../../assets/colors";

const styles = StyleSheet.create({
    sectionTitle: {
        fontFamily: "InterExtraBold",
        fontSize: 15,
        marginBottom: 5
    },
    sectionDescription: {
        fontFamily: "InterBold",
        fontSize: 12,
        marginBottom: 5,
        color: PlaceholderGray
    },
    section: {
        marginTop: 20,
        position: "relative"
    }
})

const Section = ({ children, title, description }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {description != null &&
                <Text style={styles.sectionDescription}>{description}</Text>
            }
            {children}
        </View>
    )
}

export default Section;