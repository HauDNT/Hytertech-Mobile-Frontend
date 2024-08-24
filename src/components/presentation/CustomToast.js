import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const configToast = {
    success: (props) => (
        <BaseToast 
            {...props}
            style={styles.success}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
        />
    ),
    error: (props) => (
        <BaseToast 
            {...props}
            style={styles.error}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
        />
    ),
    info: (props) => (
        <BaseToast 
            {...props}
            style={styles.info}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
        />
    ),
    warning: ({ text1, text2 }) => (
        <View style={[
            styles.warning, 
            {
                
            }]}
        >
            <Text style={styles.text1Style}>{text1}</Text>
            <Text style={styles.text2Style}>{text2}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    success: {
        borderLeftColor: "#06D001",
        borderLeftWidth: 10,
    },
    error: {
        borderLeftColor: "#FF204E",
        borderLeftWidth: 10,
    },
    info: {
        borderLeftColor: "#0096FF",
        borderLeftWidth: 10,
    },
    warning: {
        height: 60,
        width: "95%",
        paddingLeft: 15,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        borderLeftColor: "orange",
        borderRadius: 5,
        borderLeftWidth: 10,
        elevation: 5,
    },
    contentContainerStyle: {
        paddingHorizontal: 15,
    },
    text1Style: {
        fontSize: 15,
        fontWeight: "500",
    },
    text2Style: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
    },
});