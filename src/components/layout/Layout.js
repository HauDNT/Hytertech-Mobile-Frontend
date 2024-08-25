import {View, StyleSheet, ScrollView, Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Footer from "./Footer";

const Layout = ({children}) => {
    const { themeColors } = useContext(ThemeContext);
    
    const childrenWithThemeColors = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { themeColors });
        }
        return child;
    });

    return (
        <View style={[styles.container, { backgroundColor: themeColors.primaryBackgroundColor }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    {childrenWithThemeColors}
                </View>
            </ScrollView>
            <View style={[styles.footer, { backgroundColor: themeColors.secondaryBackgroundColor, borderColor: themeColors.borderColorLight }]}>
                <Footer themeColors={themeColors} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative",
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
        paddingBottom: 300,
    },
    footer: {
        width: "100%",
        padding: 10,
        bottom: 0,
        marginTop: 'auto',
        position: "absolute",
        borderTopWidth: 1,
        justifyContent: "center",
    },
});

export default Layout;
