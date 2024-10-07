import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Toast from "react-native-toast-message";
import Layout from "../../components/layout/Layout";
import Divider from "../../components/common/Divider";
import CustomInput from "../../components/common/CustomInput";
import CustomCombobox from "../../components/common/CustomCombobox";
import FlatlistHorizontal from '../../components/layout/FlatlistHorizontal';
import axiosInstance from '../../config/axiosInstance';
import { formatAndDisplayDate } from "../../utils/FormatDate";
import { ThemeContext } from "../../context/ThemeContext";
import { StationsContext } from "../../context/StationsContext";
import AppLoading from '../../components/common/AppLoading';

const SensorDetails = ({ route }) => {
    const sensorId = route.params.id;
    const { themeColors } = useContext(ThemeContext);
    // const { listStations } = useContext(StationsContext);

    const [data, setData] = useState({
        isLoading: true,
        isEnabled: false,
        acceptToggle: true,
        sensorData: {},
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const initValues = {
        sensorName: data.sensorData ? data.sensorData.name : "",
        sensorDetail: data.sensorData ? data.sensorData.description : "",
        sensorStation: data.sensorData ? data.sensorData.station_id : 0,
    };

    const validSchema = Yup.object({
        sensorName: Yup.string().required('Bắt buộc'),
        sensorDetail: Yup.string().required('Bắt buộc'),
        sensorStation: Yup.number().required('Bắt buộc'),
    });

    const updateSensorState = async () => {
        try {
            if (data.acceptToggle) {
                const newSensorState = data.sensorData.status === 1 ? 0 : 1;
                const res = await axiosInstance.put(`/mobile/sensors/status/${sensorId}`, {status: newSensorState});
                
                if (res.data.data === true) {
                    updateData("acceptToggle", false);
    
                    setData(prevData => ({
                        ...prevData,
                        sensorData: {
                            ...prevData.sensorData,
                            status: newSensorState,
                        }
                    }));

                    if (newSensorState) {
                        Toast.show({
                            type: 'success',
                            text1: 'Đã bật thiết bị',
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Đã tắt thiết bị',
                        });
                    };

                    setTimeout(() => updateData("acceptToggle", true), 5000);
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Đã xảy ra lỗi khi bật/tắt thiết bị',
                    });
                };
            }
            else return false;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Đã xảy ra lỗi khi bật/tắt thiết bị',
            });
        }
    };

    useEffect(() => {
        Promise
            .all([
                axiosInstance.get(`/mobile/sensors/info/${sensorId}`),
            ])
            .then(([sensorDataRes]) => {
                updateData("sensorData", sensorDataRes.data.data);

                setTimeout(() => {
                    updateData("isLoading", false);
                }, 2000);
            })
            .catch(error => {
                console.log(error);
                
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi khi tải dữ liệu từ máy chủ.',
                });
            });
    }, []);

    return (
        data.isLoading ? 
        (
            <AppLoading/>
        )
        :
        (
            <>
                <Layout>
                    <View style={[styles.container, {backgroundColor: themeColors.secondaryBackgroundColor, borderColor: themeColors.borderColorLight}]}>
                        <View style={[styles.contentWrap, {backgroundColor: themeColors.secondaryBackgroundColor}]}>
                            <TouchableOpacity disabled={true}>
                                <Image 
                                    source={{ uri: data.sensorData.image}}
                                    style={[styles.image, {borderColor: themeColors.borderColorLight}]}    
                                />
                            </TouchableOpacity>
                            <Text style={[styles.header, {color: themeColors.textColor}]}>{data.sensorData.name}</Text>
                            <Text style={[styles.subTitle, {color: themeColors.textColor}]}>Ngày lắp đặt: {formatAndDisplayDate(data.sensorData.created_at)}</Text>
                        </View>

                        <Divider/>

                        {
                            data.sensorData.type == 1 && 
                            <>
                                <View style={styles.contentWrap}>
                                    <TouchableOpacity 
                                        onPress={() => updateSensorState()}
                                        style={[data.sensorData.status === 1 ? {backgroundColor: themeColors.greenColor} : {backgroundColor: themeColors.redColor}, styles.button]}
                                    >
                                        <Text style={{fontWeight: "bold", fontSize: 20, color: "white"}}>{data.sensorData.status === 1 ? "Tắt" : "Bật"}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Divider/>
                            </>
                        }

                        <View style={styles.contentWrap}>
                            <Text style={[styles.subHeader, {color: themeColors.textColor}]}>Lịch sử đo đạc</Text>
                            
                            <FlatlistHorizontal/>
                        </View>

                        <Divider/>

                        <View style={styles.contentWrap}>
                            <Text style={[styles.subHeader, {color: themeColors.textColor}]}>Thông tin cơ bản</Text>
                            <View style={styles.form}>
                            {
                                !data.isLoading && (
                                    <Formik
                                        initialValues={initValues}
                                        validationSchema={validSchema}
                                        onSubmit={
                                            (values) => {
                                                alert(`Sensor name: ${values.sensorName}\nSensor details: ${values.sensorDetail}\nStation: ${values.sensorStation}`);
                                            }
                                        }
                                    >
                                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        <View>
                                            <CustomInput 
                                                label={"Tên cảm biến"}
                                                handleChange={handleChange('sensorName')}
                                                handleBlur={handleBlur('sensorName')}
                                                value={values.sensorName || "Không có"}
                                                enableEdit={false}
                                            />
                                            <CustomInput 
                                                label={"Mô tả chức năng"}
                                                handleChange={handleChange('sensorDetail')}
                                                handleBlur={handleBlur('sensorDetail')}
                                                value={values.sensorDetail || "Không có"}
                                                enableEdit={false}
                                            />
                                            {/* <CustomCombobox 
                                                label={"Vị trí lắp đặt"}
                                                title={"Chọn giàn"}
                                                data={
                                                    listStations.length > 0 ? 
                                                    listStations.map(station => ({
                                                        label: station.name, 
                                                        value: station.id,
                                                    })) : []
                                                }
                                                value={+values.sensorStation}
                                                onChange={(value) => setFieldValue("sensorStation", value)}       
                                            /> */}

                                            {/* <View style={{width: "97%", margin: "auto"}}>
                                                <Button onPress={handleSubmit} title="Cập nhật"/>
                                            </View> */}
                                        </View>
                                        )}
                                    </Formik>
                                )
                            }
                            </View>
                        </View>
                    </View>
                </Layout>
            </>
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
        overflow: "hidden",
        elevation: 2,
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
        textAlign: "center",
    },
    subHeader: {
        marginTop: 5,
        fontSize: 15,
        marginBottom: 10, 
        paddingLeft: 5, 
        fontWeight: "bold",
        textAlign: "center",
    },
    subTitle: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        width: 180,
        height: 180,
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
        borderWidth: 0.5,
        borderRadius: 5,
    },
    button: {
        width: 120,
        height: 120,
        marginVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonOn: {
        backgroundColor: "#06D001",
    },
    buttonOff: {
        backgroundColor: "#F05A7E",
    },
});

export default SensorDetails;