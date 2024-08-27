import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Toast from "react-native-toast-message";
import AppLoading from "../../components/common/AppLoading";
import Layout from "../../components/layout/Layout";
import Divider from "../../components/common/Divider";
import CustomInput from "../../components/common/CustomInput";
import CustomCombobox from "../../components/common/CustomCombobox";
import { formatAndDisplayDatetime } from "../../utils/FormatDateTime";
import { deleteData } from "../../config/SecureStorage";
import Modal2 from "../../components/common/Modals/Modal2";
import ImagePickerComponent from '../../components/specific/ImagePickerComponent';
import { ThemeContext } from "../../context/ThemeContext";
import { UserInfoContext } from "../../context/UserInfoContext";
import axiosInstance from '../../config/axiosInstance';

const UserInfo = () => {
    const navigation = useNavigation();
    const { themeColors } = useContext(ThemeContext);
    const { userInfo, applyUserInfo } = useContext(UserInfoContext);

    const [data, setData] = useState({
        isLoading: true,
        cities: [],
        districts: [],
        wards: [],
        modalVisible: false,
        imageUri: userInfo.avatar,
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const initValues = {
        avatar: userInfo.avatar,
        email: userInfo.email,
        full_name: userInfo.full_name,
        tel: userInfo.tel,
        gender: +userInfo.gender,
        address: userInfo.address,
        ward_id: +userInfo.ward_id,
        district_id: +userInfo.district_id,
        city_id: +userInfo.city_id,
        created_at: userInfo.created_at,
    };

    const validSchema = Yup.object({
        email: Yup.string().required('Bắt buộc'),
        full_name: Yup.string().required('Bắt buộc'),
        tel: Yup.string().required('Bắt buộc'),
        gender: Yup.number().required("Bắt buộc"),
        city_id: Yup.number().required("Bắt buộc"),
        district_id: Yup.number().required("Bắt buộc"),
        ward_id: Yup.number().required("Bắt buộc"),
    });

    const getCities = async () => {
        const response = await axiosInstance.get("/mobile/cities");
        updateData("cities", response.data.data);
    };

    const getDistricts = async (cityId) => {
        const response = await axiosInstance.get(`/mobile/districts/${cityId}`);
        updateData("districts", response.data.data);
    };

    const getWards = async (districtId) => {
        const response = await axiosInstance.get(`/mobile/wards/${districtId}`);
        updateData("wards", response.data.data);
    };

    const selectAddress = (addessLevel, setFieldValue, field, value) => {
        switch (addessLevel) {
            case 1:
                getDistricts(value);
                updateData("wards", []);
                break;
            case 2:
                getWards(value);
                break;
        };

        setFieldValue(field, value);
    };

    const handleUpdate = async (data) => {
        try {
            await axiosInstance.put(`/mobile/update/${userInfo.id}`, data);

            Toast.show({
                type: 'success',
                text1: 'Cập nhật thông tin mới thành công!',
            });
    
            applyUserInfo(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Đã xảy ra lỗi trong quá trình cập nhật',
            });
        }
    };

    const handleShowNotifiDetailsModal = () => {
        updateData("modalVisible", true);
    };

    const handleLogout = async () => {
        await deleteData("token");
        navigation.navigate("login");
    };

    const handleUpdateAvatar = (imageUri) => {
        uploadAvatar(imageUri);
        applyUserInfo({avatar: imageUri});
    };

    const uploadAvatar = async (avatarUri) => {
        const formData = new FormData();
        const dateTime = new Date();

        formData.append("avatar", {
            uri: avatarUri,
            name: `avatar_${dateTime}_${userInfo.id}`,
            type: 'image/jpg',
        });
        
        try {
            const response = await axiosInstance.post(
                `/mobile/update/avatar/${userInfo.id}`, 
                formData, 
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            );

            Toast.show({
                type: "success",
                text1: "Đổi ảnh đại diện thành công!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Đổi ảnh đại diện thất bại",
                text2: "Vui lòng thử lại sau",
            });
        };
    };

    useEffect(() => {
        getCities();
        getDistricts(initValues.city_id);
        getWards(initValues.district_id);

        setTimeout(() => {
            updateData("isLoading", false);
        }, 2000);
    }, [userInfo]);

    return (
        data.isLoading ?
        (<AppLoading/>)
        :
        (
            <Layout>
                <View style={[styles.container, {backgroundColor: themeColors.primaryBackgroundColor, borderColor: themeColors.borderColorLight}]}>
                    <View style={styles.contentWrap}>
                        <ImagePickerComponent
                            currentImageUri={data.imageUri}
                            onImagePicked={handleUpdateAvatar}
                            acceptPicker={true}
                        />
                    </View>

                    <Divider/>

                    <View style={styles.contentWrap}>
                        <Text style={[styles.subHeader, {fontSize: 18, fontWeight: "800", marginBottom: 20, color: themeColors.textColor}]}>Thông tin cá nhân</Text>

                        <View style={styles.form}>
                            <Formik
                                initialValues={initValues}
                                validationSchema={validSchema}
                                onSubmit={(data) => handleUpdate(data)}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                                    <View>
                                        <CustomInput 
                                            label={"Họ và tên"}
                                            handleChange={handleChange('full_name')}
                                            handleBlur={handleBlur('full_name')}
                                            value={values.full_name}
                                        />
                                        <CustomInput 
                                            label={"Email"}
                                            handleChange={handleChange('email')}
                                            handleBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                        <CustomInput 
                                            label={"Số điện thoại"}
                                            handleChange={handleChange('tel')}
                                            handleBlur={handleBlur('tel')}
                                            value={values.tel}
                                            keyboardType='number-pad'
                                        />
                                        <CustomCombobox 
                                            label={"Giới tính"}
                                            title={"Chọn giới tính"}
                                            data={
                                                [
                                                    { label: 'Nam', value: 1 },
                                                    { label: 'Nữ', value: 2 },
                                                    { label: 'Giới tính thứ 3', value: 3 },
                                                    { label: 'Khác', value: 4 },
                                                ]
                                            }
                                            value={values.gender}
                                            onChange={(value) => setFieldValue("gender", value)}       
                                        />


                                        <Text style={[styles.subHeader, {color: themeColors.textColor}]}>Địa chỉ</Text>
                                        <CustomInput 
                                            label={"Địa chỉ"}
                                            handleChange={handleChange('address')}
                                            handleBlur={handleBlur('address')}
                                            value={values.address}
                                        />
                                        <CustomCombobox 
                                            label={"Tỉnh / Thành phố"}
                                            title={"Chọn"}
                                            data={
                                                data.cities && data.cities.map(item => ({
                                                    label: item.name_city, 
                                                    value: item.id,
                                                }))
                                            }
                                            value={values.city_id}
                                            onChange={(value) => selectAddress(1, setFieldValue, "city_id", value)}    
                                        />
                                        <CustomCombobox 
                                            label={"Quận / Huyện / Thị xã"}
                                            title={"Chọn"}
                                            data={
                                                data.districts && data.districts.map(item => ({
                                                    label: item.name_district, 
                                                    value: item.id,
                                                }))
                                            }
                                            value={values.district_id}
                                            onChange={(value) => selectAddress(2, setFieldValue, "district_id", value)}      
                                        />
                                        <CustomCombobox 
                                            label={"Xã / Phường / Thị trấn"}
                                            title={"Chọn"}
                                            data={
                                                data.wards && data.wards.map(item => ({
                                                    label: item.name_ward, 
                                                    value: item.id,
                                                }))
                                            }
                                            value={values.ward_id}
                                            onChange={(value) => selectAddress(3, setFieldValue, "ward_id", value)}  
                                        />
                                        <CustomInput 
                                            label={"Ngày tạo tài khoản"}
                                            handleChange={handleChange('created_at')}
                                            handleBlur={handleBlur('created_at')}
                                            value={formatAndDisplayDatetime(values.created_at)}
                                            enableEdit={false}
                                        />
                                        
                                        <TouchableOpacity 
                                            style={[
                                                styles.button, 
                                                {backgroundColor: themeColors.blueColor, marginTop: 20,}
                                            ]} 
                                            onPress={handleSubmit}
                                        >
                                            <Text style={[styles.btnText, {color: "white"}]}>Cập nhật</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                </Formik>

                                <TouchableOpacity 
                                    style={[
                                        styles.button, 
                                        {backgroundColor: themeColors.redColor, marginTop: 20,}
                                    ]} 
                                    onPress={() => handleShowNotifiDetailsModal()}
                                >
                                    <Text style={[styles.btnText, {color: "white"}]}>Đăng xuất</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal2
                    visible={data.modalVisible}
                    onRequestClose={() => updateData("modalVisible", false)}
                    title={"Đăng xuất"}
                    content={"Bạn muốn đăng xuất khỏi ứng dụng?"}
                    handleAction={() => handleLogout()}
                />
            </Layout>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        margin: 5,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    contentWrap: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subHeader: {
        marginTop: 5,
        fontSize: 15,
        marginBottom: 10, 
        paddingLeft: 5, 
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        width: 180,
        height: 180,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 5,
    },
    form: {
        width: "100%",
        margin: "auto",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderRadius: 5,
    },
    button: {
        width: "97%",
        height: 45,
        margin: "auto",
        justifyContent: "center",
        borderRadius: 25,
    },
    btnText: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    }
});

export default UserInfo;