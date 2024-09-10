import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const CustomInput = ({label, handleBlur, handleChange, value, enableEdit = true, keyboardType = "", hardColor}) => {
    const { themeColors } = useContext(ThemeContext);
    return (
        <View>
            <Text style={[
                styles.label, 
                hardColor ? {color: hardColor} : {color: themeColors.textColor}]}>{label}</Text>
            <TextInput
                onChangeText={handleChange}
                onBlur={handleBlur}
                value={value}
                style={[
                    styles.input, 
                    !enableEdit && !themeColors == "dark" && {backgroundColor: "#eee"}, 
                    hardColor ? {color: hardColor} : {color: themeColors.textColor, backgroundColor: themeColors.inputBoxColor}
                ]}
                editable={enableEdit}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: "400",
        fontSize: 15,
        marginBottom: 5,
        paddingLeft: 5,
    },
    input: {
        height: 40,
        width: "97%",
        margin: "auto",
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 15,
        color: "#000",
        borderColor: "#B5C0D0",
        borderWidth: 0.5,
        borderRadius: 5,
    },
});

export default CustomInput;