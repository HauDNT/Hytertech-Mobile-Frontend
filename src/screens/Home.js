// Components & libs
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Layout from "../components/layout/Layout";
import Dashboard from "./dashboard/Dashboard";
import { getData } from "../config/SecureStorage";
import Toast from "react-native-toast-message";
import AppLoading from "../components/common/AppLoading";
import { ThemeContext } from "../context/ThemeContext";

const Home = ({navigation}) => {
    const { themeColors } = useContext(ThemeContext);

    const [data, setData] = useState({
        isLoading: true,
        getSecureDataLogin: null,
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const fetchSecureToken = async() => {
        const token = await getData("login-token");
        updateData("getSecureDataLogin", token);
        updateData("isLoading", false);
    };

    useEffect(() => {
        fetchSecureToken();
    }, []);
    
    useEffect(() => {
        if (!data.isLoading) {
            if (!data.getSecureDataLogin) {
                Toast.show({
                    type: 'error',
                    text1: "Truy cập không hợp lệ",
                    text2: 'Bạn phải đăng nhập trước khi sử dụng ứng dụng',
                    topOffset: 30,
                });
                navigation.navigate("login");
            }
        }
    }, [data.isLoading, data.getSecureDataLogin]);

    if (data.isLoading || !themeColors) {
        return <AppLoading/>;
    }

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: themeColors.primaryBackgroundColor}]}>
            <Layout style={styles.container}>
                <Dashboard/>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
});

export default Home;