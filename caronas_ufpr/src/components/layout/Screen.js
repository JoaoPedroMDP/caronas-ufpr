import { View, Text, StyleSheet, ScrollView } from "react-native";
import Title from "../textual/Title";

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 30,
        paddingTop: 40,
        height: "100%",
        justifyContent: "center"
    }
})

const Screen = ({ children, title, centralized }) => {
    return (
        <View style={styles.screen}>
            <Title title={title} centralized={centralized} />
            {children}
        </View>
    )
}

export default Screen;