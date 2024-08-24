import React, { useContext, useEffect } from "react";
import { Text } from '@rneui/themed';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import axiosInstance from "../../config/axiosInstance";
import { getData, saveData, deleteData } from "../../config/SecureStorage";
import CustomInput from "../../components/common/CustomInput";
import { UserInfoContext } from "../../context/UserInfoContext";

const Login = ({navigation}) => {
    const { applyUserInfo } = useContext(UserInfoContext);

    const initvalues = {
        username: "0788806282",
        password: "root_admin_9999",
    };

    const validSchema = Yup.object({
        username: Yup.string().required("Bắt buộc").min(8).max(100),
        password: Yup.string().required("Bắt buộc").min(8).max(100),
    });

    const existAndDeleteLoginToken = async(token) => {
        const getTokenExist = await getData(token);

        if (getTokenExist) {
            await deleteData(token);
        };
    };

    useEffect(() => {
        existAndDeleteLoginToken("login-token");
    }, []);

    const handleLogin = async (data, resetForm) => {
        try {
            const response = await axiosInstance
                .post(
                    "/auth/login", 
                    {
                        username: data.username,
                        password: data.password,
                    }
                );

            // Đăng nhập thành công
            if (response.data && response.data.success) {
                // Reset form
                resetForm();

                // Lưu dữ liệu vào SecureStorage
                await saveData("login-token", response.data.token);

                // Lưu thông tin tài khoản vào UserInfoContext
                applyUserInfo(response.data.info);

                // Chuyển hướng
                navigation.navigate("home");
            };
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Đăng nhập thất bại",
                text2: "Vui lòng kiểm tra lại thông tin đăng nhập!",
                topOffset: 40,
            });
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: "https://xuannong.vn/images/rau-sach-thuy-canh.jpg"}} style={styles.bgImg}/>  
            {/* 380 x 331 */}

            <View style={styles.formContainer}>
                <Text style={styles.headingText}>Phần mềm quản lý {'\n'} giàn thủy canh thông minh</Text>

                <Formik
                    initialValues={initvalues}
                    validationSchema={validSchema}
                    onSubmit={(data, { resetForm }) => handleLogin(data, resetForm)}
                >
                {({ handleChange, handleBlur, handleSubmit, values}) => (
                    <>
                        <CustomInput
                            label={"Email / Số điện thoại"}
                            handleChange={handleChange('username')}
                            handleBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <CustomInput 
                            label={"Mật khẩu"}
                            handleChange={handleChange('password')}
                            handleBlur={handleBlur('password')}
                            value={values.password}
                        />

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={[styles.btnText, {color: "#fff"}]}>Đăng nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff", borderColor: "#7EA1FF", borderWidth: 1.5}]}>
                                <Text style={styles.btnText}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                </Formik>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
    },
    bgImg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        position: "absolute",
        top: "45%",
        width: "100%",
        height: "100%",
        padding: 10,
        paddingTop: 30,
        backgroundColor: "white",
        borderRadius: 15,
        borderColor: "#CCC",
        borderWidth: 1,
    },
    headingText: {
        fontSize: 23,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 30,
    },
    btnContainer: {
        width: "100%",
        height: 120,
        marginTop: 15,
    },
    button: {
        width: "97%",
        height: 45,
        margin: "auto",
        justifyContent: "center",
        backgroundColor: "#7EA1FF",
        borderRadius: 25,
        elevation: 3,
    },
    btnText: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    }
});

export default Login;