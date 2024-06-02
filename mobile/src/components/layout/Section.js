import { View, Text, StyleSheet } from "react-native";
import { PlaceholderGray } from "../../../assets/colors";
import gs from "../../globalStyles";

const styles = StyleSheet.create({
    section: {
        marginTop: 20,
        position: "relative"
    },
    title: {
        fontFamily: "InterBold",
        marginBottom: 10
    },
    description: {
        fontFamily: "InterBold",
        fontSize: 14,
        marginBottom: 5,
        color: PlaceholderGray
    },
})

const SectionDescription = ({ description, centralized, expand }) => {
    return (
        <Text style={[
            styles.description,
            { alignSelf: (centralized != null) && centralized ? "center" : null },
            { maxWidth: (expand != null) && expand ? "100%" : null }
        ]}>{description}</Text>
    )
}

const Section = ({ children, title, description }) => {
    return (
        <View style={styles.section}>
            <Text style={[gs.regularText, styles.title]}>{title}</Text>
            {description != null &&
                <SectionDescription description={description} />
            }
            {children}
        </View>
    )
}

export default Section;