import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { LightGray, PlaceholderGray } from '../../../assets/colors';

const styles = StyleSheet.create({
    placeholder: {
        fontSize: 15,
        color: PlaceholderGray
    },
    interFont: {
        fontFamily: "InterRegular"
    }
})

const Dropdown = ({ items, returnValue, placeholder, containerStyle, dropdownIndex, dropdownCount }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(false);

    const dropdownTheme = require("../../../assets/dropdownTheme");

    DropDownPicker.addTheme("DropdownTheme", dropdownTheme);
    DropDownPicker.setTheme("DropdownTheme");

    function selectValue(value) {
        setValue(value);
        returnValue(value);
    }

    return (
        <View style={containerStyle ?? {}}>
            <DropDownPicker
                zIndex={(dropdownCount - dropdownIndex - 1) * 1000}
                zIndexInverse={dropdownIndex * 1000}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={selectValue}
                placeholder={placeholder ?? "Selecione um item"}
                placeholderStyle={[styles.placeholder, styles.interFont]}
                listItemLabelStyle={styles.interFont}
                searchable={true}
            />
        </View>
    );
}

export default Dropdown;