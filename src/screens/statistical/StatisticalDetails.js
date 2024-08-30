import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "../../components/layout/Layout";
import LineChartCustomSingleData from "../../components/specific/Charts/LineChartCustomSingleData";
import CustomCombobox from "../../components/common/CustomCombobox";
import CustomTable from "../../components/layout/CustomTable";
import Divider from "../../components/common/Divider";

const lineData = [
    {value: 30, date: '01:00'},
    {value: 35, date: '02:00'},
    {value: 40, date: '03:00'},
    {value: 28, date: '04:00'},
    {value: 25, date: '05:00'},
    {value: 50, date: '06:00'},
    {value: 60, date: '07:00'},
];

const StatisticalDetails = ({ route }) => {
    const id = route.params.id;

    return (
        <Layout>
            <View style={styles.container}>
                <CustomCombobox
                    label={"Chọn cảm biến"}
                    title={"Chọn cảm biến"}
                    data={
                        [
                            { label: 'Cảm biến số 1', value: 1 },
                            { label: 'Cảm biến số 2', value: 2 },
                            { label: 'Cảm biến số 3', value: 3 },
                        ]
                    }
                />

                <View style={[styles.contentWrap, {marginBottom: 15}]}>
                    <CustomCombobox
                        label={"Chọn thông số"}
                        title={"Chọn thông số"}
                        data={
                            [
                                { label: 'Nhiệt độ', value: 1 },
                                { label: 'Độ ẩm', value: 2 },
                                { label: 'Độ pH', value: 3 },
                                { label: 'Độ EC', value: 4 },
                            ]
                        }
                    />

                    <LineChartCustomSingleData
                        label={"Nhiệt độ"}
                        data={lineData}
                        lineColor="#FF0000"
                        fillColor="#EF5A6F"
                        pointColor="#E72929"
                    />
                </View>

                <Divider/>

                <View style={styles.contentWrap}>
                    <Text style={styles.subHeader}>Lịch sử đo đạc</Text>
                    <CustomTable/>
                </View>
            </View>
        </Layout>
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