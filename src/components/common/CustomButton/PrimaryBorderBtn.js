import React from "react";
import { StyleSheet } from "react-native";
import { Button } from '@rneui/themed';

const PrimaryBorderButton = ({title, colorBtn = "#387ADF", colorText = "#FFF", onPress}) => {
    return (
        <Button  
            title={title}
            buttonStyle={[styles.button, { backgroundColor: colorBtn, borderColor: colorBtn }]}
            titleStyle={{color: colorText}}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        color: "#FFFFFF",
    }
});

export default PrimaryBorderButton;