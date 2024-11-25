import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import AppLoading from "../../components/common/AppLoading";
import Layout from "../../components/layout/Layout";
import EmptyData from "../../components/common/EmptyData";
import FlatlistVertical from "../../components/layout/FlatlistVertical";
import { StationsContext } from "../../context/StationsContext";
import envConfig from "../../config/EnvConfig";

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
                            data={listStations.map(station => ({
                                id: station.id,
                                name: station.name,
                                image: `${envConfig.URL_LOAD_IMG_FROM_SERVER + station.image}`,
                                created_at: station.created_at,
                            }))} 
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