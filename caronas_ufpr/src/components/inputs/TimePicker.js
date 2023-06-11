import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import CustomButton from './CustomButton';

const TimePicker = ({ returnTime, pickerLabel }) => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);


    function changeTime(event, selectedTime) {
        const currentTime = selectedTime || time;
        setShow(false);
        setTime(currentTime);
        returnTime(currentTime);
    }

    return (
        <View>
            <CustomButton label={pickerLabel ?? "Horário"} onClickHandler={() => setShow(true)} />
            {show &&
                <DateTimePicker
                    mode="time"
                    display="clock"
                    value={time}
                    is24Hour={true}
                    onChange={changeTime}
                />
            }
        </View>
    );
}

export default TimePicker;