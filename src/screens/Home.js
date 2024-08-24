// Components & libs
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Layout from "../components/layout/Layout";
import Dashboard from "./dashboard/Dashboard";
import { getData } from "../config/SecureStorage";
import Toast from "react-native-toast-message";
import AppLoading from "../components/common/AppLoading";

const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [getSecureDataLogin, setSecureDataLogin] = useState(null);

    const fetchSecureToken = async() => {
        const token = await getData("login-token");
        setSecureDataLogin(token);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSecureToken();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (!getSecureDataLogin) {
                Toast.show({
                    type: 'error',
                    text1: "Truy cập không hợp lệ",
                    text2: 'Bạn phải đăng nhập trước khi sử dụng ứng dụng',
                    topOffset: 30,
                });
                navigation.navigate("login");
            }
        }
    }, [isLoading, getSecureDataLogin, navigation]);

    if (isLoading) {
        return <AppLoading/>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Layout style={styles.container}>
                <Dashboard/>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    footer: {
        display: "flex",
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        zIndex: 100,
        borderTopWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        padding: 10,
    },
});

export default Home;