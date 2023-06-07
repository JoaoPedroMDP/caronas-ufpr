import ModalSelector from 'react-native-modal-selector';

const Picker = ({ items, returnValue, placeholder, containerStyle }) => {
    return (
        <ModalSelector
            data={items}
            initValue={placeholder ?? "Selecione um item"}
            onChange={option => returnValue(option)}
        />
    );
}

export default Picker;