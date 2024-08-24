import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import axiosInstance from "../../config/axiosInstance";
import Layout from "../../components/layout/Layout";
import Divider from "../../components/common/Divider";
import StationParamCard from "../../components/common/Station/StationParamCard";
import { formatAndDisplayDate } from "../../utils/FormatDate";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { RoundToDecimalPlace } from "../../utils/RoundToDecimalPlace";
import { formatAndDisplayDatetime } from "../../utils/FormatDateTime";
import AppLoading from "../../components/common/AppLoading";

// Icons
import TempIcon from "../../assets/icons/temp-icon.jpg";
import HumidIcon from "../../assets/icons/humid-icon.png";
import PHIcon from "../../assets/icons/ph-icon.jpg";
import ECIcon from "../../assets/icons/ec-icon.webp";

const StationDetails = ({ route }) => {
    const navigation = useNavigation();
    const stationId = +route.params.id;

    const [data, setData] = useState({
        isLoading: true,
        stationDetails: {},
        tempData: {},
        // humidData: {},
        phData: {},
        ecData: {},
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
                axiosInstance.get(`/stations/${stationId}`),
                axiosInstance.get(`/sensors/param?measureId=1&stationId=${stationId}`),
                axiosInstance.get(`/sensors/param?measureId=2&stationId=${stationId}`),
                axiosInstance.get(`/sensors/param?measureId=3&stationId=${stationId}`),
            ])
            .then(([stationDetailsRes, tempRes, phRes, ecRes]) => {
                updateData("stationDetails", stationDetailsRes.data);
                updateData("tempData", tempRes.data);
                updateData("phData", phRes.data);
                updateData("ecData", ecRes.data);

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
                    <View style={styles.contentWrap}>
                        <TouchableOpacity onPress={() => alert("Change station image here!")}>
                            <Image 
                                source={{ uri: "https://skyfarm.vn/uploads/Thuy-canh/gian-thuy-canh/gian-thuy-canh-bac-thang-gls06.jpg"}}
                                style={styles.image}    
                            />
                        </TouchableOpacity>
                        <Text style={styles.header}>Giàn: {data.stationDetails?.name}</Text>
                        <Text style={styles.subTitle}>Ngày lắp đặt: {formatAndDisplayDate(data.stationDetails?.created_at)}</Text>
                    </View>

                    <Divider/>

                    <View style={[styles.contentWrap, {alignItems: "flex-start"}]}>
                        <Text style={styles.subHeader}>Thông số đo đạc hiện tại</Text>

                        <View style={styles.cardParams}>
                            <StationParamCard 
                                title={"Nhiệt độ"} 
                                icon={TempIcon}
                                number={data?.tempData?.value}
                                unit={data?.tempData?.measure}
                                time={formatAndDisplayDatetime(data?.tempData?.created_at)}
                                difference={data?.tempData?.differencePercent && `${RoundToDecimalPlace(data?.tempData?.differencePercent)} %`}
                                highOrLow={data?.tempData?.isDifferenceUp}
                            />
                        </View>
                        <View style={styles.cardParams}>
                            <StationParamCard 
                                title={"Độ ẩm"} 
                                icon={HumidIcon}
                                number={"NaN"}
                                unit={""}
                                time={"NaN phút trước"}
                                difference={"NaN%"}
                                highOrLow={true}
                            />
                        </View>
                        <View style={styles.cardParams}>
                            <StationParamCard 
                                title={"Nồng độ pH"} 
                                icon={PHIcon}
                                number={data?.phData?.value}
                                unit={data?.phData?.measure}
                                time={formatAndDisplayDatetime(data?.phData?.created_at)}
                                difference={data?.phData?.differencePercent && `${RoundToDecimalPlace(data?.phData?.differencePercent)} %`}
                                highOrLow={data?.phData?.isDifferenceUp}
                            />
                        </View>
                        <View style={styles.cardParams}>
                            <StationParamCard 
                                title={"Nồng độ EC"} 
                                icon={ECIcon}
                                number={data?.ecData?.value}
                                unit={data?.ecData?.measure}
                                time={formatAndDisplayDatetime(data?.ecData?.created_at)}
                                difference={data?.ecData?.differencePercent && `${RoundToDecimalPlace(data?.ecData?.differencePercent)} %`}
                                highOrLow={data?.ecData?.isDifferenceUp}
                            />
                        </View>
                    </View>

                    <Divider/>

                    <View>
                        <Text style={[styles.subHeader, {marginTop: 15}]}>Thiết bị được lắp đặt</Text>

                        <FlatlistVertical 
                            data={
                                data.stationDetails?.station_sensors?.map(item => ({
                                    id: item.sensor.id,
                                    name: item.sensor.name,
                                    created_at: formatAndDisplayDate(item.sensor.created_at),
                                }))
                            }
                            noteFields={["", "Ngày lắp đặt: "]}
                            fields={['id', 'name', 'image', 'created_at']} 
                            onItemPress={handlePressSensorItem}
                        />
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
    cardParams: {
        height: 150,
        width: "100%",
        marginBottom: 7,
    }
});

export default StationDetails;