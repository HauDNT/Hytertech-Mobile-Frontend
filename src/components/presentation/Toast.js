import React from 'react';
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';

const ToastComponent = React.forwardRef((props, ref) => {
    return <Toast ref={ref} />;
});

export const showToast = ({ type, title, content, timeShow = 2000, spaceFromTop = 50 }) => {
    Toast.show({
        type: type,
        position: 'top',
        text1: title,
        text2: content,
        visibilityTime: timeShow,
        topOffset: spaceFromTop,
        text1Style: styles.text1,
        text2Style: styles.text2,
    });
};

const styles = StyleSheet.create({
    text1: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 14,
    },
});

export default ToastComponent;