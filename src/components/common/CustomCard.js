import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const CustomCard = ({width, height, color, icon, text, redirectLink = ""}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={[styles.item, {width: width, height: height, backgroundColor: color}]}
            onPress={
                redirectLink ? 
                () => navigation.navigate(redirectLink)
                :
                () => {}
            }
        >
            <Image style={styles.icon} source={icon}/>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#DDD",
        elevation: 3,
        overflow: "hidden",
    },
    icon: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
});

export default CustomCard;