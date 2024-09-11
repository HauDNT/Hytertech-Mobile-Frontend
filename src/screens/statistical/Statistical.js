import React, { useEffect, useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import AppLoading from "../../components/common/AppLoading";
import EmptyData from "../../components/common/EmptyData";
import Layout from "../../components/layout/Layout";
import { StationsContext } from "../../context/StationsContext";
import FlatlistVertical from "../../components/layout/FlatlistVertical";

const Statistical = () => {
    const navigation = useNavigation();
    const { listStations } = useContext(StationsContext);
    
    const [data, setData] = useState({
        isLoading: true,
        listSensors: [],
    });

    const updateData = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    useEffect(() => {
        setTimeout(() => {
            Toast.show({
                type: 'info',
                text1: 'Chọn vào giàn muốn xem báo cáo thống kê',
            });

            updateData("isLoading", false);
        }, 2000);
    }, []);

    const handlePressStationItem = (stationId) => {
        navigation.navigate("statisticaldetails", {id: stationId})
    };

    return (
        data.isLoading ?
        (<AppLoading/>)
        :
        (
            <Layout>
                {
                    listStations?.length > 0 ?
                    (
                        <FlatlistVertical 
                            data={listStations} 
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

export default Statistical;
