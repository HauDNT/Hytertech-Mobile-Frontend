import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { Text } from '@rneui/themed';
import { UserInfoContext } from "../../context/UserInfoContext";
import ImagePickerComponent from "../specific/ImagePickerComponent";

const Header = ({title_1, title_2, themeColors}) => {
    const navigation = useNavigation();
    const { userInfo } = useContext(UserInfoContext);

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: themeColors.secondaryBackgroundColor}]} onPress={() => navigation.navigate("userinfo")}>
            <View style={styles.leftHalf}>
                <Text style={[styles.text, {color: themeColors.textColor}]}>{title_1}</Text>
                <Text style={[styles.text, {color: themeColors.textColor, fontWeight: "bold"}]}>{title_2}</Text>
            </View>
            <View style={styles.rightHalf}>
                <ImagePickerComponent
                    currentImageUri={userInfo.avatar}
                    onImagePicked={() => {}}
                    otherStyles={[styles.avatar, {borderColor: themeColors.borderColorLight}]}
                    acceptPicker={false}
                />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: "row",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
    },
    leftHalf: {
        width: 200,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 35,
    },
    rightHalf: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
    },
    text: {
        paddingLeft: 20,
        fontSize: 17,
    },
    avatar: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100,
    }
})

export default Header;