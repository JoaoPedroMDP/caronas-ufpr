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
    // Se você veio aqui colocar uma scroll view global, apenas não faça isso. 
    // Vai conflitar com todas as FlatLists que tiverem pelo app
    
    return (
        <View style={[styles.screen, {justifyContent: centralized != undefined ? "center" : "flex-start"}]}>
            <Title title={title} centralized={centralized} />
            {children}
        </View>
    )
}

export default Screen;