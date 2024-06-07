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
        display: 'flex',
        flexDirection: 'row', 
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    intentionsText: {
        fontFamily: "InterRegular",
        fontSize: 17,
        color: DarkGray,
        marginTop: 10,
    },
    route: {
        backgroundColor: LightGray,
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontFamily: "InterBold",
        fontSize: 20,
        textAlign: 'center'
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    }
});

export default RouteCard;
