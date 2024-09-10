import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";

const SensorParamCard = ({param, measure, timestamp}) => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, {backgroundColor: themeColors.secondaryBackgroundColor}]}>
            <Text style={styles.title}>{param} {measure}</Text>
            <Text style={{color: themeColors.textColor}}>{timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#eee",
        marginHorizontal: 5,
    },
    title: {
        marginBottom: 24,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#F5EDED",
        borderRadius: 5,
    },
});

export default SensorParamCard;