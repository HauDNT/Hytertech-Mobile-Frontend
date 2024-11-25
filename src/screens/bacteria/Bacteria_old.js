import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const Bacteria_old = () => {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        setImageUri(result.assets[0].uri);
        await uploadToCloudinary(result.assets[0].uri);
    };

    const uploadToCloudinary = async (fileUri) => {
        const data = new FormData();

        data.append("file", {
            uri: fileUri,
            type: "image/jpeg",
            name: "photo.jpg",
        });
        data.append("upload_preset", "hytertech_preset");
        data.append("cloud_name", "dsl6woyzm");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dsl6woyzm/image/upload",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Upload Success:", response.data.secure_url);
            return response.data.secure_url;
        } catch (error) {
            console.error("Upload Failed:", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Select Image" onPress={selectImage} />
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
            )}
        </View>
    );
};

export default Bacteria_old;
