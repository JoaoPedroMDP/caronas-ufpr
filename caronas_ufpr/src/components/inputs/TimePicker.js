import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from 'react-native';
import { useState } from 'react';
import RoundSquareButton from './RoundSquareButton';

const TimePicker = ({ returnTime }) => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);


    function changeTime(event, selectedTime) {
        const currentTime = selectedTime || time;
        setShow(false);
        setTime(currentTime);
    }

    return (
        <View>
            <RoundSquareButton label="Horário" onClickHandler={() => setShow(true)} />
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