import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import EmptyData from "../../common/EmptyData";

const LineChartCustomSingleData = ({ label, data, reRenderCallback, lineColor = "#6499E9", fillColor = "#5AB2FF", pointColor = "#050C9C"}) => {
    if (data.length > 0) {
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
                        spacing={100}
                        initialSpacing={2}
                        color={lineColor}
                        startFillColor={fillColor}
                        dataPointsColor={lineColor}
                        startOpacity={0.8}
                        endOpacity={0.3}
                        isAnimated={false}
                        animateOnDataChange={false}
                        animationDuration={data.length * 1000}
                        xAxisLabelTexts={labelX}
                        xAxisLabelTextStyle={{
                            paddingLeft: 40,
                        }}
                        textShiftX={7}
                        textShiftY={-8}
                        textFontSize={10}
                        textColor="#000"
                        hideRules
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={reRenderCallback}>
                    <Text style={styles.btnText}>Làm mới dữ liệu</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        return (
            <EmptyData/>
        )
    }
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
        overflow: "hidden",
    },
    label: {
        fontWeight: "500",
        fontSize: 15,
        margin: 5,
    },
    chart: {
        width: "98%", 
        marginTop: 30,
        overflow: "scroll",
    },
    button: {
        width: "97%",
        height: 45,
        margin: "auto",
        marginTop: 15,
        marginBottom: 15,
        justifyContent: "center",
        borderRadius: 25,
        borderWidth: 0.5,
    },
    btnText: {
        textAlign: "center",
        fontSize: 16,
    }
});

export default LineChartCustomSingleData;