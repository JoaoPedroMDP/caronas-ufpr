import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 30,
        paddingTop: 40,
    }
})

const Screen = ({ children }) => {
    return (
        <View style={styles.screen}>
            {children}
        </View>
    )
}

export default Screen;