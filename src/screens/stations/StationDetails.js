import React, { useState, useEffect, useContext } from "react";
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
import { ThemeContext } from "../../context/ThemeContext";
import AppLoading from "../../components/common/AppLoading";
import EmptyData from "../../components/common/EmptyData";

// Icons
import TempIcon from "../../assets/icons/temp-icon.jpg";
import HumidIcon from "../../assets/icons/humid-icon.png";
import PHIcon from "../../assets/icons/ph-icon.jpg";
import ECIcon from "../../assets/icons/ec-icon.webp";

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
                                source={{ uri: data.stationInfo.image}}
                                style={styles.image}    
                            />
                        </TouchableOpacity>
                        <Text style={[styles.header, {color: themeColors.textColor}]}>{data.stationInfo.name}</Text>
                        <Text style={[styles.category, {color: themeColors.textColor}]}>{data.stationInfo.category_name}</Text>
                        <Text style={[styles.subTitle, {color: themeColors.textColor}]}>Ngày lắp đặt: {formatAndDisplayDate(data.stationInfo.created_at)}</Text>
                    </View>

                    <Divider/>

                    {/* <View style={[styles.contentWrap, {alignItems: "flex-start"}]}>
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

                    <Divider/> */}

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
                                            image: item.image,
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
        borderColor: "#ccc",
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