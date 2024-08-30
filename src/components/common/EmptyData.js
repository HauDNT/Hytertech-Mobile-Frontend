import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import EmptyDataIcon from "../../assets/icons/empty-data.png";
import { ThemeContext } from "../../context/ThemeContext";

const EmptyData = ({message = "Không có dữ liệu"}) => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, {backgroundColor: themeColors.secondaryBackgroundColor, borderColor: themeColors.borderColorLight}]}>
            <Image style={styles.icon} source={EmptyDataIcon} />
            <Text style={[styles.message, {color: themeColors.textColor}]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 170,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderWidth: 2,
    },
    icon: {
        width: 100,
        height: 100,
    },
    message: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
})

export default EmptyData;