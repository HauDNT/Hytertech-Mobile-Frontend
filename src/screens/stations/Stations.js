import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import AppLoading from "../../components/common/AppLoading";
import Layout from "../../components/layout/Layout";
import EmptyData from "../../components/common/EmptyData";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { StationsContext } from "../../context/StationsContext";

const Stations = () => {
    const navigation = useNavigation();
    const { listStations } = useContext(StationsContext);
    const [isLoading, setIsLoading] = useState(true);

    const handlePressStationItem = (stationId) => {
        navigation.navigate("stationdetails", {id: stationId});
    };

    useEffect(() => {
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

export default Stations;