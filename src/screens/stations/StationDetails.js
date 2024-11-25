import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axiosInstance from "../../config/axiosInstance";
import Layout from "../../components/layout/Layout";
import Divider from "../../components/common/Divider";
import { formatAndDisplayDate } from "../../utils/FormatDate";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { ThemeContext } from "../../context/ThemeContext";
import AppLoading from "../../components/common/AppLoading";
import EmptyData from "../../components/common/EmptyData";
import envConfig from "../../config/EnvConfig";

const StationDetails = ({ route }) => {
    const navigation = useNavigation();
    const stationId = +route.params.id;
    const { themeColors } = useContext(ThemeContext);

    const [data, setData] = useState({
        isLoading: true,
        stationInfo: {},
        listSensors: [],
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const handlePressSensorItem = (sensorId) => {
        navigation.navigate("sensordetails", {id: sensorId});
    };

    useEffect(() => {
        Promise
            .all([
                axiosInstance.get(`/mobile/stations/info/${stationId}`),
                axiosInstance.get(`/mobile/sensors?station_id=${stationId}`),
            ])
            .then(([stationInfoRes, listSensorsRes]) => {
                updateData("stationInfo", stationInfoRes.data.data);
                updateData("listSensors", listSensorsRes.data.data);

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
                <View style={[styles.container, {backgroundColor: themeColors.secondaryBackgroundColor, borderColor: themeColors.borderColorLight}]}>
                    <View style={styles.contentWrap}>
                        <TouchableOpacity disabled={true}>
                            <Image 
                                source={{ uri: envConfig.URL_LOAD_IMG_FROM_SERVER + data.stationInfo.image}}
                                style={styles.image}    
                            />
                        </TouchableOpacity>
                        <Text style={[styles.header, {color: themeColors.textColor}]}>{data.stationInfo.name}</Text>
                        <Text style={[styles.category, {color: themeColors.textColor}]}>{data.stationInfo.category}</Text>
                        <Text style={[styles.subTitle, {color: themeColors.textColor}]}>Ngày lắp đặt: {formatAndDisplayDate(data.stationInfo.created_at)}</Text>
                    </View>

                    <Divider/>

                    <View>
                        <Text style={[styles.subHeader, {marginTop: 15, color: themeColors.textColor}]}>Thiết bị được lắp đặt</Text>
                        {
                            data.listSensors.length > 0 ?
                            (
                                <FlatlistVertical 
                                    data={
                                        data.listSensors.map(item => ({
                                            id: item.id,
                                            name: item.name,
                                            image: `${envConfig.URL_LOAD_IMG_FROM_SERVER + item.image}`,
                                            created_at: formatAndDisplayDate(item.created_at),
                                        }))
                                    }
                                    noteFields={["", "Ngày lắp đặt: "]}
                                    fields={['id', 'name', 'image', 'created_at']} 
                                    onItemPress={handlePressSensorItem}
                                />
                            )
                            :
                            (
                                <EmptyData/>
                            )
                        }
                    </View>
                </View>
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
    category: {
        fontSize: 16,
        marginVertical: 5,
    },
    image: {
        width: 180,
        height: 180,
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 5,
    },
    cardParams: {
        height: 150,
        width: "100%",
        marginBottom: 7,
    },
});

export default StationDetails;