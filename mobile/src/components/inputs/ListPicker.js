import ModalSelector from 'react-native-modal-selector';
import CustomButton from './CustomButton';

const ListPicker = ({ value, list, returnValue, placeholder = "Selecione um item" }) => {
    function changeValue(option) {
        returnValue(option);
    }

    return (
        <ModalSelector
            data={list}
            onChange={changeValue}
            multiple={false}
        >
            <CustomButton
                label={value ?? placeholder}
            />
        </ModalSelector>
    );
}

export default ListPicker;