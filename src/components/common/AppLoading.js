import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import LottieView from "lottie-react-native";
import LoadingAnimation from "../../assets/animations/LoadingDrop-1.json";

const AppLoading = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container, {backgroundColor: themeColors.primaryBackgroundColor}]}>
            <LottieView
                source={LoadingAnimation}
                autoPlay
                loop
                style={styles.loadingIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    loadingIcon: {
        width: 300, 
        height: 300,
        position: "absolute",
        top: 120,
    }
});

export default AppLoading;