import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layout/Header";
import Slider from "../../components/specific/Slider";
import GridLayout from "../../components/layout/GridLayout";
import { Divider } from '@rneui/themed';
import AppLoading from "../../components/common/AppLoading";

import { UserInfoContext } from "../../context/UserInfoContext";

// Icons
import ChartIcon from "../../assets/icons/chart-icon.png";
import ContactIcon from "../../assets/icons/contact-icon.jpg";
import StationIcon from "../../assets/icons/station-icon.png";
import BacteriaIcon from "../../assets/icons/bacteria-icon.png";
import RatingIcon from "../../assets/icons/rating-icon.png";
import GuideIcon from "../../assets/icons/guide-icon.png";

const Dashboard = ({themeColors}) => {
    const { userInfo } = useContext(UserInfoContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2500);
    }, [userInfo]);

    const textCards = [
        "Trạm",
        "Thống kê",
        "Chuẩn đoán",
        "Hỗ trợ",
        "Hướng dẫn sử dụng",
        "Đánh giá",
    ];

    const iconCards = [
        StationIcon,
        ChartIcon,
        BacteriaIcon,
        ContactIcon,
        GuideIcon,
        RatingIcon,
    ];

    const redirectLinks = [
        "stations",
        "statistical",
        "bacteria",
        "support",
        "guide",
        "rating",
    ];

    return (
        <>
            {
                isLoading ? 
                (
                    <View style={{flex: 1, height: 200}}>
                        <AppLoading/>
                    </View>
                )
                :
                (
                    <ScrollView style={styles.container}>
                        <Header title_1={"Xin chào,"} title_2={userInfo.full_name} themeColors={themeColors}/>
                        <Slider/>
                        <Divider/>
                        <View style={[styles.content, {backgroundColor: themeColors.primaryBackgroundColor}]}>
                            <GridLayout 
                                amountItems={6} 
                                itemsOfRow={2}
                                textCards={textCards}
                                iconCards={iconCards}
                                redirectLinks={redirectLinks}
                            />
                        </View>
                    </ScrollView>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    content: {
        flex: 1,
        paddingBottom: 50,
    },
});

export default Dashboard;