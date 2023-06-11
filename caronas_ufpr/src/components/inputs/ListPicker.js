import ModalSelector from 'react-native-modal-selector';
import { useState } from 'react';
import CustomButton from './CustomButton';

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
            onChange={changeValue}
            multiple={false}
        >
            <CustomButton
                label={value}
            />
        </ModalSelector>
    );
}

export default ListPicker;