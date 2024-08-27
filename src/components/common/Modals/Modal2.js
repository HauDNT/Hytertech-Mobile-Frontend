import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import modalIconDefault from "../../../assets/icons/modal-default-icon.png";

const Modal2 = ({visible, onRequestClose, title, content, icon = modalIconDefault, handleAction = () => {}}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalIconContainer}>
                        <Image style={styles.modalIcon} source={icon}/>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.content}>
                            {content}
                        </Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onRequestClose}
                        >
                            <Text style={styles.textStyle}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonAction]}
                            onPress={handleAction}
                        >
                            <Text style={styles.textStyle}>Đồng ý</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    modalIconContainer: {
        width: 95,
        height: 95,
        position: "absolute",
        top: -47,
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        elevation: 2,
    },
    modalIcon: {
        position: "absolute",
        width: "90%",
        height: "90%",
    },
    btnContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        elevation: 3,
    },
    buttonClose: {
        backgroundColor: '#FF8080',
    },
    buttonAction: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        marginTop: 35,
        marginBottom: 25,
        textAlign: 'center',
        width: "100%",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
    content: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: "justify",
        overflow: "scroll",
    }
});

export default Modal2;