import { vh } from "@/consts";
import { ScrollView, View } from "react-native"


const CustomScrollView = ({children}) => {
    return(
        <ScrollView>
            <View style={{minHeight: vh}}>
                {children}
            </View>
        </ScrollView>
    )
}

export default CustomScrollView;