import { Switch } from 'react-native';
import { LightGray, Black } from '../../assets/colors';

const CustomSwitch = ({switchValue, onSwitchHandler}) => {

    function onToggleSwitch() {
        onSwitchHandler(!switchValue);
    }

    return(
        <Switch 
            trackColor={{false: LightGray, true: Black}}
            onValueChange={onToggleSwitch}
            value={switchValue}
        ></Switch>
    );
}

export default CustomSwitch;