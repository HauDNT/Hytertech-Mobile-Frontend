import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import axiosInstance from "../../config/axiosInstance";
import Layout from "../../components/layout/Layout";
import LineChartCustomSingleData from "../../components/specific/Charts/LineChartCustomSingleData";
import CustomCombobox from "../../components/common/CustomCombobox";
import CustomTable from "../../components/layout/CustomTable";
import Divider from "../../components/common/Divider";
import AppLoading from "../../components/common/AppLoading";
import { formatAndDisplayDatetime } from "../../utils/FormatDateTime";


const StatisticalDetails = ({ route }) => {
    const id = route.params.id;

    const [data, setData] = useState({
        isLoading: true,
        sensorSelected: 0,
        measureSelected: 0,
        listSensors: [],
        listMeasures: [],
        listValues: [],
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const getMeasures = async (sensorId) => {
        if (sensorId) {
            const result = (await axiosInstance.get(`/mobile/measures?sensor_id=${sensorId}`)).data;
            updateData("listMeasures", result.data);
        }
        else {
            Toast.show({
                type: 'warning',
                text1: 'Vui lòng chọn cảm biến',
            });
            return;
        }
    };

    const getValues = async (measureId) => {
        if (data.sensorSelected && measureId) {
            const result = (await axiosInstance.get(`/mobile/sensors/values?sensor_id=${data.sensorSelected}&measure_id=${measureId}`)).data;

            result.map(data => {
                const indexSlice = formatAndDisplayDatetime(data.created_at).indexOf(',');
                data.created_at = formatAndDisplayDatetime(data.created_at).slice(0, indexSlice);
            });

            updateData("listValues", result);
        }
    };

    const reRenderNewData = async () => {
        updateData("isLoading", true);

        await getMeasures(data.sensorSelected);
        await getValues(data.measureSelected);

        setTimeout(() => {
            updateData("isLoading", false);
        }, 2000);
    };

    useEffect(() => {
        Promise
            .all([
                axiosInstance.get(`/mobile/sensors?station_id=${id}`),
            ])
            .then(([listSensorsRes]) => {
                const sensorsType2 = listSensorsRes.data.data.map(sensor => {
                    return sensor.type === "2" ? sensor : null;
                }).filter(Boolean);

                updateData("listSensors", sensorsType2);

                setTimeout(() => {
                    updateData("isLoading", false);
                }, 2000);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        data.isLoading ?
        (<AppLoading/>)
        :
        (
            <Layout>
                <View style={styles.container}>
                    <CustomCombobox
                        label={"Chọn cảm biến"}
                        title={"Chọn cảm biến"}
                        data={
                            data.listSensors.length > 0 ? (
                                data.listSensors.map(sensor => (
                                    {
                                        label: sensor.name,
                                        value: sensor.id,
                                    }
                                ))
                            ) : (
                                [{ label: 'Không có cảm biến nào', value: 0 }]
                            )
                        }
                        value={+data.sensorSelected}
                        onChange={async (value) => {
                            updateData("sensorSelected", value);
                            await getMeasures(value);
                        }}
                    />

                    <View style={[styles.contentWrap, { marginBottom: 15 }]}>
                        <CustomCombobox
                            label={"Chọn thông số"}
                            title={"Chọn thông số"}
                            data={
                                data.listMeasures.length > 0 ? (
                                    data.listMeasures.map(measure => (
                                        {
                                            label: `${measure.name} (${measure.description})`,
                                            value: measure.id,
                                        }
                                    ))
                                ) : (
                                    [{ label: 'Không có đơn vị đo', value: 0 }]
                                )
                            }
                            value={+data.measureSelected}
                            onChange={async (value) => {
                                updateData("measureSelected", value);
                                await getValues(value);
                            }}
                        />
                    </View>

                    <LineChartCustomSingleData
                        label={"Biểu đồ thống kê số đo đã chọn trong ngày hôm nay"}
                        data={data.listValues}
                        lineColor="#FF0000"
                        fillColor="#EF5A6F"
                        pointColor="#E72929"
                        reRenderCallback={reRenderNewData}
                    />

                    {/* <Divider />

                    <View style={styles.contentWrap}>
                        <Text style={styles.subHeader}>Lịch sử đo đạc</Text>
                        <CustomTable
                            
                        />
                    </View> */}
                </View>
            </Layout>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        margin: 5,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
        elevation: 2,
    },
    contentWrap: {
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    subHeader: {
        marginTop: 5,
        fontSize: 15,
        marginBottom: 10,
        paddingLeft: 5,
        fontWeight: "bold",
    },
});

export default StatisticalDetails;