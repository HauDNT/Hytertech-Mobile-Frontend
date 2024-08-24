import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const LineChartCustomSingleData = ({ label, data, lineColor = "#6499E9", fillColor = "#5AB2FF", pointColor = "#050C9C"}) => {
    // Generate label for x axis
    const labelX = [];
    data.forEach(item => {
        labelX.push(item[[Object.keys(item)[1]]])
    });

    // Custom data point
    const customDataPoint = () => {
        return (
            <View style={[styles.dataPoint, {borderColor: pointColor}]} />
        );
    };

    // Apply point data to data
    data.map(item => {
        item.dataPointText = `${item[Object.keys(item)[0]]} - ${item[Object.keys(item)[1]]}`;
        item.customDataPoint = customDataPoint;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.chart}>
                <LineChart
                    areaChart
                    curved
                    data={data}
                    height={230}
                    showVerticalLines
                    spacing={80}
                    initialSpacing={0}
                    color={lineColor}
                    startFillColor={fillColor}
                    dataPointsColor={lineColor}
                    startOpacity={0.8}
                    endOpacity={0.3}
                    isAnimated={true}
                    animateOnDataChange={true}
                    animationDuration={5000}
                    xAxisLabelTexts={labelX}
                    xAxisLabelTextStyle={{paddingLeft: 25}}
                    textShiftX={7}
                    textShiftY={-8}
                    textFontSize={10}
                    textColor="#000"
                    hideRules
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "97%",
        minHeight: 300,
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 0.5,
        backgroundColor: "white",
        // elevation: 5,
        overflow: "hidden",
    },
    label: {
        fontWeight: "500",
        fontSize: 15,
        margin: 5,
    },
    chart: {
        width: "95%", 
        marginTop: 10,
        overflow: "scroll",
    },
    xAxisLabel: {
        fontSize: 16,
        color: '#000',
    },
    dataPoint: {
        width: 5,
        height: 5,
        marginLeft: 3,
        marginBottom: 5,
        borderWidth: 4,
        borderRadius: 10,
    }
});

export default LineChartCustomSingleData;