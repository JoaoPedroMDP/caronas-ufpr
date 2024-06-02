import { View, StyleSheet, ScrollView } from "react-native";
import Title from "../textual/Title";


const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 30,
        paddingTop: 40,
        height: "100%"
    }
})

const Screen = ({ children, title, centralized }) => {
    return (
        <ScrollView>
            <View style={[styles.screen, {justifyContent: centralized != undefined ? "center" : "flex-start"}]}>
                <Title title={title} centralized={centralized} />
                {children}
            </View>
        </ScrollView>
    )
}

export default Screen;