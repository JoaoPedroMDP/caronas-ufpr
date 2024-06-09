import { View, StyleSheet } from 'react-native';
import CustomSwitchButton from './CustomSwitchButton';
import { availableWeekDays } from '../../consts';
import gs from '../../globalStyles';

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
        <View style={styles.days}>
            {availableWeekDays.map((item) => {
                return (
                    <CustomSwitchButton
                        key={item.key}
                        label={item.label}
                        onClickHandler={() => selectDay(item.key)}
                        containerStyle={{ marginHorizontal: 2, minWidth: 40, width: 40 }}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    days: {
        ...gs.flexRow,
        ...gs.alignCenter,
        ...gs.justifyBetween,
        marginVertical: 5,
        width: "100%"
    }
});

export default WeekDaySelector;