import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Divider = () => {
    return (
        <View style={styles.divider}></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        width: "97%",
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        height: 2,
        borderColor: "#F0F0F0",
        backgroundColor: "#F0F0F0",
        borderRadius: 100,
        borderWidth: 1,
    },
});

export default Divider;