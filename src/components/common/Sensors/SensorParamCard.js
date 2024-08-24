import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SensorParamCard = ({param, measure, timestamp}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{param} {measure}</Text>
            <Text>{timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#eee",
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