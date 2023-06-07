import ModalSelector from 'react-native-modal-selector';
import { useState } from 'react';
import RoundSquareButton from './RoundSquareButton';

const ListPicker = ({ items, returnValue, placeholder }) => {

    const [value, setValue] = useState(placeholder ?? "Selecione um item");

    function changeValue(option) {
        console.log(option);
        setValue(option.label);
        returnValue(option);
    }

    return (
        <ModalSelector
            data={items}
            onChange={changeValue}>
            <RoundSquareButton
                label={value}
            />
        </ModalSelector>
    );
}

export default ListPicker;