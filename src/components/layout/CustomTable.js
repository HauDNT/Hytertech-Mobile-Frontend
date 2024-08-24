import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CustomTable = () => {
    const data = [
        { id: 1, number: 30.1, created_at: '10/08/2024 07:50:23'},
        { id: 2, number: 30.2, created_at: '10/08/2024 08:50:23'},
        { id: 3, number: 30.5, created_at: '10/08/2024 09:50:23'},
        { id: 4, number: 31.3, created_at: '10/08/2024 10:50:23'},
        { id: 5, number: 32.7, created_at: '10/08/2024 12:50:23'},
        { id: 6, number: 29.8, created_at: '10/08/2024 17:50:23'},
        { id: 1, number: 30.1, created_at: '10/08/2024 07:50:23'},
        { id: 2, number: 30.2, created_at: '10/08/2024 08:50:23'},
        { id: 3, number: 30.5, created_at: '10/08/2024 09:50:23'},
        { id: 4, number: 31.3, created_at: '10/08/2024 10:50:23'},
        { id: 5, number: 32.7, created_at: '10/08/2024 12:50:23'},
        { id: 6, number: 29.8, created_at: '10/08/2024 17:50:23'},
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.number}</Text>
                <Text style={styles.tableCell}>{item.created_at}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.headerCell]}>Số đo</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Thời gian</Text>
            </View>

            <FlatList
                style={{height: 300}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                horizontal={true}
                nestedScrollEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "97%",
        borderColor: "#ccc",
        borderWidth: 0.3,
        overflow: "hidden",
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
});

export default CustomTable;