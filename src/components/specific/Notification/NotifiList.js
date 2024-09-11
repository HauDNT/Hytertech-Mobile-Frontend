import React, { useState, useContext } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal1 from "../../common/Modals/Modal1";
import notifiIcon from "../../../assets/icons/notifi-icon.png";
import { NotifiData } from "../../../data/NotifiData";
import { ThemeContext } from "../../../context/ThemeContext";

const NotifiList = ({ data, fields = []}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({title: "", content: ""});
    const { themeColors } = useContext(ThemeContext);

    const handleShowNotifiDetailsModal = (id, msgTitle, msgContent) => {
        setModalContent({title: msgTitle, content: msgContent});
        setModalVisible(true);

        checkNotifiHasRead(id);
    };

    const checkNotifiHasRead = (id) => {
        NotifiData.find(item => {
            if (item.id === id) {
                item.isChecked = true;
            };
        });

        /*
            Hiện tại giao diện chỉ xử lý tạm như này. Khi có Database thì ta sẽ
            sử dụng useState và remove đi những thông báo đã click vào xem.
        */
    };

    const renderNotifiItem = ({ item }) => {
        const itemData = {
            id: item[fields[0]],
            title: item[fields[1]],
            timeSend: item[fields[2]],
            message: item[fields[4]],
            isChecked: item[fields[5]],
        };

        return <NotifiList {...itemData} />
    };

    const NotifiList = ({ id, title, timeSend, message, isChecked }) => {
        return (
            <>
                <TouchableOpacity 
                    style={[
                        styles.container, 
                        !isChecked ? 
                        {backgroundColor: themeColors.secondaryBackgroundColor}
                        :
                        {backgroundColor: themeColors.primaryBackgroundColor}
                    ]}
                    onPress={() => handleShowNotifiDetailsModal(id, title, message)}
                >
                    <View style={styles.row}>
                        <View style={styles.imgContainer}>
                            <Image source={notifiIcon} style={styles.image}/>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.headingMsg}>
                                <Text style={[styles.msgTitle, {color: themeColors.textColor}]} numberOfLines={1} ellipsizeMode="tail">
                                    {title}
                                </Text>

                                {
                                    !isChecked && <View style={styles.point}></View>
                                }
                            </View>
                            <View style={styles.msgDateTime}>
                                <Text style={[styles.textTime, {color: themeColors.textBlurColor}]}>{timeSend}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.message, {color: themeColors.textColor}]} numberOfLines={2} ellipsizeMode="tail">
                            {message}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.underline}></View>
            </>
        );
    };

    return (
        <>
            <FlatList
                data={data}
                renderItem={renderNotifiItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
            />

            <Modal1
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                title={modalContent.title}
                content={modalContent.content}
                icon={notifiIcon}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 10,
        overflow: "hidden",
    },
    row: {
        flex: 1,
        height: 55,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imgContainer: {
        width: 70,
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    image: {
        height: "100%", 
        width: 55,
        flexDirection: "row",
        margin: 5,
        marginTop: 0,
    },
    contentContainer: {
        flex: 1,
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 10,
    },
    headingMsg: {
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
        justifyContent: "space-between",
        marginTop: 3,
        marginBottom: 6,
    },
    msgTitle: {
        fontWeight: "700",
        fontSize: 16,
    },
    point: {
        width: 10,
        height: 10,
        marginTop: 10,
        marginRight: 15,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 3,
        borderRadius: 100,
    },
    msgDateTime: {
        width: "52%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textTime: {
        fontSize: 14,
    },
    message: {
        paddingTop: 10,
        paddingLeft: 15,
        fontSize: 14.5,
        lineHeight: 22,
    },
    underline: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#ddd',
        width: '95%',
        alignSelf: 'center',
    },
});

export default NotifiList;