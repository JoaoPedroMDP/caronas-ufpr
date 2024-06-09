import { ScrollView } from "react-native"


const CustomScrollView = ({children}) => {
    return(
        <ScrollView contentContainerStyle={{flex:1}}>
            {children}
        </ScrollView>
    )
}

export default CustomScrollView;