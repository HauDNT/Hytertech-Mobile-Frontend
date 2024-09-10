import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import { configToast } from "./src/components/presentation/CustomToast";
import Home from './src/screens/Home';
import Login from './src/screens/auth/Login';
import Stations from "./src/screens/stations/Stations";
import StationDetails from "./src/screens/stations/StationDetails";
import Sensors from "./src/screens/sensors/Sensors";
import SensorDetails from "./src/screens/sensors/SensorDetails";
import Support from "./src/screens/support/Support";
import Statistical from "./src/screens/statistical/Statistical";
import StatisticalDetails from "./src/screens/statistical/StatisticalDetails";
import Guide from "./src/screens/guide/Guide";
import Rating from "./src/screens/rating/Rating";
import UserInfo from "./src/screens/user/UserInfo";
import Notification from "./src/screens/notification/Notification";
import Settings from "./src/screens/settings/Settings";

// Context API
import ContainerContext from "./src/context/ContainerContext";
// import { UserInfoProvider } from "./src/context/UserInfoContext";
import { ThemeContext } from "./src/context/ThemeContext";

// LogBox.ignoreAllLogs(true); // Vô hiệu hóa tất cả cảnh báo

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ContainerContext>
            <NavigationWithTheme/>
        </ContainerContext>
    );
};

function NavigationWithTheme() {
    const { themeColors } = useContext(ThemeContext);

    const styles = {
        headerStyle: {
            backgroundColor: themeColors.headerColor,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: "#FFFFFF",
            fontWeight: 'bold',
            fontSize: 20,
        },
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login" screenOptions={styles}>
                <Stack.Screen name="login" component={Login} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="home" component={Home} options={{ 
                    title: "Trang chủ", 
                    headerLeft: () => null,
                }}/>
                <Stack.Screen name="stations" component={Stations} options={{ title: "Quản lý giàn", }}/>
                <Stack.Screen name="stationdetails" component={StationDetails} options={{ title: "Thông tin chi tiết" }}/>
                <Stack.Screen name="sensors" component={Sensors} options={{ title: "Quản lý cảm biến" }}/>
                <Stack.Screen name="sensordetails" component={SensorDetails} options={{ title: "Thông tin chi tiết" }}/>
                <Stack.Screen name="statistical" component={Statistical} options={{ title: "Báo cáo thống kê" }}/>
                <Stack.Screen name="statisticaldetails" component={StatisticalDetails} options={{ title: "Báo cáo thống kê" }}/>
                <Stack.Screen name="support" component={Support} options={{ title: "Hỗ trợ" }}/>
                <Stack.Screen name="guide" component={Guide} options={{ title: "Hướng dẫn sử dụng" }}/>
                <Stack.Screen name="rating" component={Rating} options={{ title: "Đánh giá" }}/>
                <Stack.Screen name="userinfo" component={UserInfo} options={{ title: "Thông tin cá nhân" }}/>
                <Stack.Screen name="notification" component={Notification} options={{ title: "Thông báo" }}/>
                <Stack.Screen name="settings" component={Settings} options={{ title: "Cài đặt" }}/>
            </Stack.Navigator>
            <Toast 
                config={configToast} 
                visibilityTime={3000} 
                topOffset={100}
                position="top"
            />
        </NavigationContainer>
    );
};
