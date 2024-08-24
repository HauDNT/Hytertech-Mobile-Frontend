import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Toast from "react-native-toast-message";
import Layout from "../../components/layout/Layout";
import Divider from "../../components/common/Divider";
import CustomInput from "../../components/common/CustomInput";
import CustomCombobox from "../../components/common/CustomCombobox";
// import CustomTable from '../../components/layout/CustomTable';

import FlatlistHorizontal from '../../components/layout/FlatlistHorizontal';

import axiosInstance from '../../config/axiosInstance';
import { formatAndDisplayDate } from "../../utils/FormatDate";

import { UserInfoContext } from "../../context/UserInfoContext";
import AppLoading from '../../components/common/AppLoading';

const SensorDetails = ({ route }) => {
    const sensorId = route.params.id;
    const { userInfo } = useContext(UserInfoContext);

    const [data, setData] = useState({
        isLoading: true,
        isEnabled: false,
        acceptToggle: true,
        sensorData: {},
        listStationNames: [],
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const initValues = {
        sensorName: data.sensorData ? data.sensorData.name : "",
        sensorDetail: 'Chưa có',
        sensorStation: data.sensorData ? data.sensorData.station_id : 0,
    };

    const validSchema = Yup.object({
        sensorName: Yup.string().required('Bắt buộc'),
        sensorDetail: Yup.string().required('Bắt buộc'),
        sensorStation: Yup.number().required('Bắt buộc'),
    });

    const updateSensorState = async (sensorState) => {
        try {
            if (data.acceptToggle) {
                const res = await axiosInstance.put(`sensors/status/${sensorId}`, { status: sensorState });
                
                if (res.data === true) {
                    updateData("acceptToggle", false);
    
                    setData(prevData => ({
                        ...prevData,
                        sensorData: {
                            ...prevData.sensorData,
                            status: sensorState,
                        }
                    }));
            
                    if (sensorState) {
                        Toast.show({
                            type: 'success',
                            text1: 'Đã bật động cơ',
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Đã tắt động cơ',
                        });
                    };

                    setTimeout(() => updateData("acceptToggle", true), 3000);
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Đã xảy ra lỗi khi bật/tắt động cơ',
                    });
                };
            }
            else return false;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Đã xảy ra lỗi khi bật/tắt động cơ',
            });
        }
    };

    useEffect(() => {
        Promise
            .all([
                axiosInstance.get(`/stations?userId=${userInfo.id}`),
                axiosInstance.get(`sensors/info/${sensorId}`),
            ])
            .then(([stationListRes, sensorDataRes]) => {
                updateData("listStationNames", stationListRes.data);
                updateData("sensorData", sensorDataRes.data);

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
                    <View style={styles.container}>
                        <View style={styles.contentWrap}>
                            <TouchableOpacity onPress={() => alert("Change sensor image here!")}>
                                <Image 
                                    source={{ uri: "https://product.hstatic.net/1000069225/product/_bien_muc_chat_long_khong_tiep_xuc_y25_non-contact_liquid_level_sensor_5c00dbb0e3f9492db20e677582a25f63_1024x1024.jpg"}}
                                    style={styles.image}    
                                />
                            </TouchableOpacity>
                            <Text style={styles.header}>{data?.sensorData?.name}</Text>
                            <Text style={styles.subTitle}>Ngày lắp đặt: {formatAndDisplayDate(data?.sensorData?.created_at)}</Text>
                        </View>

                        <Divider/>

                        <View style={styles.contentWrap}>
                            <TouchableOpacity 
                                onPress={() => updateSensorState(!data.sensorData.status)}
                                style={[data.sensorData.status ? styles.buttonOn : styles.buttonOff, styles.button]}
                            >
                                <Text style={{fontWeight: "bold", fontSize: 20, color: "white"}}>{data?.sensorData?.status ? "Bật" : "Tắt"}</Text>
                            </TouchableOpacity>
                        </View>

                        <Divider/>

                        <View style={styles.contentWrap}>
                            <Text style={styles.subHeader}>Lịch sử đo đạc</Text>
                            

                            {/* <CustomTable/> */}
                            <FlatlistHorizontal/>



                        </View>

                        <Divider/>

                        <View style={styles.contentWrap}>
                            <Text style={styles.subHeader}>Thông tin cơ bản</Text>
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
                                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                                        <View>
                                            <CustomInput 
                                                label={"Tên cảm biến"}
                                                handleChange={handleChange('sensorName')}
                                                handleBlur={handleBlur('sensorName')}
                                                value={values.sensorName}
                                                enableEdit={false}
                                            />
                                            <CustomInput 
                                                label={"Mô tả chức năng"}
                                                handleChange={handleChange('sensorDetail')}
                                                handleBlur={handleBlur('sensorDetail')}
                                                value={values.sensorDetail}
                                                enableEdit={false}
                                            />
                                            <CustomCombobox 
                                                label={"Vị trí lắp đặt"}
                                                title={"Chọn giàn"}
                                                data={data?.listStationNames?.length > 0 ? 
                                                    data.listStationNames.map(station => ({
                                                        label: station.name, 
                                                        value: station.id,
                                                    })) : []
                                                }
                                                value={+values.sensorStation}
                                                onChange={(value) => setFieldValue("sensorStation", value)}       
                                            />

                                            <View style={{width: "97%", margin: "auto"}}>
                                                <Button onPress={handleSubmit} title="Cập nhật"/>
                                            </View>
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
        borderColor: "#ddd",
        backgroundColor: "white",
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
        width: 120,
        height: 120,
        marginVertical: 10,
        borderRadius: 100,
        borderColor: "#ddd",
        borderWidth: 3,
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