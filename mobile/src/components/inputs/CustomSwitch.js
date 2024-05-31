import { Switch } from 'react-native-switch';
import { LightGray, Black } from '../../../assets/colors';
import { View } from 'react-native';

const CustomSwitch = ({ switchValue, onSwitchHandler, customStyle }) => {
    if (switchValue === undefined) {
        switchValue = false;
    }

    function changeValue() {
        switchValue = !switchValue;
        onSwitchHandler();
    }

    return (
        <View style={[customStyle]}>
            <Switch
                onValueChange={changeValue}
                circleActiveColor={LightGray}
                circleInActiveColor={Black}
                backgroundActive={Black}
                backgroundInactive={LightGray}
                renderActiveText={false}
                renderInActiveText={false}
                value={switchValue}
            ></Switch>
        </View>
    );
}

export default CustomSwitch;