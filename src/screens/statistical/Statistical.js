import React, { useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import Layout from "../../components/layout/Layout";
import { stationListData } from "../../data/StationListData";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import Toast from "react-native-toast-message";

const Statistical = () => {
    const toastRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        Toast.show({
            type: 'info',
            text1: 'Chọn vào giàn muốn xem báo cáo thống kê',
        });
    }, []);

    const handlePressStationItem = (stationId) => {
        navigation.navigate("statisticaldetails", {id: stationId})
    };

    return (
        <Layout>
            <FlatlistVertical 
                data={stationListData} 
                noteFields={["Số hiệu: ", "Ngày lắp đặt: ",]}
                fields={['id', 'name', 'image', 'created_at']} 
                onItemPress={handlePressStationItem}/>
        </Layout>
    );
};

export default Statistical;
