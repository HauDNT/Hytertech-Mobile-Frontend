import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ThemeContext } from "../../context/ThemeContext";

const CustomCombobox = ({label, title, data, value, onChange = () => {}}) => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, {color: themeColors.textColor}]}>{label}</Text>
            <Dropdown
                style={[styles.dropdownMenu, {backgroundColor: themeColors.inputBoxColor}]}
                placeholderStyle={{ color: themeColors.textColor }}
                selectedTextStyle={{ color: themeColors.textColor }}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={title}
                value={value}
                onChange={item => onChange(item.value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "97%",
        margin: "auto",
        marginBottom: 10,
    },
    label: {
        fontWeight: "400",
        fontSize: 15,
        marginBottom: 5,
    },
    dropdownMenu: {
        height: 40, 
        padding: 5,
        borderRadius: 5,
        borderWidth: 0.5, 
        borderColor: '#B5C0D0', 
        marginBottom: 10,
        paddingLeft: 10,
    }
});

export default CustomCombobox;