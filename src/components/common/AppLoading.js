import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import LoadingAnimation from "../../assets/animations/LoadingDrop-1.json";

const AppLoading = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
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
        height: 500,
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