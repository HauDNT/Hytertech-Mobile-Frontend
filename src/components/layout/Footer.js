import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NotifiData } from "../../data/NotifiData";
import { deleteData } from "../../config/SecureStorage";
import Modal2 from "../common/Modals/Modal2";

const Footer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [haveMessage, setHaveMessage] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const handleShowNotifiDetailsModal = () => {
        setModalVisible(true);
    };

    const handleLogout = async () => {
        await deleteData("token");
        navigation.navigate("login");
    };

    useEffect(() => {
        NotifiData.length > 0 ? 
        (setHaveMessage(true))
        :
        (setHaveMessage(false))
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("home")}>
                <AntDesign name="home" style={[styles.icon, route.name === "home" && styles.active]} />
                <Text style={[styles.iconText, route.name === "home" && styles.active]}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("notification")}>
                <AntDesign name="bells" style={[styles.icon, route.name === "notification" && styles.active]} />
                <Text style={[styles.iconText, route.name === "notification" && styles.active]}>Thông báo</Text>

                {
                    haveMessage && <View style={styles.point}></View>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate("settings")}>
                <AntDesign name="setting" style={[styles.icon, route.name === "settings" && styles.active]} />
                <Text style={[styles.iconText, route.name === "settings" && styles.active]}>Cài đặt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuContainer} onPress={() => handleShowNotifiDetailsModal()}>
                <AntDesign name="logout" style={[styles.icon, route.name === "logout" && styles.active]} />
                <Text style={[styles.iconText, route.name === "logout" && styles.active]}>Đăng xuất</Text>
            </TouchableOpacity>

            <Modal2
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                title={"Đăng xuất"}
                content={"Bạn muốn đăng xuất khỏi ứng dụng?"}
                handleAction={() => handleLogout()}
            />
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
        color: "#000",
    },
    iconText: {
        color: "#000",
        fontSize: 15,
    },
    active: {
        color: "blue",
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