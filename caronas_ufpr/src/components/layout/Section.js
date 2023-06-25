import { View, Text, StyleSheet } from "react-native";
import { PlaceholderGray } from "../../../assets/colors";
import SectionDescription from "../textual/SectionDescription";

const styles = StyleSheet.create({
    sectionTitle: {
        fontFamily: "InterExtraBold",
        fontSize: 15,
        marginBottom: 5
    },
    sectionDescription: {
        fontFamily: "InterBold",
<<<<<<< HEAD
        fontSize: 15
    },
    section: {
        marginTop: 20
    }
})

const Section = ({ children, title }) => {
=======
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
>>>>>>> 3004c573115a0e6a061db6952082c7b6f70fd8d2
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {description != null &&
                <SectionDescription description={description} />
            }
            {children}
        </View>
    )
}

export default Section;