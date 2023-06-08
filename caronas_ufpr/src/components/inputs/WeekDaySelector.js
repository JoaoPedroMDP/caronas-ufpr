import { FlatList, View } from 'react-native';
import CustomSwitchButton from './CustomSwitchButton';
import { availableWeekDays } from '../../consts';

const WeekDaySelector = ({ weekDays, returnWeekDays }) => {
    function selectDay(day) {
        const newWeekDays = weekDays;
        if (newWeekDays.includes(day)) {
            // Remove o dia
            newWeekDays.splice(newWeekDays.indexOf(day), 1);
        } else {
            newWeekDays.push(day);
        }
        returnWeekDays(newWeekDays);
    }

    return (
        <View>
            <FlatList
                horizontal={true}
                data={availableWeekDays}
                renderItem={({ item }) => {
                    return (
                        <CustomSwitchButton
                            label={item.label}
                            onClickHandler={() => selectDay(item.key)}
                            containerStyle={{ marginHorizontal: 5, minWidth: 40 }}
                        />
                    );
                }}
            />
        </View>
    );
}

export default WeekDaySelector;