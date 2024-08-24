import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CustomCard from '../common/CustomCard';

const { width } = Dimensions.get('window');

const GridLayout = ({ amountItems, itemsOfRow, textCards, iconCards, redirectLinks}) => {
    const rows = [];
    const itemsPerRow = itemsOfRow;

    for (let i = 0; i < amountItems; i += itemsPerRow) {
        // Lấy các item cho hàng hiện tại
        const items = [];

        for (let j = i; j < i + itemsPerRow && j < amountItems; j++) {
            items.push(
                <CustomCard
                    key={j}
                    color={"white"}
                    height={150}
                    width={(width / itemsPerRow) - 10}
                    text={textCards[j] ? textCards[j] : "Unknown"}
                    icon={iconCards[j] ? iconCards[j] : "Unknown"}
                    redirectLink={redirectLinks[j]}
                />
            );
        };

        rows.push(
            <View key={i} style={styles.row}>
                {items}
            </View>
        );
    };

    return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default GridLayout;