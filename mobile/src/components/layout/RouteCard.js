import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from 'react' 
import gs from "../../globalStyles";
import { DarkGray, LightGray } from "../../../assets/colors";
import { getFormattedTime } from "../../contrib";

const RouteCard = ({route, additionalInfo, buttons, intentions, handlePress, title = null}) => {
    const [pressed, setPressed] = useState(false);

    function handlePress() {
        setPressed(!pressed);
    }

    if(!route) {
        return;
    }

    let intentions_str = intentions.join(', ');

    return (
        <Pressable onPress={handlePress} style={styles.route}>
            <Text style={styles.title}> {title == null ? route.name: title} </Text>
            {pressed &&
                <View>
                    {title != null &&
                        <Text style={gs.regularText}> {route.name} </Text>
                    }
                    {additionalInfo}
                    <View style={styles.intentions}>
                        <Text style={[styles.intentionsText]}>{intentions_str}</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={[gs.regularText, {marginRight: 10}]}>Chegada:</Text>
                        <Text style={gs.regularText}>{getFormattedTime(route.arrive_time)}</Text>
                    </View>
                    {buttons}
                </View> 
            }
        </Pressable>
    );
}


const styles = StyleSheet.create({
    intentions: {
        ...gs.flexRow,
        ...gs.justifyBetween,
        flexGrow: 1
    },
    intentionsText: {
        fontFamily: "InterRegular",
        fontSize: 17,
        color: DarkGray,
        marginTop: 10,
    },
    route: {
        ...gs.flexCol,
        backgroundColor: LightGray,
        borderRadius: 10,
        padding: 15,
    },
    title: {
        fontFamily: "InterBold",
        fontSize: 20,
        textAlign: 'center'
    },
    time: {
        ...gs.flexRow,
        ...gs.alignCenter,
        justifyContent: 'flex-start',
        marginBottom: 10
    }
});

export default RouteCard;
