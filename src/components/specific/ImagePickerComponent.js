import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import ModalImagePicker from "../common/Modals/ModalImagePicker";
import blankImage from "../../assets/images/blank.png";

const ImagePickerComponent = ({ currentImageUri, onImagePicked, otherStyles, options = "camera", acceptPicker = false }) => {
    const [data, setData] = useState({
        imageUri: null,
        modalVisible: false,
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const chooseAvatarFromLibrary = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Chúng tôi cần được phép truy cập thư viện ảnh để thực hiện thao tác này!');
            return;
        };

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            updateData("imageUri", result.assets[0].uri);
            onImagePicked(result.assets[0].uri);
        };
    };

    const chooseAvatarFromCamera = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            alert('Chúng tôi cần được phép truy cập máy ảnh để thực hiện thao tác này!');
            return;
        };

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            updateData("imageUri", result.assets[0].uri);
            onImagePicked(result.assets[0].uri);
        };
    };

    const handleShowNotifiDetailsModal = () => {
        updateData("modalVisible", true);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handleShowNotifiDetailsModal}
                disabled={acceptPicker ? false : true}
            >
                <Image 
                    source={
                        data.imageUri ?
                        {uri: data.imageUri}
                        :
                        (
                            currentImageUri ? 
                            {uri: currentImageUri}
                            :
                            blankImage
                        )
                    }
                    style={[styles.image, otherStyles]}    
                />
            </TouchableOpacity>
            <ModalImagePicker
                visible={data.modalVisible}
                onRequestClose={() => updateData("modalVisible", false)}
                title={"Cập nhật avatar mới"}
                content={"Hãy chọn phương thức nhập ảnh"}
                handleOpenCamera={chooseAvatarFromCamera}
                handleOpenLibrary={chooseAvatarFromLibrary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 5,
    },
});

export default ImagePickerComponent;