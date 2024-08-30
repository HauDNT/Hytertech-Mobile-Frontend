import React, { useState, useEffect, useContext } from "react";
import {Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import axiosInstance from "../../config/axiosInstance";
import AppLoading from "../../components/common/AppLoading";
import Layout from "../../components/layout/Layout";
import EmptyData from "../../components/common/EmptyData";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { formatAndDisplayDate } from "../../utils/FormatDate";
import { UserInfoContext } from "../../context/UserInfoContext";

const Stations = () => {
    const navigation = useNavigation();
    const { userInfo } = useContext(UserInfoContext);
    const [stationList, setStationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handlePressStationItem = (stationId) => {
        navigation.navigate("stationdetails", {id: stationId});
    };

    const getStationBasicInfoList = async () => {
        const response = (await axiosInstance.get(`/mobile/stations/${userInfo.id}`)).data.data;

        response.map(item => item.created_at = formatAndDisplayDate(item.created_at));

        return response;
    };

    useEffect(() => {
        getStationBasicInfoList().then(result => {
            setStationList(result);
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        isLoading ?
        (<AppLoading/>)
        :
        (
            <Layout>
                {
                    stationList?.length > 0 ?
                    (
                        <FlatlistVertical 
                            data={stationList} 
                            noteFields={["Số hiệu: ", "Ngày lắp đặt: "]}
                            fields={[
                                "id",
                                "name",
                                "image",
                                "created_at",
                            ]}
                            onItemPress={handlePressStationItem}
                        />
                    )
                    :
                    (
                        <EmptyData message="Không có giàn nào được đăng ký!"/>
                    )
                }
            </Layout>
        )
    );
};

export default Stations;