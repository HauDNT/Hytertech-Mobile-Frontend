import {View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    {children}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        position: "absolute",
        right: 0,
        left: 0,
    },
    content: {
        flex: 1,
        marginTop: 5,
        paddingBottom: 300, // Đảm bảo nội dung không bị che khuất bởi footer
    },
    footer: {
        width: "100%",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "white",
        padding: 10,
        marginTop: 'auto',
        position: "absolute",
        bottom: 0,
    },
});

export default Layout;
