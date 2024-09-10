import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import blankImage from "../../assets/images/blank.png";
import SensorParamCard from '../common/Sensors/SensorParamCard';

/* Fields truyền vào component FlatlistHorizontal có thứ tự: 
    + id
    + Hình ảnh
    + Tiêu đề thẻ
    + Nội dung 1 (nếu có)
    + Nội dung 2 (nếu có)
*/

const FlatlistHorizontal = ({ data, noteFields = [], fields = [], onItemPress = () => { return }}) => {
    return (
        <ScrollView horizontal={true} style={styles.container}>
            <SensorParamCard
                param={10}
                measure={"%"}
                timestamp="24/08/2024 10:45:00"
            />
            <SensorParamCard
                param={10}
                measure={"%"}
                timestamp="24/08/2024 10:45:00"
            />
            <SensorParamCard
                param={10}
                measure={"%"}
                timestamp="24/08/2024 10:45:00"
            />
            <SensorParamCard
                param={10}
                measure={"%"}
                timestamp="24/08/2024 10:45:00"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 5,
    }
});

export default FlatlistHorizontal;