import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NotifiData } from "../../data/NotifiData";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { themeColors, themeState, setTheme } = useContext(ThemeContext);
    const [haveMessage, setHaveMessage] = useState();

    useEffect(() => {
        NotifiData.length > 0 ? 
        (setHaveMessage(true))
        :
        (setHaveMessage(false))
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("home")}>
                <AntDesign name="home" style={[styles.icon, {color: themeColors.iconColor}, route.name === "home" && {color: themeColors.iconActive}]} />
                <Text style={[styles.iconText, {color: themeColors.textColor}, route.name === "home" && {color: themeColors.iconActive}]}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("notification")}>
                <AntDesign name="bells" style={[styles.icon, {color: themeColors.iconColor}, route.name === "notification" && {color: themeColors.iconActive}]} />
                <Text style={[styles.iconText, {color: themeColors.textColor}, route.name === "notification" && {color: themeColors.iconActive}]}>Thông báo</Text>
                {
                    haveMessage && <View style={styles.point}></View>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("settings")}>
                <AntDesign name="setting" style={[styles.icon, {color: themeColors.iconColor}, route.name === "settings" && {color: themeColors.iconActive}]} />
                <Text style={[styles.iconText, {color: themeColors.textColor}, route.name === "settings" && {color: themeColors.iconActive}]}>Cài đặt</Text>
            </TouchableOpacity>

            {
                themeState === "light" ?
                (
                    <TouchableOpacity style={styles.menuContainer} onPress={() => setTheme("dark")}>
                        <AntDesign name="smile-circle" style={[styles.icon, {color: themeColors.iconColor}]} />
                        <Text style={[styles.iconText, {color: themeColors.iconColor, textAlign: "center"}]}>Tối</Text>
                    </TouchableOpacity>
                )
                :
                (
                    <TouchableOpacity style={styles.menuContainer} onPress={() => setTheme("light")}>
                        <AntDesign name="smileo" style={[styles.icon, {color: themeColors.iconColor}, route.name === "logout" && {color: themeColors.iconActive}]} />
                        <Text style={[styles.iconText, {color: themeColors.iconActive, textAlign: "center"}, route.name === "logout" && {color: themeColors.iconActive}]}>Sáng</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    menuContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 20,
    },
    iconText: {
        fontSize: 15,
        fontWeight: "600",
    },
    point: {
        position: "absolute",
        top: 0,
        right: 24,
        width: 10,
        height: 10,
        backgroundColor: "red",
        borderColor: "white",
        borderRadius: 100,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Footer;