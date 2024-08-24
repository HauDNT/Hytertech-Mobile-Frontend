import React from "react";
import { useNavigation } from '@react-navigation/native';
import Layout from "../../components/layout/Layout";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { sensorListData } from "../../data/SensorListData";

const Sensors = () => {
    const navigation = useNavigation();

    const handlePressSensorItem = (sensorId) => {
        navigation.navigate("sensordetails", {id: sensorId})
    };

    return (
        <Layout>
            <FlatlistVertical 
                data={sensorListData} 
                noteFields={["Cảm biến: ", "Thuộc giàn: ", "Ngày lắp đặt: "]}
                fields={['id', 'name', 'image', 'station_id', 'created_at',]}
                onItemPress={handlePressSensorItem}
            />
        </Layout>
    );
};

export default Sensors;