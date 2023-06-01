import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: "30px",
        paddingTop: "40px",
    }
})

const Screen = ({children}) => {
    return(
        <View style={styles.screen}>
            {children}
        </View>
    )
}

export default Screen;