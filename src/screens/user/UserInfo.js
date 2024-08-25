import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
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

import { ThemeContext } from "../../context/ThemeContext";
import { UserInfoContext } from "../../context/UserInfoContext";
import userAvatar from "../../assets/images/avatar.jpg";
import axiosInstance from '../../config/axiosInstance';

const UserInfo = () => {
    const { themeColors } = useContext(ThemeContext);
    const { userInfo, applyUserInfo } = useContext(UserInfoContext);

    const [data, setData] = useState({
        isLoading: true,
        addressLevel1: [],
        addressLevel2: [],
        addressLevel3: [],
        modalVisible: false,
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const initValues = {
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

    const getAddressLevel1 = async () => {
        const response = await axiosInstance.get("/address/level1");
        updateData("addressLevel1", response.data);
    };

    const getAddressLevel2 = async (addressLV1Id) => {
        const response = await axiosInstance.get(`/address/level2?level1=${addressLV1Id}`);
        updateData("addressLevel2", response.data);
    };

    const getAddressLevel3 = async (addressLV2Id) => {
        const response = await axiosInstance.get(`/address/level3?level2=${addressLV2Id}`);
        updateData("addressLevel3", response.data);
    };

    const selectAddress = (addessLevel, setFieldValue, field, value) => {
        switch (addessLevel) {
            case 1:
                getAddressLevel2(value);
                updateData("addressLevel3", []);
                break;
            case 2:
                getAddressLevel3(value);
                break;
        };

        setFieldValue(field, value);
    };

    const handleUpdate = async (data) => {
        try {
            const response = await axiosInstance.put(`/users/update/${userInfo.id}`, data);
            
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

    useEffect(() => {
        // getAddressLevel1();
        // getAddressLevel2(initValues.city_id);
        // getAddressLevel3(initValues.district_id);

        setTimeout(() => {
            updateData("isLoading", false);
        }, 2000);
    }, []);

    return (
        data.isLoading ?
        (<AppLoading/>)
        :
        (
            <Layout>
                <View style={[styles.container, {backgroundColor: themeColors.backgroundColor, borderColor: themeColors.borderColorLight}]}>
                    <View style={styles.contentWrap}>
                        <TouchableOpacity>
                            <Image 
                                source={userAvatar}
                                style={styles.image}    
                            />
                        </TouchableOpacity>
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
                                        <CustomCombobox 
                                            label={"Tỉnh / Thành phố"}
                                            title={"Chọn"}
                                            data={
                                                data.addressLevel1 && data.addressLevel1.map(item => ({
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
                                                data.addressLevel2 && data.addressLevel2.map(item => ({
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
                                                data.addressLevel3 && data.addressLevel3.map(item => ({
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