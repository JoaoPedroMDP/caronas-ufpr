import { Switch } from 'react-native-switch';
import { LightGray, Black } from '../../../assets/colors';

const CustomSwitch = ({ switchValue, onSwitchHandler }) => {
    if (switchValue === undefined) {
        switchValue = false;
    }

    function changeValue() {
        switchValue = !switchValue;
        onSwitchHandler();
    }

    return (
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
    );
}

export default CustomSwitch;