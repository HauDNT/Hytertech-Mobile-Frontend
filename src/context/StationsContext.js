import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { formatAndDisplayDate } from "../utils/FormatDate";
import axiosInstance from "../config/axiosInstance";

const StationsContext = createContext();

const StationsProvider = ({children}) => {
    const [listStations, setListStations] = useState([]);

    const getNewStationsContextData = async (userId) => {
        try {
            if (listStations.length === 0) {
                const response = (await axiosInstance.get(`/mobile/stations/${userId}`)).data.data;

                response.map(item => item.created_at = formatAndDisplayDate(item.created_at));
        
                setListStations(response);
            }
        } catch (error) {
            console.log(error);
            
            Toast.show({
                type: 'error',
                text1: 'Lỗi khi tải về dữ liệu các giàn từ máy chủ.',
            });
        }
    };

    return (
        <StationsContext.Provider
            value={{listStations, getNewStationsContextData}}
        >
            {children}
        </StationsContext.Provider>
    )
};

export {StationsProvider, StationsContext};