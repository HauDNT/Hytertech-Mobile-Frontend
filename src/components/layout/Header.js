import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { Text } from '@rneui/themed';
import userAvatar from "../../assets/images/avatar-2.jpg";

const Header = ({title_1, title_2}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("userinfo")}>
            <View style={styles.leftHalf}>
                <Text style={styles.text}>{title_1}</Text>
                <Text style={[styles.text, {fontWeight: "bold"}]}>{title_2}</Text>
            </View>
            <View style={styles.rightHalf}>
                <Image source={userAvatar} style={styles.avatar}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 120, 
        backgroundColor: "white",
        flexDirection: "row",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
    },
    leftHalf: {
        width: 200,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 35,
    },
    rightHalf: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
    },
    text: {
        paddingLeft: 20,
        fontSize: 17,
        color: "#000",
    },
    avatar: {
        width: 100,
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 100,
    }
})

export default Header;