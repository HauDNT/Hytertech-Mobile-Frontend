import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from '@rneui/themed';

const CustomInput = ({label, placeholder = "", secure = false, value, onChangeText}) => {
    return (
        <View style={{marginTop: 15, width: "100%"}}>
            <Input 
                style={styles.container} 
                label={label} 
                placeholder={placeholder}
                secureTextEntry={secure}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 0,
        marginTop: 5,
    }
});

export default CustomInput;