import ModalSelector from 'react-native-modal-selector';
import { useState } from 'react';
import CustomButton from './CustomButton';

const ListPicker = ({ value, list, returnValue }) => {
    const [selected, setSelected] = useState(value);

    function changeValue(option) {
        setSelected(option.label);
        returnValue(option);
    }

    return (
        <ModalSelector
            data={list}
            onChange={changeValue}
            multiple={false}
        >
            <CustomButton
                label={value ?? "Selecione um item"}
            />
        </ModalSelector>
    );
}

export default ListPicker;