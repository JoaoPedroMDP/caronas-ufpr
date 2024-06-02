import { Switch } from 'react-native-switch';
import { LightGray, Black } from '../../../assets/colors';
import { View, StyleSheet, Text } from 'react-native';

const CustomSwitch = ({ activeText, inactiveText, switchValue, onSwitchHandler }) => {
    if (switchValue === undefined) {
        switchValue = false;
    }

    function changeValue() {
        switchValue = !switchValue;
        onSwitchHandler();
    }

    const circleText = () => {
        let text = <Text style={[styles.inactiveText, styles.circleText]}>{inactiveText}</Text>;
        if (switchValue){
            text = <Text style={[styles.activeText, styles.circleText]}>{activeText}</Text>
        }

        return(
            <View style={styles.circleTextContainer}>
                {text}
            </View>
        );
    }

    return (
        <Switch
            onValueChange={changeValue}
            circleActiveColor={LightGray}
            circleInActiveColor={Black}
            backgroundActive={Black}
            backgroundInactive={LightGray}
            renderInsideCircle={circleText}
            renderActiveText={false}
            renderInActiveText={false}
            value={switchValue}
        ></Switch>
    );
}

const styles = StyleSheet.create({
    inactiveText: {
        color: LightGray,
        textAlign: 'center',
    },
    activeText: {
        color: Black,
    }
});
export default CustomSwitch;