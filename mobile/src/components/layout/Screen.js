import { View, StyleSheet } from "react-native";
import Title from "../textual/Title";
import { White } from "../../../assets/colors";


const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 30,
        paddingTop: 30,
        height: "100%",
        backgroundColor: White
    }
})

const Screen = ({ children, title, centralized, centTitle }) => {
    // Se você veio aqui colocar uma scroll view global, apenas não faça isso. 
    // Vai conflitar com todas as FlatLists que tiverem pelo app
    
    return (
        <View style={[styles.screen, {justifyContent: centralized != undefined ? "center" : "flex-start"}]}>
            <Title title={title} centralized={centralized || centTitle != undefined} />
            {children}
        </View>
    )
}

export default Screen;