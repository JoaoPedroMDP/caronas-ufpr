import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { LightGray, PlaceholderGray } from '../../../assets/colors';

const styles = StyleSheet.create({
    dropdown: {
        border: "none",
        backgroundColor: LightGray
    },
    placeholder: {
        fontSize: "15px",
        color: PlaceholderGray
    },
    interFont: {
        fontFamily: "InterRegular"
    }
})

const Dropdown = ({items, returnValue, placeholder}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(false);

    function selectValue(value){
        setValue(value);
        returnValue(value);
    }

    return(
        <DropDownPicker
            style={[styles.dropdown, styles.interFont]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={selectValue}
            placeholder={placeholder ?? "Selecione um item"}
            placeholderStyle={[styles.placeholder, styles.interFont]}
            dropDownContainerStyle={styles.dropdown}
            listItemLabelStyle={styles.interFont}
        />
    );
}

export default Dropdown;